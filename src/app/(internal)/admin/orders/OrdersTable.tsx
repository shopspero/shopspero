'use client';

import { getOrders, deleteOrder } from '@/actions/admin';
import {
  Box,
  HStack,
  IconButton,
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
import { Order } from '@/lib/order';
import { useEffect, useState } from 'react';
import { InfoOutlineIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type SortKey =
  | 'email'
  | 'product_id'
  | 'payment_status'
  | 'fulfillment_option'
  | 'fulfillment_status';

function OrderActions({
  order,
  onDelete,
}: {
  order: Order;
  onDelete: () => Promise<Boolean>;
}) {
  const router = useRouter();
  return (
    <>
      <IconButton
        aria-label="Inspect order"
        icon={<InfoOutlineIcon />}
        onClick={() => router.push(`/admin/orders/${order.id}`)}
      />
      <IconButton
        aria-label="Delete order"
        icon={<DeleteIcon />}
        ml={3}
        onClick={onDelete}
      />
    </>
  );
}

function OrderRow({
  order,
  onDelete,
}: {
  order: Order;
  onDelete: () => Promise<Boolean>;
}) {
  return (
    <Tr>
      <Td>{order.email}</Td>
      <Td>{order.product_id}</Td>
      <Td>{order.payment_status}</Td>
      <Td>{order.fulfillment_option}</Td>
      <Td>{order.fulfillment_status}</Td>
      <Td textAlign="right">
        <OrderActions order={order} onDelete={onDelete} />
      </Td>
    </Tr>
  );
}

/* Mobile (<640px) card — one labeled stack per order. */
function OrderCard({
  order,
  onDelete,
}: {
  order: Order;
  onDelete: () => Promise<Boolean>;
}) {
  const fields: [string, string | undefined][] = [
    ['Email', order.email],
    ['Product ID', order.product_id],
    ['Payment Status', order.payment_status],
    ['Fulfillment Option', order.fulfillment_option],
    ['Fulfillment Status', order.fulfillment_status],
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
        <HStack justify="flex-end" pt={2}>
          <OrderActions order={order} onDelete={onDelete} />
        </HStack>
      </Stack>
    </Box>
  );
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>();

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  function sortOrders(key: SortKey) {
    setSortKey(key);
    function compareKey(o1: Order, o2: Order) {
      const k1 = o1[key];
      const k2 = o2[key];
      if (!k1 && !k2) {
        return 0;
      } else if (!k1) {
        return 1;
      } else if (!k2) {
        return -1;
      }
      return k1.localeCompare(k2);
    }
    if (sortKey === key && sortDirection === 'asc') {
      setSortDirection('desc');
      setOrders(orders.slice().sort((o1, o2) => -compareKey(o1, o2)));
    } else {
      setSortDirection('asc');
      setOrders(orders.slice().sort(compareKey));
    }
  }

  function deleteHandler(order: Order) {
    return async () => {
      if (!order.id) {
        return false;
      }
      const success = await deleteOrder(order.id);
      if (success) {
        getOrders().then(setOrders);
      }
      return success;
    };
  }

  function SortedHeader({ name, id }: { name: string; id: SortKey }) {
    let sortIcon = <FaSort />;
    if (id === sortKey) {
      if (sortDirection === 'asc') {
        sortIcon = <FaSortUp />;
      } else {
        sortIcon = <FaSortDown />;
      }
    }
    return (
      <Th cursor="pointer" userSelect="none" onClick={() => sortOrders(id)}>
        <HStack>
          <Box>{name}</Box>
          {sortIcon}
        </HStack>
      </Th>
    );
  }

  return (
    <>
      {/* Tablet and up: full sortable table */}
      <TableContainer display={{ base: 'none', sm: 'block' }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <SortedHeader name="Email" id="email" />
              <SortedHeader name="Product ID" id="product_id" />
              <SortedHeader name="Payment Status" id="payment_status" />
              <SortedHeader name="Fulfillment Option" id="fulfillment_option" />
              <SortedHeader name="Fulfillment Status" id="fulfillment_status" />
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                onDelete={deleteHandler(order)}
                order={order}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Mobile: stacked cards */}
      <Stack display={{ base: 'flex', sm: 'none' }} gap={4}>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onDelete={deleteHandler(order)}
          />
        ))}
      </Stack>
    </>
  );
}
