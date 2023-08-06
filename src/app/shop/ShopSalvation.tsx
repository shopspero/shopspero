'use client';

import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Shop() {
  const router = useRouter();

  const [color, setColor] = useState('undefined');
  const [size, setSize] = useState('undefined');
  const [pickupOrShip, setPickupOrShip] = useState('undefined');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch('/api/checkout', {
        method: 'post',
        body: JSON.stringify({
          productId: `salvation-${color}-${size}`,
          includeShipping: pickupOrShip === 'ship',
        }),
        headers: { 'content-type': 'application/json' },
      });
      const responseBody = await response.json();
      if (responseBody['checkoutUrl'] !== undefined) {
        router.push(responseBody['checkoutUrl']);
      } else if (responseBody['error'] !== undefined) {
        setErrorMessage(responseBody['error']);
      } else {
        throw Error('Checkout request failed');
      }
    } catch (e) {
      setErrorMessage('Checkout request failed');
    }
  }

  return (
    <Container maxWidth={900} textAlign="center">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Order the Salvation Crewneck
        </Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <VStack gap={3}>
          <FormControl as="fieldset" isRequired={true}>
            <FormLabel as="legend">Color</FormLabel>
            <Select
              onChange={(e) => setColor(e.target.value)}
              placeholder="Select color"
            >
              <option value="oatmeal">Oatmeal Heather</option>
              <option value="navy">Navy</option>
            </Select>
          </FormControl>
          <FormControl as="fieldset" isRequired={true}>
            <FormLabel as="legend">Size</FormLabel>
            <Select
              onChange={(e) => setSize(e.target.value)}
              placeholder="Select size"
            >
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </Select>
          </FormControl>
          <FormControl as="fieldset" isRequired={true}>
            <FormLabel as="legend">Pickup or delivery option</FormLabel>
            <Select
              onChange={(e) => setPickupOrShip(e.target.value)}
              placeholder="Select option"
            >
              <option value="pickup">
                Pickup on Sproul for no additional cost
              </option>
              <option value="ship">
                Ship the product to me for an additional $8
              </option>
            </Select>
          </FormControl>
        </VStack>
        <HStack pt={4} gap={5}>
          <Button type="submit">Checkout</Button>
          <Text color="red">{errorMessage}</Text>
        </HStack>
      </form>
    </Container>
  );
}
