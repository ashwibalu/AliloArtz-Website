import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "aliloartz_studio";

function secret() {
  return process.env.ADMIN_SECRET || "aliloartz-local-secret";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "aliloartz";
}

export function adminToken() {
  return createHmac("sha256", secret()).update(adminPassword()).digest("hex");
}

export function isValidPassword(password: string) {
  const expected = Buffer.from(adminPassword());
  const received = Buffer.from(password);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export async function isAdmin() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const expected = Buffer.from(adminToken());
  const received = Buffer.from(token);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}
