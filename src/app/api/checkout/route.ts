import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCatalog, saveOrder } from "@/lib/catalog-store";
import type { CartItem, Order } from "@/lib/types";

export const dynamic = "force-dynamic";

type CheckoutBody = {
  items?: CartItem[];
  email?: string;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
};

function originFrom(request: Request) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000"
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutBody;
  const items = body.items ?? [];
  if (!items.length) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const catalog = await getCatalog();
  const priced = items
    .map((item) => {
      const artwork = catalog.artworks.find((entry) => entry.slug === item.slug);
      if (!artwork) return null;
      return {
        slug: artwork.slug,
        title: artwork.title,
        price: artwork.price,
        quantity: Math.max(1, Math.min(10, item.quantity || 1)),
        image: artwork.image,
      };
    })
    .filter(Boolean) as Array<{
    slug: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;

  if (!priced.length) {
    return NextResponse.json(
      { error: "Those artworks are no longer available." },
      { status: 400 },
    );
  }

  const total = priced.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const origin = originFrom(request);
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (stripeKey) {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email || undefined,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "IN", "SG", "JP"],
      },
      line_items: priced.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.title,
            images: item.image.startsWith("http") ? [item.image] : [],
          },
        },
      })),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  }

  const email = String(body.email || "").trim();
  const name = String(body.name || "").trim();
  const address = String(body.address || "").trim();
  if (!email || !name || !address) {
    return NextResponse.json(
      {
        error:
          "Add Stripe keys for card payments, or enter email, name, and address for test checkout.",
        needsDetails: true,
      },
      { status: 400 },
    );
  }

  const order: Order = {
    id: `ord_${Date.now()}`,
    createdAt: new Date().toISOString(),
    email,
    name,
    address,
    city: String(body.city || "").trim(),
    country: String(body.country || "").trim(),
    items: priced.map(({ slug, title, price, quantity }) => ({
      slug,
      title,
      price,
      quantity,
    })),
    total,
    status: "paid",
    provider: "studio-test",
  };

  await saveOrder(order);
  return NextResponse.json({ url: `${origin}/checkout/success?order=${order.id}` });
}
