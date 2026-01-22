'use client';

import Product from '../../../components/Product'


export default function ShopJustified() {
  const imageList = [
    "/images/designs/the-calling-5.jpg",
    "/images/designs/the-calling-6.jpg",
    "/images/designs/the-calling-7.jpg"
  ];

  const sizes = new Map<string, string>([
    ["s", "S"],
    ["m", "M"],
    ["l", "L"]
  ]);

  const props = {
    name: '"The Calling"',
    description: 'Spero\'s "The Calling" tee is inspired by Ephesians 4:1-3, where Paul urges believers to "walk in a manner worthy of the calling we have received," with all humility, gentleness, patience, and love, eager to maintain the unity of the Spirit in the bond of peace. This t-shirt serves as a reminder that every part of our lives belongs to Christ and is an opportunity to reflect His character and build up His church.\n\nWe found it fitting to have the proceeds from "The Calling" tee to go to Grace Education Ministries (GEM) in Niger, run by missionary Aileen Chung. She runs Grace Academy and Emmanuel Academy, Christian academies for girls and boys respectively, aiming to spread the Gospel through providing affordable education. Many missionaries in Niger have been victim to persecution by the government, being displaced away from their homes and forced to shut down their ministries. Spero aims to assist Aileen\'s calling in Niger, both sponsoring children who hope to attend the academies and also fund the school itself for new projects (new bibles, feeding students, etc.).',
    price: 35,
    images: imageList,
    sizes: sizes,
    stripeId: 'calling',
    isSoldOut: true
  }
  return (
    <>
      <Product {...props} />
    </>
  )
}
