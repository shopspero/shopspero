'use client';

import { upsertOrder } from '@/actions/admin';
import { Order } from '@/lib/order';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  HStack,
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
import { useState } from 'react';

function NotesEditor({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (notes: string) => Promise<boolean>;
}) {
  const [notes, setNotes] = useState(initialValue);
  const [editNotes, setEditNotes] = useState(initialValue);
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <>
        <Text mb={2}>{notes}</Text>
        <IconButton
          aria-label="Edit notes"
          icon={<EditIcon />}
          onClick={() => setEditing(true)}
        />
      </>
    );
  }

  return (
    <VStack alignItems="end">
      <Textarea
        width="100%"
        value={editNotes}
        onChange={(e) => setEditNotes(e.target.value)}
      />
      <HStack>
        <IconButton
          aria-label="Cancel edit"
          icon={<CloseIcon />}
          onClick={() => {
            setEditNotes(notes);
            setEditing(false);
          }}
        />
        <IconButton
          aria-label="Save edit"
          icon={<CheckIcon />}
          onClick={async () => {
            if (await onSave(editNotes)) {
              setNotes(editNotes);
              setEditing(false);
            }
          }}
        />
      </HStack>
    </VStack>
  );
}

export default function OrderDetails({ order }: { order: Order }) {
  const [paymentStatus, setPaymentStatus] = useState(
    order.payment_status || 'unpaid'
  );
  const [fulfillmentStatus, setFulfillmentStatus] = useState(
    order.fulfillment_status || 'unfulfilled'
  );

  return (
    <TableContainer>
      {order.fulfillment_status !== 'canceled' && (
        <Center p={5}>
          <HStack gap={5}>
            <Button
              onClick={async () => {
                const newPaymentStatus =
                  paymentStatus === 'paid' ? 'unpaid' : 'paid';
                if (
                  await upsertOrder({
                    id: order.id,
                    payment_status: newPaymentStatus,
                  })
                ) {
                  setPaymentStatus(newPaymentStatus);
                }
              }}
            >
              Mark {paymentStatus === 'paid' ? 'Unpaid' : 'Paid'}
            </Button>
            <Button
              onClick={async () => {
                const newFulfillmentStatus =
                  fulfillmentStatus === 'fulfilled'
                    ? 'unfulfilled'
                    : 'fulfilled';
                if (
                  await upsertOrder({
                    id: order.id,
                    fulfillment_status: newFulfillmentStatus,
                  })
                ) {
                  setFulfillmentStatus(newFulfillmentStatus);
                }
              }}
            >
              Mark{' '}
              {fulfillmentStatus === 'fulfilled' ? 'Unfulfilled' : 'Fulfilled'}
            </Button>
          </HStack>
        </Center>
      )}
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
          <Td>{paymentStatus}</Td>
        </Tr>
        <Tr>
          <Th>Fulfillment Option</Th>
          <Td>{order.fulfillment_option}</Td>
        </Tr>
        <Tr>
          <Th>Fulfillment Status</Th>
          <Td>{fulfillmentStatus}</Td>
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
            <NotesEditor
              initialValue={order.notes ? order.notes : ''}
              onSave={(notes) => upsertOrder({ id: order.id, notes })}
            />
          </Td>
        </Tr>
      </Table>
    </TableContainer>
  );
}
