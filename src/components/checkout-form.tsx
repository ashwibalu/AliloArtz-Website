"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export function CheckoutForm({ stripeEnabled }: { stripeEnabled: boolean }) {
  const router = useRouter();
  const { items, detailed, subtotal, count, clearCart } = useCart();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (count === 0) {
    return (
      <p className="text-zinc-400">
        Your cart is empty. Add a piece, then come back to checkout.
      </p>
    );
  }

  const pay = async (form?: FormData) => {
    setLoading(true);
    setError("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        email: form?.get("email"),
        name: form?.get("name"),
        address: form?.get("address"),
        city: form?.get("city"),
        country: form?.get("country"),
      }),
    });
    const data = (await response.json()) as { url?: string; error?: string };
    setLoading(false);
    if (!response.ok || !data.url) {
      setError(data.error || "Checkout failed.");
      return;
    }

    if (data.url.includes("/checkout/success")) {
      clearCart();
      const path = data.url.replace(/^https?:\/\/[^/]+/, "");
      router.push(path);
      return;
    }

    window.location.href = data.url;
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        {detailed.map((item) => (
          <div key={item.slug} className="flex items-center justify-between border-b border-white/10 py-3">
            <div>
              <p>{item.title}</p>
              <p className="text-sm text-zinc-400">
                {item.medium} · Qty {item.quantity}
              </p>
            </div>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
        <div className="flex justify-between pt-2 text-xl">
          <span>Total</span>
          <span>${subtotal}</span>
        </div>
      </section>

      {stripeEnabled ? (
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Guest checkout is supported. Stripe collects email, card, and shipping.
          </p>
          <button
            type="button"
            disabled={loading}
            onClick={() => void pay()}
            className="w-full border border-white bg-white px-5 py-3 text-sm tracking-[0.14em] text-black uppercase"
          >
            {loading ? "Redirecting…" : "Pay securely with Stripe"}
          </button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void pay(new FormData(event.currentTarget));
          }}
        >
          <p className="text-sm text-zinc-400">
            Card payments go live when you add Stripe keys. Until then, this test checkout
            still records a real order with guest details.
          </p>
          <input name="email" type="email" required placeholder="Email" className="w-full border border-white/15 bg-black px-3 py-2" />
          <input name="name" required placeholder="Full name" className="w-full border border-white/15 bg-black px-3 py-2" />
          <input name="address" required placeholder="Shipping address" className="w-full border border-white/15 bg-black px-3 py-2" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="city" placeholder="City" className="w-full border border-white/15 bg-black px-3 py-2" />
            <input name="country" placeholder="Country" className="w-full border border-white/15 bg-black px-3 py-2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-white bg-white px-5 py-3 text-sm tracking-[0.14em] text-black uppercase"
          >
            {loading ? "Placing order…" : "Complete purchase"}
          </button>
        </form>
      )}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
