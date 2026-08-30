import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import {
  deleteArtwork,
  getArtworkBySlug,
  getCatalog,
  upsertArtwork,
} from "@/lib/catalog-store";
import { saveArtworkImage } from "@/lib/save-image";
import { uniqueSlug } from "@/lib/slug";
import type { Artwork } from "@/lib/types";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const existing = await getArtworkBySlug(slug);
  if (!existing) {
    return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
  }

  const form = await request.formData();
  const catalog = await getCatalog();
  const title = String(form.get("title") || existing.title).trim();
  const file = form.get("image");

  const artwork: Artwork = {
    ...existing,
    title,
    slug: uniqueSlug(
      title,
      catalog.artworks.map((item) => item.slug),
      existing.slug,
    ),
    boardSlug: String(form.get("boardSlug") || existing.boardSlug),
    price: Number(form.get("price") || existing.price),
    medium: String(form.get("medium") || existing.medium).trim(),
    size: String(form.get("size") || existing.size).trim(),
    availability: (String(form.get("availability") || existing.availability) as Artwork["availability"]),
    story: String(form.get("story") || existing.story),
    location: String(form.get("location") || "").trim() || undefined,
    date: String(form.get("date") || "").trim() || undefined,
    aspect: String(form.get("aspect") || existing.aspect) === "landscape" ? "landscape" : "portrait",
  };

  if (!artwork.title || !artwork.medium || !artwork.size || !Number.isFinite(artwork.price) || artwork.price <= 0) {
    return NextResponse.json(
      { error: "Title, materials, size, and a valid price are required." },
      { status: 400 },
    );
  }

  if (file instanceof File && file.size > 0) {
    artwork.image = await saveArtworkImage(file);
  }

  await upsertArtwork(artwork, existing.slug);
  return NextResponse.json({ artwork });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const removed = await deleteArtwork(slug);
  if (!removed) {
    return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
