import Link from "next/link";
import { redirect } from "next/navigation";
import { ArtworkForm } from "@/components/artwork-form";
import { isAdmin } from "@/lib/admin-auth";
import { getCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function NewArtworkPage() {
  if (!(await isAdmin())) redirect("/studio/login");
  const { boards } = await getCatalog();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-5 pb-16 pt-24 md:px-10">
      <Link href="/studio" className="text-sm text-zinc-400 hover:text-white">
        ← Studio
      </Link>
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Upload artwork</h1>
      <ArtworkForm boards={boards} />
    </main>
  );
}
