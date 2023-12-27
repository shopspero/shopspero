'use client';

import { getOrders } from '@/actions/admin';
import {
  Box,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Order } from '@/lib/order';
import { useEffect, useState } from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type SortKey =
  | 'email'
  | 'product_id'
  | 'payment_status'
  | 'fulfillment_option'
  | 'fulfillment_status';

function OrderRow(order: Order) {
  const router = useRouter();
  return (
    <Tr>
      <Td>{order.email}</Td>
      <Td>{order.product_id}</Td>
      <Td>{order.payment_status}</Td>
      <Td>{order.fulfillment_option}</Td>
      <Td>{order.fulfillment_status}</Td>
      <Td textAlign="right">
        <IconButton
          aria-label="Inspect order"
          icon={<InfoOutlineIcon />}
          onClick={() => router.push(`/admin/orders/${order.id}`)}
        />
      </Td>
    </Tr>
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
    <TableContainer>
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
            <OrderRow key={order.id} {...order} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
