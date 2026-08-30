import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArtworkForm } from "@/components/artwork-form";
import { isAdmin } from "@/lib/admin-auth";
import { getCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

type EditPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditArtworkPage({ params }: EditPageProps) {
  if (!(await isAdmin())) redirect("/studio/login");
  const { slug } = await params;
  const catalog = await getCatalog();
  const artwork = catalog.artworks.find((item) => item.slug === slug);
  if (!artwork) notFound();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-5 pb-16 pt-24 md:px-10">
      <Link href="/studio" className="text-sm text-zinc-400 hover:text-white">
        ← Studio
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Edit artwork</h1>
      <ArtworkForm boards={catalog.boards} artwork={artwork} />
    </main>
  );
}
