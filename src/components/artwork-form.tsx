"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifyCatalogChanged } from "@/components/catalog-provider";
import type { Artwork, Board } from "@/lib/types";

const fieldClass =
  "w-full border border-white/15 bg-black px-3 py-2 text-sm text-white outline-none focus:border-white";

export function ArtworkForm({
  boards,
  artwork,
}: {
  boards: Board[];
  artwork?: Artwork;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const submit = async (form: FormData) => {
    setSaving(true);
    setError("");
    const url = artwork
      ? `/api/admin/artworks/${artwork.slug}`
      : "/api/admin/artworks";
    const response = await fetch(url, {
      method: artwork ? "PATCH" : "POST",
      body: form,
    });
    const data = (await response.json()) as { error?: string; artwork?: Artwork };
    setSaving(false);
    if (!response.ok) {
      setError(data.error || "Could not save.");
      return;
    }
    notifyCatalogChanged();
    router.push("/studio");
    router.refresh();
  };

  const remove = async () => {
    if (!artwork) return;
    if (!window.confirm(`Delete “${artwork.title}”? This cannot be undone.`)) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/artworks/${artwork.slug}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error || "Could not delete.");
      return;
    }
    notifyCatalogChanged();
    router.push("/studio");
    router.refresh();
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(new FormData(event.currentTarget));
      }}
    >
      <label className="block space-y-2">
        <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Title</span>
        <input name="title" required defaultValue={artwork?.title} className={fieldClass} />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Price (USD)</span>
          <input
            name="price"
            type="number"
            min="1"
            step="1"
            required
            defaultValue={artwork?.price ?? 150}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Size</span>
          <input
            name="size"
            required
            defaultValue={artwork?.size}
            placeholder='e.g. 18" x 24" or A5 page'
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">
          Materials / medium
        </span>
        <input
          name="medium"
          required
          defaultValue={artwork?.medium}
          placeholder="Ink, graphite, watercolor…"
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Board</span>
          <select
            name="boardSlug"
            defaultValue={artwork?.boardSlug ?? boards[0]?.slug}
            className={fieldClass}
          >
            {boards.map((board) => (
              <option key={board.slug} value={board.slug}>
                {board.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Availability</span>
          <select
            name="availability"
            defaultValue={artwork?.availability ?? "Prints"}
            className={fieldClass}
          >
            <option value="Original">Original</option>
            <option value="Prints">Prints</option>
            <option value="Limited">Limited</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Orientation</span>
          <select name="aspect" defaultValue={artwork?.aspect ?? "portrait"} className={fieldClass}>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Drawn date</span>
          <input name="date" defaultValue={artwork?.date} className={fieldClass} />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Place</span>
        <input name="location" defaultValue={artwork?.location} className={fieldClass} />
      </label>

      <label className="block space-y-2">
        <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Story / details</span>
        <textarea
          name="story"
          rows={5}
          defaultValue={artwork?.story}
          className={fieldClass}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">
          {artwork ? "Replace image (optional)" : "Artwork image"}
        </span>
        <input
          name="image"
          type="file"
          accept="image/*,.heic,.HEIC"
          required={!artwork}
          className="w-full text-sm text-zinc-300 file:mr-4 file:border file:border-white file:bg-white file:px-3 file:py-1.5 file:text-xs file:tracking-[0.12em] file:text-black file:uppercase"
        />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="border border-white bg-white px-5 py-3 text-xs tracking-[0.16em] text-black uppercase disabled:opacity-60"
        >
          {saving ? "Saving…" : artwork ? "Save changes" : "Publish artwork"}
        </button>
        {artwork ? (
          <button
            type="button"
            onClick={() => void remove()}
            disabled={deleting}
            className="border border-white/30 px-5 py-3 text-xs tracking-[0.16em] text-zinc-300 uppercase hover:border-white hover:text-white"
          >
            {deleting ? "Deleting…" : "Delete post"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
