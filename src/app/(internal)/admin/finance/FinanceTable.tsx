'use client';

import {
  Box,
  Center,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { getDropRecords } from '@/actions/admin';
import type { DropRecord } from '@/lib/dropRecords';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function formatMoney(value: number | undefined): string {
  return value === undefined ? '—' : currency.format(value);
}

function YesNo({ value }: { value: boolean | undefined }) {
  if (value === undefined) return <>—</>;
  return <>{value ? 'Yes' : 'No'}</>;
}

// Newest first; records with no date (e.g. Heirs/Born Again/Forever. have no
// Date column in the sheet) sort to the bottom regardless of direction.
function byDateDesc(a: DropRecord, b: DropRecord): number {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
}

// Everything from every drop in the Fall 2026 Financials sheet, one row per
// order — same shape as the "Heirs" tab (revenue, cost, who, fulfilled?,
// paid to, size, in bank, notes), filterable by drop. Reads from MongoDB via
// getDropRecords(). See src/app/(internal)/admin/page.tsx (Dashboards) for
// the aggregate totals.
export default function FinanceTable() {
  const [records, setRecords] = useState<DropRecord[]>();
  const [selectedDrop, setSelectedDrop] = useState('');

  useEffect(() => {
    getDropRecords().then(setRecords);
  }, []);

  const drops = useMemo(
    () => Array.from(new Set((records ?? []).map((r) => r.drop))).sort(),
    [records]
  );

  const sorted = useMemo(
    () =>
      (records ?? [])
        .filter((r) => !selectedDrop || r.drop === selectedDrop)
        .sort(byDateDesc),
    [records, selectedDrop]
  );

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
        mb={6}
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

      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Drop</Th>
              <Th>Date</Th>
              <Th>Item</Th>
              <Th>Size</Th>
              <Th isNumeric>Revenue</Th>
              <Th isNumeric>Shipping</Th>
              <Th isNumeric>Cost</Th>
              <Th>Who</Th>
              <Th>Fulfilled?</Th>
              <Th>Paid To</Th>
              <Th>Fulfilled By</Th>
              <Th>In Bank</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sorted.map((r) => (
              <Tr key={r.id}>
                <Td fontWeight="bold">{r.drop}</Td>
                <Td>{r.date ?? '—'}</Td>
                <Td>{r.item ?? '—'}</Td>
                <Td>{r.size ?? '—'}</Td>
                <Td isNumeric>{formatMoney(r.revenue)}</Td>
                <Td isNumeric>{formatMoney(r.shipping)}</Td>
                <Td isNumeric>{formatMoney(r.cost)}</Td>
                <Td>{r.who ?? '—'}</Td>
                <Td>
                  <YesNo value={r.fulfilled} />
                </Td>
                <Td>{r.paidTo ?? '—'}</Td>
                <Td>{r.fulfilledBy ?? '—'}</Td>
                <Td>
                  <YesNo value={r.inBank} />
                </Td>
                <Td>{r.notes ?? '—'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
