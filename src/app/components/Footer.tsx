'use client';

import { Tenor_Sans } from 'next/font/google';

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] });

import {
  Box,
  Flex,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Button,
  Link,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaMedium } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface SocialInfo {
  label: string;
  icon: IconType;
  href: string;
}

const socials: SocialInfo[] = [
  {
    label: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/shopspero/',
  },
  {
    label: 'Facebook',
    icon: FaFacebook,
    href: 'https://www.facebook.com/shopspero/',
  },
  {
    label: 'Medium',
    icon: FaMedium,
    href: 'https://shopspero.medium.com/',
  },
];

const SocialButton = (social: SocialInfo) => (
  <Link as={'a'} href={social.href} isExternal>
    <Button
      size={'lg'}
      p={0}
      rounded={'full'}
      bg={'none'}
      _hover={{ bg: 'gray.100', transitionDuration: '0.2s' }}
    >
      <VisuallyHidden>{social.label}</VisuallyHidden>
      <social.icon />
    </Button>
  </Link>
);

export default function Footer() {
  return (
    <Box as={'footer'} fontSize={'xs'}>
      <Wrap justify={'center'} align={'flex-end'} pl={10} pr={10} pt={5}>
        <WrapItem ml={0} mr={'auto'}>
          <Container
            maxWidth={500}
            lineHeight={1.2}
            letterSpacing={1.2}
            className={tenorSans.className}
          >
            "Are not two sparrows sold for a penny? Yet not one of them will
            fall to the ground outside your Father's care. And even the very
            hairs of your head are all numbered. So don't be afraid; you are
            worth more than many sparrows."
            <br />
            &mdash;Matthew 10:29-31
          </Container>
        </WrapItem>
        <WrapItem gap={1}>
          {socials.map((social) => (
            <SocialButton
              key={social.label}
              label={social.label}
              icon={social.icon}
              href={social.href}
            />
          ))}
        </WrapItem>
      </Wrap>
      <Center p={2} fontWeight={300}>
        &#169; {new Date().getFullYear()} Spero
      </Center>
    </Box>
  );
}
