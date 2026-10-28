import {
  getCostsSheet,
  getDropsSheet,
  getOrdersSheet,
  SheetDrop,
  SheetOrder,
} from './sheets';

const SIZES = ['S', 'M', 'L', 'XL'] as const;

export interface DropStats {
  drop: string;
  semester?: string;
  sold: number;
  revenue: number;
  costs: number;
  profit: number;
  margin: number | null;
  soldOut: boolean;
  sizeBreakdown: { size: string; sold: number; share: number | null }[];
}

export interface SemesterStats {
  semester: string;
  revenue: number;
  costs: number;
  profit: number;
}

export interface FinancesDashboard {
  totals: {
    totalRevenue: number;
    totalCosts: number;
    profit: number;
    totalDonated: number;
    itemsSold: number;
  };
  moneyLocations: { label: string; amount: number }[];
  drops: DropStats[];
  bySemester: SemesterStats[];
}

function sum(values: (number | undefined)[]): number {
  return values.reduce<number>((acc, v) => acc + (v ?? 0), 0);
}

function computeDropStats(
  drop: SheetDrop,
  orders: SheetOrder[],
  costs: number
): DropStats {
  const dropOrders = orders.filter((o) => o.drop === drop.drop);
  const revenue = sum(dropOrders.map((o) => o.amount));
  const sold = sum(dropOrders.map((o) => o.qty ?? 1));
  const profit = revenue - costs;

  const sizedOrders = dropOrders.filter((o) => o.size);
  const sizedSold = sum(sizedOrders.map((o) => o.qty ?? 1));
  const sizeBreakdown = SIZES.map((size) => {
    const soldForSize = sum(
      sizedOrders.filter((o) => o.size === size).map((o) => o.qty ?? 1)
    );
    return {
      size,
      sold: soldForSize,
      share: sizedSold > 0 ? soldForSize / sizedSold : null,
    };
  });

  return {
    drop: drop.drop,
    semester: drop.semester,
    sold,
    revenue,
    costs,
    profit,
    margin: revenue > 0 ? profit / revenue : null,
    soldOut:
      drop.status?.toLowerCase() === 'done' ||
      drop.status?.toLowerCase() === 'sold out',
    sizeBreakdown,
  };
}

export async function getFinancesDashboard(): Promise<FinancesDashboard> {
  const [orders, costRows, drops] = await Promise.all([
    getOrdersSheet(),
    getCostsSheet(),
    getDropsSheet(),
  ]);

  const costsByDrop = new Map<string, number>();
  for (const cost of costRows) {
    if (!cost.drop) continue;
    costsByDrop.set(cost.drop, (costsByDrop.get(cost.drop) ?? 0) + (cost.amount ?? 0));
  }

  // "All drops, newest first" - the sheet lists drops with the most recently
  // added row last in the Drops tab, so reverse to get newest-first.
  const dropStats = [...drops]
    .reverse()
    .map((drop) => computeDropStats(drop, orders, costsByDrop.get(drop.drop) ?? 0));

  const totalRevenue = sum(dropStats.map((d) => d.revenue));
  const totalCosts = sum(dropStats.map((d) => d.costs));
  const totalDonated = sum(drops.map((d) => d.donated));
  const itemsSold = sum(orders.map((o) => o.qty ?? 1));

  const moneyWithTotals = new Map<string, number>();
  for (const order of orders) {
    const label = order.moneyWith?.trim() || 'Not marked';
    moneyWithTotals.set(label, (moneyWithTotals.get(label) ?? 0) + (order.amount ?? 0));
  }
  const moneyLocations = Array.from(moneyWithTotals, ([label, amount]) => ({
    label,
    amount,
  }));

  const semesters = Array.from(
    new Set(drops.map((d) => d.semester).filter((s): s is string => !!s))
  );
  const bySemester: SemesterStats[] = semesters.map((semester) => {
    const semesterDrops = dropStats.filter((d) => d.semester === semester);
    const revenue = sum(semesterDrops.map((d) => d.revenue));
    const costs = sum(semesterDrops.map((d) => d.costs));
    return { semester, revenue, costs, profit: revenue - costs };
  });

  return {
    totals: {
      totalRevenue,
      totalCosts,
      profit: totalRevenue - totalCosts,
      totalDonated,
      itemsSold,
    },
    moneyLocations,
    drops: dropStats,
    bySemester,
  };
}

function parseDate(value?: string): number {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

export interface PaginatedOrders {
  orders: SheetOrder[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getPaginatedOrders(
  page: number,
  pageSize: number
): Promise<PaginatedOrders> {
  const orders = await getOrdersSheet();
  const sorted = [...orders].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
  );
  const safePageSize = Number.isSafeInteger(pageSize) && pageSize > 0 ? pageSize : 20;
  const requestedPage = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const totalPages = Math.max(1, Math.ceil(sorted.length / safePageSize));
  const safePage = Math.min(requestedPage, totalPages);
  const start = (safePage - 1) * safePageSize;
  return {
    orders: sorted.slice(start, start + safePageSize),
    total: sorted.length,
    page: safePage,
    pageSize: safePageSize,
  };
}
