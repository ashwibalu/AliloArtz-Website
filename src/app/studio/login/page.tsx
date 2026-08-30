"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudioLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-5 pb-16 pt-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Studio</h1>
      <p className="text-sm text-zinc-400">
        Sign in to upload, edit, or delete artwork posts.
      </p>
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const password = String(new FormData(event.currentTarget).get("password") || "");
          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (!response.ok) {
            setError("Wrong password.");
            return;
          }
          router.push("/studio");
          router.refresh();
        }}
      >
        <input
          name="password"
          type="password"
          required
          placeholder="Studio password"
          className="w-full border border-white/15 bg-black px-3 py-3"
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          className="w-full border border-white bg-white px-5 py-3 text-xs tracking-[0.16em] text-black uppercase"
        >
          Enter studio
        </button>
      </form>
      <p className="text-xs text-zinc-500">Default local password: aliloartz</p>
    </main>
  );
}
