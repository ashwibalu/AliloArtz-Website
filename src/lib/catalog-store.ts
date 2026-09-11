import { promises as fs } from "fs";
import path from "path";
import { artworks, boards } from "@/lib/gallery-data";
import type { Artwork, Catalog, Order } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const catalogPath = path.join(dataDir, "catalog.json");
const ordersPath = path.join(dataDir, "orders.json");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, value: unknown) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
  } catch (error) {
    // Vercel’s filesystem is not writable the way a local disk is.
    // Gallery seed data still works in memory; studio/order writes will not persist.
    console.warn(`Could not write ${filePath}`, error);
  }
}

export async function getCatalog(): Promise<Catalog> {
  const catalog = await readJson<Catalog | null>(catalogPath, null);
  if (catalog?.boards?.length && catalog.artworks) return catalog;
  return { boards, artworks };
}

export async function saveCatalog(catalog: Catalog) {
  await writeJson(catalogPath, catalog);
}

export async function getArtworkBySlug(slug: string) {
  const catalog = await getCatalog();
  return catalog.artworks.find((artwork) => artwork.slug === slug);
}

export async function getBoardBySlug(slug: string) {
  const catalog = await getCatalog();
  return catalog.boards.find((board) => board.slug === slug);
}

export async function upsertArtwork(artwork: Artwork, previousSlug?: string) {
  const catalog = await getCatalog();
  const next = catalog.artworks.filter(
    (item) => item.slug !== artwork.slug && item.slug !== previousSlug,
  );
  next.unshift(artwork);
  catalog.artworks = next;
  await saveCatalog(catalog);
  return artwork;
}

export async function deleteArtwork(slug: string) {
  const catalog = await getCatalog();
  const existing = catalog.artworks.find((item) => item.slug === slug);
  catalog.artworks = catalog.artworks.filter((item) => item.slug !== slug);
  await saveCatalog(catalog);
  return existing;
}

export async function listOrders() {
  return readJson<Order[]>(ordersPath, []);
}

export async function saveOrder(order: Order) {
  const orders = await listOrders();
  orders.unshift(order);
  await writeJson(ordersPath, orders);
  return order;
}

export function getHeroArtwork(catalog: Catalog) {
  return (
    catalog.artworks.find((artwork) => artwork.slug === "guardian") ??
    catalog.artworks[0] ??
    null
  );
}
