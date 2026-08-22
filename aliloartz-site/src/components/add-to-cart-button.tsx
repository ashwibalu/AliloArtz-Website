"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      className="w-full border border-white bg-white px-5 py-3 text-sm font-medium tracking-[0.12em] text-black uppercase transition hover:bg-transparent hover:text-white"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
