"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const { detailed, subtotal, removeItem, clearCart, count } = useCart();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-5 pb-16 pt-24 md:px-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">Checkout ready</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl">
            Cart
          </h1>
        </div>
        <Link href="/#boards" className="text-sm text-zinc-400 transition hover:text-white">
          ← Keep browsing
        </Link>
      </div>

      {count === 0 ? (
        <section className="border border-white/10 px-6 py-16 text-center">
          <p className="text-zinc-300">Your cart is empty.</p>
          <Link
            href="/#boards"
            className="mt-6 inline-block border border-white bg-white px-5 py-3 text-xs tracking-[0.16em] text-black uppercase"
          >
            Browse boards
          </Link>
        </section>
      ) : (
        <>
          <section className="space-y-4">
            {detailed.map((item) => (
              <article
                key={item.slug}
                className="grid grid-cols-[96px_1fr_auto] items-center gap-4 border border-white/10 p-3 md:grid-cols-[120px_1fr_auto]"
              >
                <div className="relative h-24 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {item.medium} · Qty {item.quantity}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="mt-2 text-xs text-zinc-500 underline-offset-2 hover:text-white hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-lg">${item.price * item.quantity}</p>
              </article>
            ))}
          </section>

          <section className="space-y-4 border border-white/10 p-6">
            <div className="flex items-center justify-between text-zinc-300">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 text-sm">
              <span>Shipping</span>
              <span>Collected at checkout</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xl">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full border border-white bg-white px-5 py-3 text-center text-sm tracking-[0.14em] text-black uppercase"
            >
              Proceed to checkout
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-sm text-zinc-500 transition hover:text-white"
            >
              Clear cart
            </button>
          </section>
        </>
      )}
    </main>
  );
}
