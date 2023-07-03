import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const settings = {
  dots: true,
  speed: 250,
  adaptiveHeight: true,
};

export default function Carousel({
  srcs,
  width,
}: {
  srcs: string[];
  width: number;
}) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box width={width} position="relative">
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={-5}
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right={-5}
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {srcs.map((src) => (
          <Box width="100%" height="100%">
            <Image src={src} width={width} height={width} alt="" />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
