# AliloArtz Website

Portfolio + commerce experience for selling original artwork.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product Vision

Create an internship-worthy art platform where:
- Visitors explore board-style collections (Pinterest-inspired discovery)
- Each artwork has story, details, and product info (portfolio quality)
- Buying feels clean and secure (Etsy-inspired commerce confidence)

This should showcase modern web development skills while staying practical to build.

## Suggested Tech Stack (Modern + Recruiter Friendly)

- Frontend: Next.js (App Router), React, TypeScript
- Styling: Tailwind CSS + shadcn/ui + Framer Motion
- Data: PostgreSQL + Prisma ORM
- Auth: Clerk or Auth.js (email/password + social + guest checkout path)
- Payments: Stripe Checkout + webhooks
- Media: Cloudinary or UploadThing + image optimization
- State: React Server Components + client state for cart
- Deploy: Vercel
- Analytics: PostHog or Vercel Analytics

## Core User Flow

1. Land on homepage showing visual boards/categories
2. Open a board (e.g. Abstract, Portraits, Anime, Minimal)
3. Browse matching artworks in a masonry/grid feed
4. Open artwork detail page with:
   - high-res image
   - title, medium, size, availability
   - artist notes and process/story
   - price and add-to-cart
5. Checkout as logged-in user or guest
6. Receive order confirmation and status updates

## Site Map (MVP)

- `/` Home with featured boards
- `/boards/[slug]` Board page with art feed + filters
- `/art/[slug]` Product detail page
- `/cart` Cart page
- `/checkout` Checkout handoff
- `/login`, `/signup` Auth pages
- `/profile/orders` Customer orders
- `/admin` Manage artwork, boards, inventory, orders

## Data Model (Initial)

- `User`
- `Board` (name, slug, coverImage)
- `Artwork` (title, slug, description, price, images, inventory, boardId)
- `ArtworkImage` (url, alt, sortOrder)
- `Cart` and `CartItem`
- `Order` and `OrderItem`
- `Address`
- `Payment` (status, providerRef)

## Feature Phases

### Phase 1 - Foundation + Discovery UI

- Scaffold Next.js app
- Build homepage with board cards
- Build board listing page with masonry-style layout
- Build artwork detail page UI
- Seed with sample data

### Phase 2 - Commerce

- Add cart state and cart page
- Integrate Stripe checkout
- Add order confirmation flow

### Phase 3 - Auth + Dashboard

- User login/signup
- Guest checkout support
- Profile and orders page
- Basic admin for adding/editing artworks

### Phase 4 - Polish + Internship Wow

- Motion and micro-interactions
- Accessibility and SEO upgrades
- Performance tuning (LCP, image strategy, caching)
- Analytics + conversion events
- Optional AI search/recommendations by style

## Design Direction

- Visual style: premium, editorial, clean dark/light support
- Layout: masonry feed + large immersive detail pages
- Typography: strong display heading + readable body copy
- UI feel: smooth transitions, subtle parallax, polished hover states

## Security/Trust Checklist

- HTTPS-only deployment
- Secure auth sessions
- Stripe handles card details (no raw card storage)
- Server-side order validation
- Input validation and rate limiting
- Basic fraud and abuse protections

## Immediate Next Steps

1. Install Node.js LTS (includes npm)
2. Scaffold Next.js project in this repo
3. Build Phase 1 pages with static data first
4. Connect database and auth
5. Add payments and order flow

---

If you want, next I can generate the full Phase 1 code structure (components, routes, sample data, and styling system) as soon as Node.js is available.
