'use client';

import { getOrders } from '@/actions/admin';
import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
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

export default function Orders() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>();

  useEffect(() => {
    getOrders().then((orders) => setOrders(orders));
  }, []);

  function sortOrders(key: SortKey) {
    setSortKey(key);
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
        setOrders(
          orders.slice().sort((o1, o2) => -o1[key]!.localeCompare(o2[key]!))
        );
      } else {
        setSortDirection('asc');
        setOrders(
          orders.slice().sort((o1, o2) => o1[key]!.localeCompare(o2[key]!))
        );
      }
    } else {
      setSortDirection('asc');
      setOrders(
        orders.slice().sort((o1, o2) => o1[key]!.localeCompare(o2[key]!))
      );
    }
  }

  function TableHeader({ name, id }: { name: string; id: SortKey }) {
    console.log(id);
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

  function OrderRow(order: Order) {
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

  return (
    <Container maxWidth={1300}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Orders
        </Heading>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <TableHeader name="Email" id="email" />
              <TableHeader name="Product ID" id="product_id" />
              <TableHeader name="Payment Status" id="payment_status" />
              <TableHeader name="Fulfillment Option" id="fulfillment_option" />
              <TableHeader name="Fulfillment Status" id="fulfillment_status" />
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
    </Container>
  );
}
