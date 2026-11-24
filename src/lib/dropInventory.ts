// Total units produced per drop — needed for sell-through rate (units sold /
// units made), which isn't derivable from dropRecords alone (that collection
// is only line-item orders, not production counts).
//
// These numbers aren't tracked anywhere as data in the Fall 2026 Financials
// sheet — they're hardcoded divisors buried inside that sheet's own
// "Sell-Through Rate" formulas (e.g. Heirs: `=COUNTA(Who)/35`). This mirrors
// those same numbers so the rate matches what the sheet itself reported.
// Drops not listed here (Justified, 2BWY, Surpassing, Calling, Stickers,
// Miscellaneous) never had a sell-through formula in the sheet — there's no
// known total to divide by, so sell-through just isn't computable for them.
//
// Update this map by hand when a new drop's total production count is known;
// there's no UI for it yet.
export const DROP_TOTAL_UNITS: Record<string, number> = {
  Heirs: 35,
  'Born Again': 35,
  'Forever.': 35,
  'Lux Aeterna': 40,
  'Abba X Spero Love Shirt': 70,
};
