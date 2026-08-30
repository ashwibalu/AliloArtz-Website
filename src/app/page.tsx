import Image from "next/image";
import Link from "next/link";
import { getCatalog, getHeroArtwork } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const catalog = await getCatalog();
  const { boards, artworks } = catalog;
  const heroArtwork = getHeroArtwork(catalog);

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative min-h-[100svh] overflow-hidden">
        {heroArtwork ? (
          <Image
            src={heroArtwork.image}
            alt={heroArtwork.title}
            fill
            priority
            className="object-cover object-center slow-zoom"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
          <p className="fade-in font-[family-name:var(--font-display)] text-5xl tracking-[0.14em] text-white md:text-7xl lg:text-8xl">
            ALILOARTZ
          </p>
          <h1 className="reveal-up mt-5 max-w-xl text-xl text-zinc-100 md:text-2xl" style={{ animationDelay: "120ms" }}>
            Sketchbook originals and prints, sold like a gallery you can shop.
          </h1>
          <p className="reveal-up mt-3 max-w-md text-sm text-zinc-300 md:text-base" style={{ animationDelay: "220ms" }}>
            Pick a board. Find the piece. Add it to cart.
          </p>
          <div className="reveal-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
            <Link
              href="/#boards"
              className="border border-white bg-white px-6 py-3 text-xs font-medium tracking-[0.16em] text-black uppercase transition hover:bg-transparent hover:text-white"
            >
              Browse boards
            </Link>
            {heroArtwork ? (
              <Link
                href={`/art/${heroArtwork.slug}`}
                className="border border-white/50 px-6 py-3 text-xs font-medium tracking-[0.16em] text-white uppercase transition hover:border-white hover:bg-white/10"
              >
                View featured work
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section id="boards" className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs tracking-[0.22em] text-zinc-400 uppercase">Collections</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl">
            Boards of interest
          </h2>
          <p className="mt-3 text-zinc-400">
            Not Pinterest — themed rooms of AliloArtz work. Open one and shop what fits.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {boards.map((board) => {
            const count = artworks.filter((a) => a.boardSlug === board.slug).length;
            return (
              <Link
                key={board.slug}
                href={`/boards/${board.slug}`}
                className="group relative block min-h-[320px] overflow-hidden md:min-h-[420px]"
              >
                <Image
                  src={board.coverImage}
                  alt={board.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
                        {board.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-zinc-300">{board.description}</p>
                      <p className="mt-2 text-xs tracking-[0.14em] text-zinc-400 uppercase">
                        {board.mood}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs tracking-[0.16em] text-zinc-300 uppercase">
                      {count} works
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
