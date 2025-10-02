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
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { checkoutWithStripe } from '@/actions/checkout';

/**
 * Props for reusable product component
 */
interface ProductProps {

  /** Name of the product */
  name: string;

  /** Detailed description of the product */
  description: string;

  /** Price of the product in dollars */
  price: number;

  /** Array of image URLs for the product */
  images: string[];

  /**
   * Available sizes for the product.
   * The key represents the size label (e.g., "S", "M", "L")
   * and the value represents a human-readable size description (e.g., "Small", "Medium", "Large").
   */
  sizes: Map<string, string>;

  /** Product name in stripe ex. 'justified' */
  stripeId: string;

  /** Whether the product is currently sold out */
  isSoldOut: boolean;
}

export default function Product({name,description, price, images, sizes, isSoldOut, stripeId}: ProductProps){
  // const success = useSearchParams().get('success');
  const router = useRouter();

  const [size, setSize] = useState('undefined');
  const [pickupOrShip, setPickupOrShip] = useState('undefined');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const pageSizes = {
    base: 310,
    sm: 440,
    md: 600,
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSuccess(params.get('success') === 'true');
  }, []);

  async function handleSubmit(event: FormEvent) {
    // Prevent default or multiple submissions
    event.preventDefault();
    if (submitted) {
      return;
    }
    setSubmitted(true);
    setErrorMessage('');

    const { checkoutUrl, status } = await checkoutWithStripe(
      `${stripeId}-${size}`,
      pickupOrShip
    );
    if (status === 'out of stock') {
      setErrorMessage('Out of stock');
    } else if (status !== 'success' || !checkoutUrl) {
      setErrorMessage('Internal server error');
    } else {
      router.push(checkoutUrl);
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
            You&apos;ll receive a confirmation email shortly. Feel free to
            contact us at{' '}
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
              Order the {name}
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
              <ImageCarousel width={pageSizes} srcs={images} />
            </WrapItem>
            <WrapItem maxWidth={600}>
              <VStack align="left" gap={10}>
                <Box textAlign="left">
                  {description}
                </Box>
                <Box textAlign="left">
                  Price: ${price}
                </Box>
                <Box>
                  <form onSubmit={handleSubmit}>
                    <VStack gap={3}>
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">Size</FormLabel>
                        <Select
                          onChange={(e) => setSize(e.target.value)}
                          placeholder={isSoldOut ? 'Sold Out!' : 'Select a Size!'}>
                          isDisabled={isSoldOut}
                          {Array.from(sizes).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </VStack>
                    <HStack pt={4} gap={5}>
                      <Button type="submit" isDisabled={isSoldOut}>Checkout</Button>
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
