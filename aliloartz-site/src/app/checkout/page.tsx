import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-5 pb-16 pt-24 md:px-10">
      <div>
        <Link href="/cart" className="text-sm text-zinc-400 hover:text-white">
          ← Back to cart
        </Link>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl md:text-5xl">
          Checkout
        </h1>
        <p className="mt-3 text-zinc-400">
          Guest checkout. Prices are locked from the current catalog at purchase time.
        </p>
      </div>
      <CheckoutForm stripeEnabled={stripeEnabled} />
    </main>
  );
}
