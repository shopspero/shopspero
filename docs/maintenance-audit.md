# Maintenance audit

Scope: application source, route/action boundaries, configuration, package
manifest, and the storefront-to-checkout and staff workflows. This is a bounded
maintenance pass, not a claim that every path has been exercised in production.
No AGENTS.md instructions were found in the repository or its ancestor paths.

## Architecture and behavior

- Next.js App Router with public storefront pages and a client-gated admin
  layout. Server actions and finance API routes independently enforce access.
- NextAuth Google login checks the MongoDB staff allowlist; JWT permissions
  drive general/exec access. The JSON user file is still consumed by the
  `scripts/seed-users.mjs` migration and must not be deleted as “unused.”
- Firestore stores website orders and product inventory. Checkout reserves one
  unit before creating a Stripe session. Stripe webhooks update orders, restore
  expired-session stock, and send Gmail/Discord notifications.
- Finance dashboards read three Google Sheets tabs with a 60-second cache.
  These records are separate from the website orders in Firestore.
- Chakra components and CSS share the token system from the parent PR.

## Defects addressed

| Evidence | Impact and change |
| --- | --- |
| `package.json` invoked `next lint`, which Next 16 treats as a directory | Use the installed ESLint CLI and add explicit typecheck/test scripts. README's Node 18 requirement was also stale. |
| All three readers in `src/lib/sheets.ts` caught failures and returned `[]` | An unavailable service looked like valid empty financial data and could be cached. Let failures propagate; API handlers log and return generic 503 responses. Remove the repeated catch-and-empty wrappers. |
| Both finance clients called `res.json()` without checking status or handling rejection | A 403 object could crash rendering; network failures left a spinner indefinitely. Add error/retry states and abort obsolete requests on cleanup. |
| `getPaginatedOrders` sliced unchecked page arguments; the client displayed its requested page | A shrinking dataset or invalid page could show an impossible page. Normalize/clamp pagination and use the returned page in navigation. |
| Sheets numeric parser converted `N/A` and `$` to zero | Reject placeholders while retaining real zero, negative, and formatted currency values. |
| `reserveInventory` subtracted from unchecked stock and did not check document existence | Reject malformed product data before attempting writes; missing or empty products cannot reserve stock. |
| `upsertOrder` passed `id!` into Firestore's `doc()` | A missing ID can create a new document instead of editing an order. Reject missing/blank IDs without writing. |
| Confirmation email interpolated customer-controlled names and fields into HTML | Escape text before interpolation, with a regression test covering the actual webhook-to-email path. |
| Sign-out invoked `signOut()` during rendering | Move the side effect to an effect. |
| `profitColor` cast `undefined as unknown as string` | Return the accurate `string | undefined` type. |
| Existing product copy failed `react/no-unescaped-entities` | Escape the apostrophe without changing displayed text. |
| `src/lib/colors.ts` was an unused competing palette | Remove it after checking application/script imports, dynamic imports, framework conventions, configuration, and the private package's lack of exported entrypoints. Shared tokens remain the color source. |

The regression tests run real TypeScript source with external service-boundary
fakes, using Node's test runner and the existing TypeScript compiler. They test
returned data, authorization, writes, and rendered email content rather than
component internals or source-string matching. No production records are changed.

## Deliberately retained and follow-up priorities

1. **Checkout compensation:** `src/actions/checkout.ts` and
   `manuallyLogOrder` reserve inventory before downstream work. Failed Stripe
   session creation or order persistence can strand stock. Fix with a coordinated
   reservation/compensation design, including live-session expiration and
   failure recovery; simply incrementing stock after every error can oversell.
2. **Webhook idempotency and retries:** `src/app/api/webhook/route.ts` responds
   200 to handled-event failures and sends notifications on repeated success
   events. Changing only the response to 500 could cause duplicate notifications.
   Add persisted event processing/delivery state and test retries, concurrent
   deliveries, and async payment transitions together.
3. **Firestore read failures:** `getOrders` and `getProducts` return empty lists
   after errors. The UI can confuse a service failure with no records. A future
   pass should change these callers and loading/error states together without
   silently breaking existing array-returning APIs.
4. **Dependency upgrades:** npm's advisory counts indicate affected packages,
   not proof of reachable exploitation in this application. Next 16.4.3,
   NextAuth 4.24.15, and compatible protobufjs/websocket-driver updates are
   included; remaining SDK, mail, image, and tooling
   upgrades require focused compatibility work. Avoid `npm audit fix --force`.
5. **Historical storefront implementations:** older shop components and their
   carousel are not mounted by the current shop route, but appear to support
   rotating drops. Preserve them until retention intent is established. The
   archived faith content is explicitly documented as an archive.
6. **UI duplication:** order/product desktop tables and mobile cards duplicate
   fields. This is a maintenance cost, but not sufficient reason to introduce
   a generic table framework in this bug-fix pass. Extract shared field
   descriptions when those views next need coordinated behavior changes.

## Verification limits

Regression tests, ESLint, TypeScript, diff whitespace checks, and the production
build are exercised for this PR. Google Fonts require network access at build
time. Tests fake Firebase, Google Sheets, Stripe, mail, and staff sessions; real
OAuth, production service permissions, payments, mail delivery, and authenticated
browser interactions still need a configured staging smoke test.

The dependency audit started at 34 advisories (including four critical).
After compatible updates it reports 27 (zero critical, 15 high, 11 moderate,
one low). These remaining advisories need separate triage and compatibility
testing. The build also warns that React 18 support will end in Next 17;
a React/Chakra migration should be planned before adopting that major version.
The framework update requires TypeScript `moduleResolution: bundler`.
Old `.next/dev/types` generated by the previous framework version must be
regenerated when switching between these branches.
