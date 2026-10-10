# Merchant of Beauty

Production eCommerce store for professional spa, salon and tattoo equipment in Lagos, Nigeria.
Live at **[themerchantofbeauty.com](https://themerchantofbeauty.com)**. Built and shipped end to end by [Moses Nwigberi](https://mosesnwigberi.com).

Customers browse the catalogue, add items to a cart and place orders; the business confirms each order
with the customer, moves it through fulfilment statuses and issues PDF invoices from a private dashboard.
Catalogue content is managed by non-technical staff in Sanity.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Content | Sanity (embedded Studio at `/admin-studio`) |
| Data | Neon PostgreSQL + Drizzle ORM |
| Auth | Auth.js / NextAuth v5 (JWT sessions, owner and staff roles) |
| Client state | Zustand (cart) |
| Validation | Zod |
| Rate limiting | Redis |
| Documents | `@react-pdf/renderer` (invoices) |
| Hosting | Vercel (including cron) |

## Architecture

```
src/
├── app/
│   ├── (shop)/          storefront: home, products, product detail, checkout, order tracking
│   ├── (admin)/         dashboard: orders, invoices, reviews, staff
│   ├── admin-studio/    embedded Sanity Studio
│   └── api/             external callers only: Sanity webhook, cron, PDF streams
├── actions/             Server Actions — thin: auth check, Zod validation, call a service
├── services/            business logic and database access
├── lib/                 db client, auth config, SEO builders, rate limiter, shared utils
├── components/          shop/ and admin/ UI
├── store/               Zustand stores
└── types/               shared types
```

**Two sources of truth, split by who edits them.** Product content (titles, prices, images, stock)
lives in Sanity so staff can edit it without a developer. Transactional data (orders, invoices,
reviews, users) lives in PostgreSQL, where it gets relational integrity and transactions.
Orders store a snapshot of each product's name and price, so editing or deleting a product
never rewrites past orders.

**Mutations go through Server Actions; API routes are only for external callers.** UI-triggered
writes (checkout, status updates, reviews, staff management) are Server Actions that validate with
Zod and delegate to the service layer. Route handlers exist only for things a browser form can't
call: the Sanity webhook, the Vercel cron job and binary PDF downloads.

## Rendering and caching

- Product pages are statically generated with `generateStaticParams` and served from cache.
- **On-demand revalidation:** a Sanity webhook hits `/api/revalidate`, which maps the changed
  document type to cache tags and calls `revalidateTag`. Price or stock edits go live within
  seconds, with no redeploy and no time-based revalidation.
- The home page streams its sections behind `<Suspense>` with matching skeletons, so a slow
  query never blocks the rest of the page.
- Images go through `next/image` (Sanity CDN), fonts through `next/font`.

## Technical SEO

- `generateMetadata` per product (title, description, OpenGraph image) and canonical URLs on
  every storefront route.
- JSON-LD built by typed helpers in `src/lib/seo.ts`: Product with Offer, AggregateRating and
  Review; BreadcrumbList; Store (with addresses) and WebSite.
- `sitemap.ts` generated from the live catalogue; `robots.ts` keeps the dashboard, checkout and
  Studio out of the index.

## Reliability and security

- **Atomic orders:** order creation writes the order and all its line items inside one
  `db.transaction`. Neon's HTTP driver can't run transactions, so the app uses the
  WebSocket driver (`neon-serverless`).
- **Rate limiting:** Redis `INCR` + `PEXPIRE` fixed-window limiter on public writes (order
  placement and reviews).
- **Role-based access:** owner-only actions (staff management, site theme) are re-checked
  inside each Server Action, not only in the UI.
- **Housekeeping cron:** a daily Vercel cron, authenticated with a Bearer secret, removes
  unconfirmed orders that have been pending for 48 hours.
- **Review moderation:** reviews are hidden until approved in the dashboard.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run db:push              # create tables
npm run db:seed              # create the owner account from SEED_OWNER_* vars
npm run sanity:seed          # optional: sample catalogue
npm run dev
```

Shop at `http://localhost:3000`, dashboard at `/login`, Studio at `/admin-studio`.
