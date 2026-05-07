'use client';

import Product from '../../../components/Product';

function Description() {
  return (
    <div>
      <p>
        Scripture tells us that God is love (1 John 4:8)—not merely loving, but the very
        source and definition of love. This design is a quiet reminder to anchor our lives
        in who He is: perfectly good, faithful, and steadfast toward His people.
      </p>
    </div>
  );
}

export default function ShopGodIsLove() {
  const imageList = [
    '/images/designs/IG2.1.jpg',
  ];

  const sizes = new Map<string, string>([
    ['s', 'S'],
    ['m', 'M'],
    ['l', 'L'],
  ]);

  const props = {
    name: '"God is Love" T-Shirt',
    description: <Description />,
    price: 35,
    images: imageList,
    sizes,
    stripeId: 'god-is-love',
    isSoldOut: false,
  };

  return <Product {...props} />;
}
