"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Artwork, Catalog } from "@/lib/types";

const CatalogContext = createContext<Catalog | null>(null);

export function CatalogProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial: Catalog;
}) {
  const [catalog, setCatalog] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const response = await fetch("/api/catalog", { cache: "no-store" });
      if (!response.ok || cancelled) return;
      setCatalog((await response.json()) as Catalog);
    };

    load();
    window.addEventListener("focus", load);
    window.addEventListener("aliloartz-catalog", load);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
      window.removeEventListener("aliloartz-catalog", load);
    };
  }, []);

  return (
    <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error("useCatalog must be used within CatalogProvider");
  return catalog;
}

export function useArtwork(slug: string): Artwork | undefined {
  return useCatalog().artworks.find((artwork) => artwork.slug === slug);
}

export function notifyCatalogChanged() {
  window.dispatchEvent(new Event("aliloartz-catalog"));
}
