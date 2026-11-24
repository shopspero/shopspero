'use client';

import {
  Box,
  Center,
  Flex,
  Select,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { getDropRecords } from '@/actions/admin';
import type { DropRecord } from '@/lib/dropRecords';
import { DROP_TOTAL_UNITS } from '@/lib/dropInventory';
import MoneyOverTimeChart from './MoneyOverTimeChart';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 0,
});

function formatMoney(value: number): string {
  return currency.format(value);
}

function profitColor(value: number): string | undefined {
  if (value > 0) return 'green.600';
  if (value < 0) return 'red.600';
  return undefined;
}

// Dashboards tab: one drop filter scoping both the aggregate stat tiles and
// the money-over-time chart below it, so the numbers always agree. Reads
// from the same MongoDB-backed records as the Finance tab
// (src/app/(internal)/admin/finance).
export default function DashboardView() {
  const [records, setRecords] = useState<DropRecord[]>();
  const [selectedDrop, setSelectedDrop] = useState('');

  useEffect(() => {
    getDropRecords().then(setRecords);
  }, []);

  const drops = useMemo(
    () => Array.from(new Set((records ?? []).map((r) => r.drop))).sort(),
    [records]
  );

  const filtered = useMemo(
    () => (records ?? []).filter((r) => !selectedDrop || r.drop === selectedDrop),
    [records, selectedDrop]
  );

  const totals = useMemo(
    () =>
      filtered.reduce(
        (acc, r) => ({
          revenue: acc.revenue + (r.revenue ?? 0),
          cost: acc.cost + (r.cost ?? 0),
        }),
        { revenue: 0, cost: 0 }
      ),
    [filtered]
  );
  const profit = totals.revenue - totals.cost;

  // Sell-through rate = units sold / units produced. Only computable for
  // drops with a known production total (see dropInventory.ts) — "All
  // drops" aggregates sold/total across just those drops, not every drop,
  // so it isn't silently wrong for the ones with no known total.
  const sellThrough = useMemo(() => {
    const all = records ?? [];
    const dropsToConsider = selectedDrop ? [selectedDrop] : Object.keys(DROP_TOTAL_UNITS);
    let sold = 0;
    let total = 0;
    for (const drop of dropsToConsider) {
      const unitTotal = DROP_TOTAL_UNITS[drop];
      if (!unitTotal) continue;
      sold += all.filter((r) => r.drop === drop).length;
      total += unitTotal;
    }
    return total > 0 ? sold / total : undefined;
  }, [records, selectedDrop]);

  if (!records) {
    return (
      <Center p={10}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <Select
        maxW="300px"
        mb={8}
        placeholder="All drops"
        value={selectedDrop}
        onChange={(e) => setSelectedDrop(e.target.value)}
      >
        {drops.map((drop) => (
          <option key={drop} value={drop}>
            {drop}
          </option>
        ))}
      </Select>

      <Flex gap={{ base: 3, md: 8 }} mb={10} wrap="nowrap">
        <Stat flex="1" minW={0}>
          <StatLabel>Orders</StatLabel>
          <StatNumber whiteSpace="nowrap">{filtered.length}</StatNumber>
        </Stat>
        <Stat flex="1" minW={0}>
          <StatLabel>Revenue</StatLabel>
          <StatNumber whiteSpace="nowrap">{formatMoney(totals.revenue)}</StatNumber>
        </Stat>
        <Stat flex="1" minW={0}>
          <StatLabel>Cost</StatLabel>
          <StatNumber whiteSpace="nowrap">{formatMoney(totals.cost)}</StatNumber>
        </Stat>
        <Stat flex="1" minW={0}>
          <StatLabel>Profit</StatLabel>
          <StatNumber whiteSpace="nowrap" color={profitColor(profit)}>
            {formatMoney(profit)}
          </StatNumber>
        </Stat>
        <Tooltip
          label={
            sellThrough === undefined
              ? 'Not tracked for this selection — no known production total.'
              : undefined
          }
          isDisabled={sellThrough !== undefined}
        >
          <Stat flex="1" minW={0}>
            <StatLabel whiteSpace="nowrap">Sell-Through</StatLabel>
            <StatNumber whiteSpace="nowrap">
              {sellThrough === undefined ? '—' : percent.format(sellThrough)}
            </StatNumber>
          </Stat>
        </Tooltip>
      </Flex>

      <Box fontSize="sm" fontWeight="semibold" color="gray.600" mb={3}>
        Money over time (cumulative)
      </Box>
      <MoneyOverTimeChart records={filtered} />
    </Box>
  );
}
