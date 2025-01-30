'use client';

import { Box, Flex, HStack, Link, Text, useColorModeValue, IconButton, Collapse, VStack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAtTop, setIsAtTop] = useState(true); // Track if the user is at the top
  const pathname = usePathname(); // Get the current route

  // Detect if the user is at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0); // True if at the top
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only make the text white when at the top of the home page
  const isHomePage = pathname === '/'; // Check if we're on the home page
  const bg = useColorModeValue(isAtTop && isHomePage ? 'transparent' : 'white', 'gray.900'); // Transparent at the top of the home page
  const color = isAtTop && isHomePage ? 'white' : 'black'; // White text at the top of the home page, black elsewhere
  const boxShadow = isAtTop && isHomePage ? 'none' : 'sm'; // Shadow when scrolling or not on home page

  const linkStyle = {
    px: 3,
    py: 2,
    fontSize: 'sm',
    fontWeight: 'medium',
    _hover: { textDecoration: 'none', color: isAtTop && isHomePage ? 'gray.300' : 'gray.500' },
  };

  return (
    <>
      {/* Navbar */}
      <Box
        position="fixed"
        top={0}
        width="100%"
        zIndex="1000"
        bg={bg}
        color={color}
        boxShadow={boxShadow}
        transition="background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease"
        py={3}
      >
        <Flex
          maxWidth="1300px"
          mx="auto"
          align="center"
          justify="space-between"
          px={8}
        >
          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Menu"
            display={{ base: 'flex', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            _hover={{
              bg: 'transparent',
            }}
            color={color}
          />

          {/* Left Links (Desktop Only) */}
          <HStack flex="1" spacing={6} display={{ base: 'none', md: 'flex' }}>
            <Link as={NextLink} href="/about-us" {...linkStyle}>
              About
            </Link>
            <Link as={NextLink} href="/team" {...linkStyle}>
              Team
            </Link>
            <Link as={NextLink} href="/statement-of-faith" {...linkStyle}>
              Statement of Faith
            </Link>
          </HStack>

          {/* Center Logo (Clickable) */}
          <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
              letterSpacing="wide"
              mx={{ base: 'auto', md: '0' }}
              display={{ base: 'block', md: 'inline-block' }}
            >
              SPERO
            </Text>
          </Link>

          {/* Right Links (Desktop Only) */}
          <HStack flex="1" spacing={6} justify="flex-end" display={{ base: 'none', md: 'flex' }}>
            <Link as={NextLink} href="/shop" {...linkStyle}>
              Shop
            </Link>
            <Link as={NextLink} href="/designs" {...linkStyle}>
              Design
            </Link>
            <Link as={NextLink} href="/FAQ" {...linkStyle}>
              FAQ
            </Link>
          </HStack>
        </Flex>

        {/* Mobile Menu (Collapse) */}
        <Collapse in={isOpen} animateOpacity>
          <Box
            pb={4}
            display={{ md: 'none' }}
            zIndex={1200} 
          >
            <VStack as="nav" spacing={4} align="flex-start" px={8}>
              <Link as={NextLink} href="/about-us" {...linkStyle}>
                About
              </Link>
              <Link as={NextLink} href="/team" {...linkStyle}>
                Team
              </Link>
              <Link as={NextLink} href="/statement-of-faith" {...linkStyle}>
                Statement of Faith
              </Link>
              <Link as={NextLink} href="/shop" {...linkStyle}>
                Shop
              </Link>
              <Link as={NextLink} href="/designs" {...linkStyle}>
                Design
              </Link>
              <Link as={NextLink} href="/FAQ" {...linkStyle}>
                FAQ
              </Link>
            </VStack>
          </Box>
        </Collapse>
      </Box>

      {/* Conditional Spacer Box for Non-Home Pages */}
      {!isHomePage && <Box height="60px" />}
    </>
  );
}
