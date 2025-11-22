'use client';

import Product from '../../../components/Product'
import Description from "../designs/descriptions/the-calling-reduced.mdx"


export default function ShopCalling() {
  const imageList = [
    "/images/designs/the-calling-1.jpg",
    "/images/designs/the-calling-2.jpg",
    "/images/designs/the-calling-3.jpg",
    "/images/product/calling-front.png",
    "/images/product/calling-back.png",
    "/images/product/calling-size-guide.png"
  ];

  const sizes = new Map<string, string>([
    ["s", "S"],
    ["m", "M"],
    ["l", "L"]
  ]);

  const props = {
    name: '"The Calling" T-Shirt',
    description: <Description />,
    price: 35,
    images: imageList,
    sizes: sizes,
    stripeId: 'calling',
    isSoldOut: false
  }
  return (
    <>
      <Product {...props} />
    </>
  )
}