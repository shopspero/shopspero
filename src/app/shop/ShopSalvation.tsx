'use client';

import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Select,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import ImageCarousel from '@/components/ImageCarousel';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

const sizes = {
  base: 310,
  sm: 440,
  md: 600,
};

const images = [
  '/images/designs/salvation-1.jpg',
  '/images/designs/salvation-2.jpg',
  '/images/designs/salvation-3.jpg',
];

export default function Shop() {
  const success = useSearchParams().get('success');
  const router = useRouter();

  const [color, setColor] = useState('undefined');
  const [size, setSize] = useState('undefined');
  const [pickupOrShip, setPickupOrShip] = useState('undefined');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    // Prevent default or multiple submissions
    event.preventDefault();
    if (submitted) {
      return;
    }
    setSubmitted(true);
    setErrorMessage('');

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
    setSubmitted(false);
  }

  return (
    <>
      {/* If success, show order confirmation page */}
      {success && (
        <Container maxWidth={900} textAlign="center">
          <Center p={10}>
            <Heading as="h1" size="2xl">
              Your order has been placed!
            </Heading>
          </Center>
          <Text mb={5}>
            You'll receive a confirmation email shortly. Feel free to contact us
            at{' '}
            <Link
              as={NextLink}
              href="mailto:shopspero@gmail.com"
              variant="underline"
              isExternal
            >
              shopspero@gmail.com
            </Link>{' '}
            with any questions.
          </Text>
        </Container>
      )}

      {/* If not success, show order page */}
      {!success && (
        <Container maxWidth={1300} textAlign="center">
          <Center p={10}>
            <Heading as="h1" size="2xl">
              Order the Salvation Crewneck
            </Heading>
          </Center>
          <Wrap
            spacing={10}
            direction="row"
            align="center"
            justify="center"
            mt={5}
            mb={5}
          >
            <WrapItem>
              <ImageCarousel width={sizes} srcs={images} />
            </WrapItem>
            <WrapItem maxWidth={600}>
              <VStack align="left" gap={10}>
                <Box textAlign="left">
                  There is much abstract Christian jargon that is not clearly
                  defined, one of them being &ldquo;salvation.&rdquo; We wanted
                  to clearly and biblically define &ldquo;salvation&rdquo;
                  because it is a fundamental component of the Gospel. Here, we
                  define it with a phrase we collectively agreed upon (being
                  delivered from God&apos;s wrath through Jesus and His life,
                  sacrificial death, and resurrection) and back it up with
                  Scripture.
                </Box>
                <Box>
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
                        <FormLabel as="legend">
                          Pickup or delivery option
                        </FormLabel>
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
                      {submitted && <Spinner size="md" />}
                      <Text color="red">{errorMessage}</Text>
                    </HStack>
                  </form>
                </Box>
              </VStack>
            </WrapItem>
          </Wrap>
        </Container>
      )}
    </>
  );
}
