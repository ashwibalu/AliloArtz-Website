"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start gap-6 px-5 pb-16 pt-28 md:px-10">
      <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">Order confirmed</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">
        Thank you.
      </h1>
      <p className="max-w-lg text-zinc-300">
        Your artwork order is in. A confirmation will go to the email used at checkout.
      </p>
      <Link
        href="/#boards"
        className="border border-white bg-white px-5 py-3 text-xs tracking-[0.16em] text-black uppercase"
      >
        Back to gallery
      </Link>
    </main>
  );
}
