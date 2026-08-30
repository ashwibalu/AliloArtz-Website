"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className="pointer-events-auto font-[family-name:var(--font-display)] text-lg tracking-[0.18em] text-white mix-blend-difference md:text-xl"
        >
          ALILOARTZ
        </Link>
        <nav className="pointer-events-auto flex items-center gap-5 text-sm text-white mix-blend-difference">
          <Link href="/#boards" className="opacity-80 transition hover:opacity-100">
            Boards
          </Link>
          <Link href="/studio" className="opacity-80 transition hover:opacity-100">
            Studio
          </Link>
          <Link href="/cart" className="opacity-80 transition hover:opacity-100">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
