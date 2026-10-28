'use client';

import {
  Box,
  Center,
  Heading,
  Select,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import type { FinancesDashboard } from '@/lib/finances';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 0,
});

function formatMoney(value: number): string {
  return currency.format(value);
}

function profitColor(value: number): string {
  if (value > 0) return 'green.600';
  if (value < 0) return 'red.600';
  return undefined as unknown as string;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" size="md" mt={10} mb={4}>
      {children}
    </Heading>
  );
}

export default function FinancesView() {
  const [dashboard, setDashboard] = useState<FinancesDashboard>();
  const [selectedDrop, setSelectedDrop] = useState<string>('');

  useEffect(() => {
    fetch('/api/finances/dashboard')
      .then((res) => res.json())
      .then((data: FinancesDashboard) => {
        setDashboard(data);
        if (data.drops.length > 0) {
          setSelectedDrop(data.drops[0].drop);
        }
      });
  }, []);

  const selected = useMemo(
    () => dashboard?.drops.find((d) => d.drop === selectedDrop),
    [dashboard, selectedDrop]
  );

  if (!dashboard) {
    return (
      <Center p={10}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
        <Stat>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>{formatMoney(dashboard.totals.totalRevenue)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Costs</StatLabel>
          <StatNumber>{formatMoney(dashboard.totals.totalCosts)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Profit</StatLabel>
          <StatNumber color={profitColor(dashboard.totals.profit)}>
            {formatMoney(dashboard.totals.profit)}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Donated</StatLabel>
          <StatNumber>{formatMoney(dashboard.totals.totalDonated)}</StatNumber>
        </Stat>
      </SimpleGrid>

      <SectionHeading>Where the money is</SectionHeading>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
        {dashboard.moneyLocations.map((loc) => (
          <Stat key={loc.label}>
            <StatLabel>{loc.label}</StatLabel>
            <StatNumber>{formatMoney(loc.amount)}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

      <SectionHeading>Look up a drop</SectionHeading>
      <Select
        maxW="300px"
        mb={6}
        value={selectedDrop}
        onChange={(e) => setSelectedDrop(e.target.value)}
      >
        {dashboard.drops.map((d) => (
          <option key={d.drop} value={d.drop}>
            {d.drop}
          </option>
        ))}
      </Select>
      {selected && (
        <>
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={6} mb={6}>
            <Stat>
              <StatLabel>Revenue</StatLabel>
              <StatNumber fontSize="xl">{formatMoney(selected.revenue)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Costs</StatLabel>
              <StatNumber fontSize="xl">{formatMoney(selected.costs)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Profit</StatLabel>
              <StatNumber fontSize="xl" color={profitColor(selected.profit)}>
                {formatMoney(selected.profit)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Margin</StatLabel>
              <StatNumber fontSize="xl">
                {selected.margin === null ? '—' : percent.format(selected.margin)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Sold</StatLabel>
              <StatNumber fontSize="xl">{selected.sold}</StatNumber>
            </Stat>
          </SimpleGrid>
          <TableContainer maxW="400px">
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th>Size</Th>
                  <Th isNumeric>Sold</Th>
                  <Th isNumeric>Share</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selected.sizeBreakdown.map((s) => (
                  <Tr key={s.size}>
                    <Td>{s.size}</Td>
                    <Td isNumeric>{s.sold || '—'}</Td>
                    <Td isNumeric>
                      {s.share === null ? '—' : percent.format(s.share)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}

      <SectionHeading>By semester</SectionHeading>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Semester</Th>
              <Th isNumeric>Revenue</Th>
              <Th isNumeric>Costs</Th>
              <Th isNumeric>Profit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dashboard.bySemester.map((s) => (
              <Tr key={s.semester}>
                <Td>{s.semester}</Td>
                <Td isNumeric>{formatMoney(s.revenue)}</Td>
                <Td isNumeric>{formatMoney(s.costs)}</Td>
                <Td isNumeric color={profitColor(s.profit)}>
                  {formatMoney(s.profit)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <SectionHeading>All drops, newest first</SectionHeading>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Drop</Th>
              <Th>Semester</Th>
              <Th isNumeric>Sold</Th>
              <Th isNumeric>Revenue</Th>
              <Th isNumeric>Costs</Th>
              <Th isNumeric>Profit</Th>
              <Th isNumeric>Margin</Th>
              <Th>Sold Out</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dashboard.drops.map((d) => (
              <Tr key={d.drop}>
                <Td fontWeight="bold">{d.drop}</Td>
                <Td>{d.semester}</Td>
                <Td isNumeric>{d.sold}</Td>
                <Td isNumeric>{formatMoney(d.revenue)}</Td>
                <Td isNumeric>{formatMoney(d.costs)}</Td>
                <Td isNumeric color={profitColor(d.profit)}>
                  {formatMoney(d.profit)}
                </Td>
                <Td isNumeric>
                  {d.margin === null ? '—' : percent.format(d.margin)}
                </Td>
                <Td>{d.soldOut ? '100%' : '—'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
