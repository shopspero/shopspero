'use client';

import { cancelOrder, uncancelOrder, upsertOrder } from '@/actions/admin';
import { Order } from '@/lib/order';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Td,
  Text,
  Textarea,
  Th,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OrderPage({ order }: { order: Order }) {
  const router = useRouter();

  const [notes, setNotes] = useState(order.notes);
  const [editingNotes, setEditingNotes] = useState(false);

  async function updateOrder(order: Order) {
    await upsertOrder(order);
    router.refresh();
  }

  return (
    <Container maxWidth={1000} textAlign="center">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Inspect Order
        </Heading>
      </Center>
      <Center p={5}>
        <HStack gap={5}>
          {order.fulfillment_status === 'canceled' ? (
            <Button
              onClick={() => {
                uncancelOrder(order.id!);
                router.refresh();
              }}
            >
              Mark Uncanceled
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  if (order.payment_status === 'paid') {
                    updateOrder({ id: order.id, payment_status: 'unpaid' });
                  } else {
                    updateOrder({ id: order.id, payment_status: 'paid' });
                  }
                }}
              >
                Mark {order.payment_status === 'paid' ? 'Unpaid' : 'Paid'}
              </Button>
              <Button
                onClick={() => {
                  if (order.fulfillment_status === 'fulfilled') {
                    updateOrder({
                      id: order.id,
                      fulfillment_status: 'unfulfilled',
                    });
                  } else {
                    updateOrder({
                      id: order.id,
                      fulfillment_status: 'fulfilled',
                    });
                  }
                }}
              >
                Mark{' '}
                {order.fulfillment_status === 'fulfilled'
                  ? 'Unfulfilled'
                  : 'Fulfilled'}
              </Button>
              <Button
                onClick={() => {
                  cancelOrder(order.id!);
                  router.refresh();
                }}
              >
                Cancel Order
              </Button>
            </>
          )}
        </HStack>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Tr>
            <Th>Name</Th>
            <Td>{order.name}</Td>
          </Tr>
          <Tr>
            <Th>Email</Th>
            <Td>{order.email}</Td>
          </Tr>
          <Tr>
            <Th>Phone</Th>
            <Td>{order.phone}</Td>
          </Tr>
          <Tr>
            <Th>Product ID</Th>
            <Td>{order.product_id}</Td>
          </Tr>
          <Tr>
            <Th>Payment Status</Th>
            <Td>{order.payment_status}</Td>
          </Tr>
          <Tr>
            <Th>Fulfillment Option</Th>
            <Td>{order.fulfillment_option}</Td>
          </Tr>
          <Tr>
            <Th>Fulfillment Status</Th>
            <Td>{order.fulfillment_status}</Td>
          </Tr>
          <Tr>
            <Th>Address</Th>
            <Td>
              <Text>{order.address?.line1}</Text>
              <Text>{order.address?.line2}</Text>
              <Text>
                {order.address?.city &&
                  order.address?.state &&
                  order.address?.postal_code &&
                  order.address?.city +
                    ', ' +
                    order.address?.state +
                    ' ' +
                    order.address?.postal_code}
              </Text>
              <Text>{order.address?.country}</Text>
            </Td>
          </Tr>
          <Tr>
            <Th>Created</Th>
            <Td>
              {new Date(order.created! * 1000).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Td>
          </Tr>
          <Tr>
            <Th>Stripe Checkout ID</Th>
            <Td>{order.checkout_id}</Td>
          </Tr>
          <Tr>
            <Th>Notes</Th>
            <Td>
              {editingNotes ? (
                <VStack alignItems="end">
                  <Textarea
                    width="100%"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <HStack>
                    <IconButton
                      aria-label="Cancel edit"
                      icon={<CloseIcon />}
                      onClick={() => {
                        setNotes(order.notes);
                        setEditingNotes(false);
                      }}
                    />
                    <IconButton
                      aria-label="Save edit"
                      icon={<CheckIcon />}
                      onClick={() => {
                        updateOrder({ id: order.id, notes });
                        setEditingNotes(false);
                      }}
                    />
                  </HStack>
                </VStack>
              ) : (
                <>
                  {order.notes && <Text mb={2}>{order.notes}</Text>}
                  <IconButton
                    aria-label="Edit notes"
                    icon={<EditIcon />}
                    onClick={() => setEditingNotes(true)}
                  />
                </>
              )}
            </Td>
          </Tr>
        </Table>
      </TableContainer>
    </Container>
  );
}
