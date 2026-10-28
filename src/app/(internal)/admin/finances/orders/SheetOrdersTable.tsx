'use client';

import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { PaginatedOrders } from '@/lib/finances';
import type { SheetOrder } from '@/lib/sheets';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/* Mobile (<640px) card — one labeled stack per order. */
function OrderCard({ order }: { order: SheetOrder }) {
  const fields: [string, string | undefined][] = [
    ['Date', order.date],
    ['Buyer', order.buyer],
    ['Drop', order.drop],
    ['Item', order.item],
    ['Size', order.size],
    ['Qty', order.qty?.toString()],
    ['Amount', order.amount !== undefined ? currency.format(order.amount) : undefined],
    ['Money With', order.moneyWith],
    ['Delivered', order.delivered],
    ['Notes', order.notes],
  ];
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Stack gap={2}>
        {fields.map(([label, value]) => (
          <Box key={label}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase">
              {label}
            </Text>
            <Text wordBreak="break-word">{value || '—'}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function SheetOrdersTable() {
  const [data, setData] = useState<PaginatedOrders>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/finances/orders?page=${page}`)
      .then((res) => res.json())
      .then((result: PaginatedOrders) => {
        setData(result);
        setLoading(false);
      });
  }, [page]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <>
      {loading && !data ? (
        <Center p={10}>
          <Spinner />
        </Center>
      ) : (
        <>
          {/* Tablet and up: full table */}
          <TableContainer display={{ base: 'none', sm: 'block' }}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Buyer</Th>
                  <Th>Drop</Th>
                  <Th>Item</Th>
                  <Th>Size</Th>
                  <Th isNumeric>Qty</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Money With</Th>
                  <Th>Delivered</Th>
                  <Th>Notes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.orders.map((order, i) => (
                  <Tr key={`${order.date}-${order.buyer}-${i}`}>
                    <Td>{order.date}</Td>
                    <Td>{order.buyer}</Td>
                    <Td>{order.drop}</Td>
                    <Td>{order.item}</Td>
                    <Td>{order.size}</Td>
                    <Td isNumeric>{order.qty}</Td>
                    <Td isNumeric>
                      {order.amount !== undefined
                        ? currency.format(order.amount)
                        : '—'}
                    </Td>
                    <Td>{order.moneyWith}</Td>
                    <Td>{order.delivered}</Td>
                    <Td>{order.notes}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Mobile: stacked cards */}
          <Stack display={{ base: 'flex', sm: 'none' }} gap={4}>
            {data?.orders.map((order, i) => (
              <OrderCard key={`${order.date}-${order.buyer}-${i}`} order={order} />
            ))}
          </Stack>

          <HStack justify="center" mt={6} gap={4}>
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              isDisabled={page <= 1}
            >
              Previous
            </Button>
            <Text>
              Page {page} of {totalPages}
            </Text>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              isDisabled={page >= totalPages}
            >
              Next
            </Button>
          </HStack>
        </>
      )}
    </>
  );
}
