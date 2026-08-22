"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useCatalog } from "@/components/catalog-provider";
import type { Artwork, CartItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  detailed: Array<Artwork & { quantity: number }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aliloartz-cart";
const EMPTY_CART: CartItem[] = [];

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

function readCart(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedItems;
    cachedRaw = raw;
    cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY_CART;
    return cachedItems;
  } catch {
    cachedRaw = null;
    cachedItems = EMPTY_CART;
    return EMPTY_CART;
  }
}

function getServerCartSnapshot() {
  return EMPTY_CART;
}

function writeCart(items: CartItem[]) {
  const raw = JSON.stringify(items);
  localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedItems = items.length === 0 ? EMPTY_CART : items;
  window.dispatchEvent(new Event("aliloartz-cart"));
}

function subscribe(onStoreChange: () => void) {
  const onChange = () => {
    cachedRaw = null;
    onStoreChange();
  };
  window.addEventListener("storage", onChange);
  window.addEventListener("aliloartz-cart", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("aliloartz-cart", onChange);
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const catalog = useCatalog();
  const items = useSyncExternalStore(subscribe, readCart, getServerCartSnapshot);

  const addItem = useCallback((slug: string) => {
    const current = readCart();
    const existing = current.find((item) => item.slug === slug);
    const next = existing
      ? current.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...current, { slug, quantity: 1 }];
    writeCart(next);
  }, []);

  const removeItem = useCallback((slug: string) => {
    writeCart(readCart().filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
  }, []);

  const detailed = useMemo(
    () =>
      items
        .map((item) => {
          const artwork = catalog.artworks.find((entry) => entry.slug === item.slug);
          if (!artwork) return null;
          return { ...artwork, quantity: item.quantity };
        })
        .filter(Boolean) as Array<Artwork & { quantity: number }>,
    [catalog.artworks, items],
  );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = detailed.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      count,
      subtotal,
      detailed,
    }),
    [items, addItem, removeItem, clearCart, count, subtotal, detailed],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
