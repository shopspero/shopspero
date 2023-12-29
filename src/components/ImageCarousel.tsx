'use client';

import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  speed: 250,
  adaptiveHeight: true,
};

export default function Carousel({
  srcs,
  width,
}: Readonly<{
  srcs: string[];
  width: any;
}>) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box width={width} position="relative">
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={4}
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        background="white"
        _hover={{ background: 'gray.100' }}
        opacity="85%"
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right={4}
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        background="white"
        _hover={{ background: 'gray.100' }}
        opacity="85%"
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {srcs.map((src) => (
          <Box key={src} width={width} height="100%">
            <Image width={600} height={600} src={src} alt={src} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
