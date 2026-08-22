import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  if (!(await isAdmin())) redirect("/studio/login");

  const { artworks } = await getCatalog();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 pb-16 pt-24 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-zinc-400 uppercase">Private</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Studio</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/studio/new"
            className="border border-white bg-white px-4 py-2 text-xs tracking-[0.14em] text-black uppercase"
          >
            Upload artwork
          </Link>
          <form action="/studio/logout" method="post">
            <button
              type="submit"
              className="border border-white/20 px-4 py-2 text-xs tracking-[0.14em] text-zinc-300 uppercase"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      <section className="space-y-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.slug}
            href={`/studio/${artwork.slug}`}
            className="grid grid-cols-[72px_1fr_auto] items-center gap-4 border border-white/10 p-3 transition hover:border-white/40"
          >
            <div className="relative h-16 overflow-hidden bg-zinc-900">
              <Image src={artwork.image} alt="" fill className="object-cover" sizes="72px" />
            </div>
            <div>
              <p className="font-medium">{artwork.title}</p>
              <p className="text-sm text-zinc-400">
                {artwork.medium} · {artwork.size} · ${artwork.price}
              </p>
            </div>
            <span className="text-xs tracking-[0.14em] text-zinc-500 uppercase">Edit</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
