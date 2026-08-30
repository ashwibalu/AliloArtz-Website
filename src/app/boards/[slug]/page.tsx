import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const board = catalog.boards.find((item) => item.slug === slug);

  if (!board) notFound();

  const boardArtworks = catalog.artworks.filter((artwork) => artwork.boardSlug === board.slug);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 pb-16 pt-24 md:px-10">
      <div className="flex items-center justify-between text-sm text-zinc-400">
        <Link href="/#boards" className="transition hover:text-white">
          ← All boards
        </Link>
        <span className="tracking-[0.16em] uppercase">{boardArtworks.length} works</span>
      </div>

      <section className="relative min-h-[42vh] overflow-hidden">
        <Image
          src={board.coverImage}
          alt={board.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="relative z-10 flex min-h-[42vh] flex-col justify-end p-6 md:p-10">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            {board.title}
          </h1>
          <p className="mt-3 max-w-xl text-zinc-200">{board.description}</p>
          <p className="mt-2 text-xs tracking-[0.16em] text-zinc-400 uppercase">
            {board.mood}
          </p>
        </div>
      </section>

      <section className="masonry">
        {boardArtworks.map((artwork) => (
          <Link
            key={artwork.slug}
            href={`/art/${artwork.slug}`}
            className="masonry-item group relative block overflow-hidden bg-zinc-900"
          >
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={800}
              height={artwork.aspect === "landscape" ? 560 : 1060}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100">
              <h2 className="text-base font-medium">{artwork.title}</h2>
              <p className="mt-1 text-sm text-zinc-300">${artwork.price}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
