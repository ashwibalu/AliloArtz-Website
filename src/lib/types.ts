export type Board = {
  slug: string;
  title: string;
  description: string;
  mood: string;
  coverImage: string;
};

export type Artwork = {
  slug: string;
  boardSlug: string;
  title: string;
  price: number;
  medium: string;
  size: string;
  availability: "Original" | "Prints" | "Limited";
  story: string;
  location?: string;
  date?: string;
  image: string;
  aspect: "portrait" | "landscape";
};

export type Catalog = {
  boards: Board[];
  artworks: Artwork[];
};

export type CartItem = {
  slug: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  address: string;
  city: string;
  country: string;
  items: Array<{
    slug: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: "paid" | "pending";
  provider: "stripe" | "studio-test";
  stripeSessionId?: string;
};
