'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  VStack,
  Collapse,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';

interface LinkInfo {
  title: string;
  href: string;
}

const Links: LinkInfo[] = [
  { title: 'TEAM', href: '/team' },
  { title: 'DESIGNS', href: '/designs' },
  { title: 'SHOP', href: '/shop' },
];

const NavLink = (link: LinkInfo) => (
  <Link
    as={NextLink}
    href={link.href}
    px={3}
    py={2}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: 'gray.100',
      transitionDuration: '0.2s',
    }}
  >
    <Text>{link.title}</Text>
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={12} py={10}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
            <HStack spacing={3}>
              <Image src="/images/logo.png" width={25} height={25} alt="logo" />
              <Text fontWeight={500}>SPERO</Text>
            </HStack>
          </Link>

          {/* Nav items on desktop */}
          <HStack
            spacing={8}
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <HStack as="nav" spacing={7}>
              {Links.map((link) => (
                <NavLink key={link.title} title={link.title} href={link.href} />
              ))}
            </HStack>
          </HStack>

          {/* Hamburger icon on mobile */}
          <IconButton
            size="md"
            icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg="none"
            p={2}
            _hover={{ bg: 'gray.100', transitionDuration: '0.2s' }}
          />
        </Flex>

        {/* Nav items on mobile */}
        <Collapse in={isOpen}>
          <Box mt={3} display={{ md: 'none' }}>
            <VStack as="nav" align="flex-end">
              {Links.map((link) => (
                <NavLink key={link.title} title={link.title} href={link.href} />
              ))}
            </VStack>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
