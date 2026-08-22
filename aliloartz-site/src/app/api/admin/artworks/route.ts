import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getCatalog, upsertArtwork } from "@/lib/catalog-store";
import { saveArtworkImage } from "@/lib/save-image";
import { uniqueSlug } from "@/lib/slug";
import type { Artwork } from "@/lib/types";

export const dynamic = "force-dynamic";

function parseArtwork(
  form: FormData,
  existingSlugs: string[],
  currentSlug?: string,
  currentImage?: string,
): Artwork {
  const title = String(form.get("title") || "").trim();
  const boardSlug = String(form.get("boardSlug") || "").trim();
  const medium = String(form.get("medium") || "").trim();
  const size = String(form.get("size") || "").trim();
  const story = String(form.get("story") || "").trim();
  const availability = String(form.get("availability") || "Prints") as Artwork["availability"];
  const aspect = String(form.get("aspect") || "portrait") as Artwork["aspect"];
  const price = Number(form.get("price"));

  if (!title || !boardSlug || !medium || !size || !Number.isFinite(price) || price <= 0) {
    throw new Error("Title, board, materials, size, and a valid price are required.");
  }

  return {
    slug: uniqueSlug(title, existingSlugs, currentSlug),
    boardSlug,
    title,
    price,
    medium,
    size,
    availability: ["Original", "Prints", "Limited"].includes(availability)
      ? availability
      : "Prints",
    story,
    location: String(form.get("location") || "").trim() || undefined,
    date: String(form.get("date") || "").trim() || undefined,
    image: currentImage || "",
    aspect: aspect === "landscape" ? "landscape" : "portrait",
  };
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const catalog = await getCatalog();
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Please upload an artwork image." }, { status: 400 });
  }

  try {
    const artwork = parseArtwork(
      form,
      catalog.artworks.map((item) => item.slug),
    );
    artwork.image = await saveArtworkImage(file);
    await upsertArtwork(artwork);
    return NextResponse.json({ artwork });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save artwork." },
      { status: 400 },
    );
  }
}
