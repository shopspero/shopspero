import { Center, Heading, Text } from '@chakra-ui/react';
import type { MDXComponents } from 'mdx/types';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <Center p={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          {children}
        </Heading>
      </Center>
    ),
    h2: ({ children }) => (
      <Heading as="h2" size="lg" mt={7} mb={3}>
        {children}
      </Heading>
    ),
    p: ({ children }) => (
      <Text as="p" mb={3}>
        {children}
      </Text>
    ),
    blockquote: ({ children }) => (
      <Text as="blockquote" fontStyle="italic" mb={3}>
        {children}
      </Text>
    ),
    ...components,
  };
}
