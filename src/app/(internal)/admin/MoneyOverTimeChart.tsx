'use client';

import { Box, HStack, Text } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import type { DropRecord } from '@/lib/dropRecords';

// Categorical slots 1/2/3 from the validated default palette (see the
// dataviz skill's references/palette.md) — blue, orange, aqua. Revenue,
// cost, and profit are three parallel series of the same kind (money), not a
// good/bad status, so they take fixed categorical identity slots rather than
// status colors.
const SERIES = {
  revenue: { label: 'Revenue', color: '#2a78d6' },
  cost: { label: 'Cost', color: '#eb6834' },
  profit: { label: 'Profit', color: '#1baf7a' },
} as const;

const TEXT_PRIMARY = '#0b0b0b';
const TEXT_SECONDARY = '#52514e';
const TEXT_MUTED = '#898781';
const GRIDLINE = '#e1e0d9';
const BASELINE = '#c3c2b7';
const SURFACE = '#fcfcfb';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const moneyCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});
const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

interface Point {
  t: number; // day timestamp (UTC midnight)
  revenue: number;
  cost: number;
  profit: number;
}

// "Nice" round tick step (1/2/2.5/5/10 × a power of ten), so axis labels read
// as clean numbers rather than raw division remainders.
function niceTicks(min: number, max: number, count: number): number[] {
  if (min === max) return [min];
  const range = max - min;
  const rawStep = range / count;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const niceNormalized = [1, 2, 2.5, 5, 10].find((n) => n >= normalized) ?? 10;
  const step = niceNormalized * magnitude;
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + step / 2; v += step) {
    ticks.push(Math.round(v * 100) / 100);
  }
  return ticks;
}

// Cumulative revenue/cost/profit over time, one point per day that has at
// least one dated order. Records without a date (Heirs/Born Again/Forever.
// have no Date column in the sheet) can't be placed on a timeline, so
// they're summed separately and reported in the caption instead of silently
// dropped.
function buildSeries(records: DropRecord[]): { points: Point[]; undatedCount: number } {
  const byDay = new Map<number, { revenue: number; cost: number }>();
  let undatedCount = 0;

  for (const r of records) {
    if (!r.date) {
      undatedCount += 1;
      continue;
    }
    const t = new Date(r.date + 'T00:00:00Z').getTime();
    if (Number.isNaN(t)) {
      undatedCount += 1;
      continue;
    }
    const day = byDay.get(t) ?? { revenue: 0, cost: 0 };
    day.revenue += r.revenue ?? 0;
    day.cost += r.cost ?? 0;
    byDay.set(t, day);
  }

  const days = Array.from(byDay.entries()).sort((a, b) => a[0] - b[0]);
  let cumRevenue = 0;
  let cumCost = 0;
  const points: Point[] = days.map(([t, day]) => {
    cumRevenue += day.revenue;
    cumCost += day.cost;
    return { t, revenue: cumRevenue, cost: cumCost, profit: cumRevenue - cumCost };
  });

  return { points, undatedCount };
}

const WIDTH = 760;
const HEIGHT = 320;
const MARGIN = { top: 16, right: 88, bottom: 28, left: 64 };
const PLOT_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

