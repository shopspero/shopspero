# Admin dashboard archive

These admin dashboard tabs are archived outside the Next.js app directory and have no public route:

- `finances/` — Finances tab + Drop Orders tab (`/admin/finances`, `/admin/finances/orders`), including the
  Google Sheets-backed data layer (`finances/lib/sheets.ts`, `finances/lib/finances.ts`) and the API routes
  that served them (`finances/api/dashboard`, `finances/api/orders`).
- `orders/` — Online Orders > Orders tab (`/admin/orders`, `/admin/orders/[id]`).
- `log-order/` — Online Orders > Log Order tab (`/admin/log-order`).
- `products/` — Online Orders > Products tab (`/admin/products`).
- `exec/` — Exec tab (`/admin/exec`).

They were pulled from the staff admin nav (`src/app/(internal)/admin/layout.tsx`) because a new dashboard is
being built with MongoDB as the source of truth, replacing the Google Sheets-based Finances/Drop Orders data
in particular. The code is preserved here for reference and restoration — to bring a tab back, move its
folder back under `src/app/(internal)/admin/`, restore any `@/lib` or `@/app/api` files it depended on, and
re-add its entry to `allNavLinks` in the admin layout.
