'use client';

import { getProducts, manuallyLogOrder } from '@/actions/admin';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Order } from '@/lib/order';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogForm() {
  const router = useRouter();

  const [productIds, setProductIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getProducts()
      .then((products) => products.map((product) => product.id))
      .then(setProductIds);
  }, []);

  const [productId, setProductId] = useState<string>();
  const [fulfillmentOption, setFulfillmentOption] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [line1, setLine1] = useState<string>();
  const [line2, setLine2] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();

  async function handleSubmit(event: FormEvent) {
    // Prevent default or multiple submissions
    event.preventDefault();
    if (submitted) {
      return;
    }

    // Validate data
    if (
      !productId ||
      !email ||
      (fulfillmentOption != 'pickup' && fulfillmentOption != 'delivery')
    ) {
      setErrorMessage('Invalid product ID, fulfillment option, or email');
      return;
    }

    setSubmitted(true);
    setErrorMessage('');

    // Set order
    let order: Order = {
      product_id: productId,
      fulfillment_option: fulfillmentOption,
      email,
    };
    if (name) {
      order.name = name;
    }
    if (phone) {
      order.phone = phone;
    }
    if (line1 || line2 || city || state || country || postalCode) {
      order.address = {};
      if (line1) {
        order.address.line1 = line1;
      }
      if (line2) {
        order.address.line2 = line2;
      }
      if (city) {
        order.address.city = city;
      }
      if (state) {
        order.address.state = state;
      }
      if (country) {
        order.address.country = country;
      }
      if (postalCode) {
        order.address.postal_code = postalCode;
      }
    }

    const { orderId, status } = await manuallyLogOrder(order);
    if (status === 'out of stock') {
      setErrorMessage('Out of stock');
    } else if (status !== 'success') {
      setErrorMessage('Internal server error');
    } else {
      router.push(`/admin/orders/${orderId}`);
    }
    setSubmitted(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="left" gap={3}>
        <FormControl as="fieldset" isRequired={true}>
          <FormLabel as="legend">Product ID</FormLabel>
          <Select
            placeholder="Select"
            onChange={(e) => setProductId(e.target.value)}
          >
            {productIds.map((productId) => (
              <option value={productId}>{productId}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl as="fieldset" isRequired={true}>
          <FormLabel as="legend">Fulfillment option</FormLabel>
          <Select
            placeholder="Select"
            onChange={(e) => setFulfillmentOption(e.target.value!)}
          >
            <option value="pickup">pickup</option>
            <option value="delivery">delivery</option>
          </Select>
        </FormControl>
        <FormControl as="fieldset" isRequired={true}>
          <FormLabel as="legend">Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Phone</FormLabel>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Address Line 1</FormLabel>
          <Input value={line1} onChange={(e) => setLine1(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Address Line 2</FormLabel>
          <Input value={line2} onChange={(e) => setLine2(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Address City</FormLabel>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Address State</FormLabel>
          <Input value={state} onChange={(e) => setState(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Address Country</FormLabel>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Address Postal Code</FormLabel>
          <Input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormControl>
        <HStack pt={4} gap={5}>
          <Button type="submit">Submit</Button>
          {submitted && <Spinner size="md" />}
          <Text color="red">{errorMessage}</Text>
        </HStack>
      </VStack>
    </form>
  );
}
