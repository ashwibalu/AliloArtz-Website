import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const artwork = catalog.artworks.find((item) => item.slug === slug);

  if (!artwork) notFound();

  const board = catalog.boards.find((item) => item.slug === artwork.boardSlug);

  return (
    <main className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-5 pb-16 pt-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 md:px-10">
      <div className="relative overflow-hidden bg-zinc-950">
        <Image
          src={artwork.image}
          alt={artwork.title}
          width={1200}
          height={artwork.aspect === "landscape" ? 800 : 1600}
          className="h-auto w-full object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>

      <article className="flex flex-col justify-center space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div>
          <Link
            href={`/boards/${artwork.boardSlug}`}
            className="text-xs tracking-[0.18em] text-zinc-400 uppercase transition hover:text-white"
          >
            {board?.title ?? "Board"}
          </Link>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl">
            {artwork.title}
          </h1>
          <p className="mt-4 text-2xl">${artwork.price}</p>
        </div>

        <p className="text-zinc-300 leading-relaxed">{artwork.story}</p>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-white/10 py-5 text-sm">
          <div>
            <dt className="text-zinc-500">Materials</dt>
            <dd className="mt-1">{artwork.medium}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Size</dt>
            <dd className="mt-1">{artwork.size}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Availability</dt>
            <dd className="mt-1">{artwork.availability}</dd>
          </div>
          {artwork.location ? (
            <div>
              <dt className="text-zinc-500">Place</dt>
              <dd className="mt-1">{artwork.location}</dd>
            </div>
          ) : null}
          {artwork.date ? (
            <div>
              <dt className="text-zinc-500">Drawn</dt>
              <dd className="mt-1">{artwork.date}</dd>
            </div>
          ) : null}
        </dl>

        <AddToCartButton slug={artwork.slug} />
        <Link href="/cart" className="text-center text-sm text-zinc-400 transition hover:text-white">
          View cart →
        </Link>
      </article>
    </main>
  );
}