export default function MoneyOverTimeChart({ records }: { records: DropRecord[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { points } = useMemo(() => buildSeries(records), [records]);

  const scales = useMemo(() => {
    if (points.length === 0) return null;
    const minT = points[0].t;
    const maxT = points[points.length - 1].t;
    const allValues = points.flatMap((p) => [p.revenue, p.cost, p.profit]);
    const minVRaw = Math.min(0, ...allValues);
    const maxVRaw = Math.max(0, ...allValues);
    const pad = (maxVRaw - minVRaw) * 0.1 || 1;
    const minV = minVRaw - (minVRaw < 0 ? pad : 0);
    const maxV = maxVRaw + pad;

    const x = (t: number) =>
      MARGIN.left + (maxT === minT ? PLOT_WIDTH / 2 : ((t - minT) / (maxT - minT)) * PLOT_WIDTH);
    const y = (v: number) =>
      MARGIN.top + PLOT_HEIGHT - ((v - minV) / (maxV - minV)) * PLOT_HEIGHT;

    return { x, y, minV, maxV };
  }, [points]);

  if (points.length < 2 || !scales) {
    return (
      <Text color="gray.500" fontSize="sm">
        Not enough dated orders to plot a trend yet.
      </Text>
    );
  }

  const { x, y, minV, maxV } = scales;
  const yTicks = niceTicks(minV, maxV, 4);

  const pathFor = (key: 'revenue' | 'cost' | 'profit') =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.t)} ${y(p[key])}`).join(' ');

  const last = points[points.length - 1];
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const viewBoxX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let nearestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(x(p.t) - viewBoxX);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  }

  return (
    <Box>
      <HStack gap={5} mb={2} fontSize="xs" color={TEXT_SECONDARY}>
        {Object.values(SERIES).map((s) => (
          <HStack key={s.label} gap={2}>
            <Box w="14px" h="2px" bg={s.color} borderRadius="full" />
            <Text>{s.label}</Text>
          </HStack>
        ))}
      </HStack>

      <Box position="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          height="auto"
          style={{ display: 'block', background: SURFACE }}
          onPointerMove={handleMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          {/* gridlines + y-axis labels */}
          {yTicks.map((t) => (
            <g key={t}>
              <line
                x1={MARGIN.left}
                x2={WIDTH - MARGIN.right}
                y1={y(t)}
                y2={y(t)}
                stroke={t === 0 ? BASELINE : GRIDLINE}
                strokeWidth={1}
              />
              <text
                x={MARGIN.left - 8}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill={TEXT_MUTED}
              >
                {moneyCompact.format(t)}
              </text>
            </g>
          ))}

          {/* x-axis endpoints */}
          <text x={MARGIN.left} y={HEIGHT - 6} fontSize={11} fill={TEXT_MUTED}>
            {dateFmt.format(points[0].t)}
          </text>
          <text
            x={WIDTH - MARGIN.right}
            y={HEIGHT - 6}
            textAnchor="end"
            fontSize={11}
            fill={TEXT_MUTED}
          >
            {dateFmt.format(last.t)}
          </text>

          {/* series lines */}
          {(Object.keys(SERIES) as Array<keyof typeof SERIES>).map((key) => (
            <path
              key={key}
              d={pathFor(key)}
              fill="none"
              stroke={SERIES[key].color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* end markers + direct end-labels */}
          {(Object.keys(SERIES) as Array<keyof typeof SERIES>).map((key) => (
            <g key={key}>
              <circle
                cx={x(last.t)}
                cy={y(last[key])}
                r={4}
                fill={SERIES[key].color}
                stroke={SURFACE}
                strokeWidth={2}
              />
              <text
                x={x(last.t) + 8}
                y={y(last[key])}
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fill={TEXT_PRIMARY}
              >
                {moneyCompact.format(last[key])}
              </text>
            </g>
          ))}

          {/* hover crosshair */}
          {hovered && (
            <g>
              <line
                x1={x(hovered.t)}
                x2={x(hovered.t)}
                y1={MARGIN.top}
                y2={HEIGHT - MARGIN.bottom}
                stroke={BASELINE}
                strokeWidth={1}
              />
              {(Object.keys(SERIES) as Array<keyof typeof SERIES>).map((key) => (
                <circle
                  key={key}
                  cx={x(hovered.t)}
                  cy={y(hovered[key])}
                  r={4}
                  fill={SERIES[key].color}
                  stroke={SURFACE}
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
        </svg>

        {hovered && (
          <Box
            position="absolute"
            top={2}
            left={`${Math.min(85, Math.max(0, (x(hovered.t) / WIDTH) * 100))}%`}
            transform="translateX(-50%)"
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
            px={3}
            py={2}
            fontSize="xs"
            pointerEvents="none"
            minW="140px"
          >
            <Text color={TEXT_SECONDARY} mb={1}>
              {dateFmt.format(hovered.t)}
            </Text>
            {(Object.keys(SERIES) as Array<keyof typeof SERIES>).map((key) => (
              <HStack key={key} justify="space-between" gap={4}>
                <HStack gap={1.5}>
                  <Box w="10px" h="2px" bg={SERIES[key].color} />
                  <Text color={TEXT_SECONDARY}>{SERIES[key].label}</Text>
                </HStack>
                <Text fontWeight="bold" color={TEXT_PRIMARY}>
                  {money.format(hovered[key])}
                </Text>
              </HStack>
            ))}
          </Box>
        )}
      </Box>

    </Box>
  );
}
