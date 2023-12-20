import { DesignInfo } from '@/app/(external)/designs/design-data';
import { Box, Link, Text, useBoolean } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function DesignThumbnail(design: DesignInfo) {
  const [hover, setHover] = useBoolean();

  return (
    <Link as={NextLink} href={`designs/${design.id}`} width={300} height={300}>
      <Box
        width={300}
        height={300}
        position="relative"
        onMouseEnter={setHover.on}
        onMouseLeave={setHover.off}
      >
        <Text
          as="h2"
          fontSize="2xl"
          color="white"
          textAlign="center"
          fontWeight={500}
          textTransform="uppercase"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="overlay"
          opacity={hover ? 100 : 0}
          transition="opacity 0.25s ease"
        >
          {design.name}
        </Text>
        <Image
          src={design.imgs[0]}
          width={300}
          height={300}
          alt={design.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            filter: hover ? 'brightness(70%)' : undefined,
            transition: 'filter 0.25s ease',
          }}
        />
      </Box>
    </Link>
  );
}
