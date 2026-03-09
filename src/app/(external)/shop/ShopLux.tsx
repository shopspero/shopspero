'use client';

import Product from '../../../components/Product'
function Description() {
  return (
    <div>
      <p>Through His saving work, God brings His presence back to His people and calls us out of darkness into His marvelous light (1 Peter 2:9). Isaiah declares that “the Lord will be your everlasting light” (Isaiah 60:20) and that His people will be made righteous by “the work of my hands, that I might be glorified” (Isaiah 60:21). Our hearts thrill with joy because of what Christ has done for us, yet we stand before Him with awe and reverence. Lux Aeterna is a reminder to lift our eyes to the everlasting light of Christ and live as reflections of His glory.</p>
    </div>
  )
} 

export default function ShopLux() {
  const imageList = [
    "/images/designs/lux-aeterna-2.jpg",
    "/images/designs/lux-aeterna-3.jpg",
    "/images/designs/lux-aeterna-4.jpg",
    "/images/designs/lux-aeterna-5.jpg",
  ];

  const sizes = new Map<string, string>([
    ["s", "S"],
    ["m", "M"],
    ["l", "L"]
  ]);

  const props = {
    name: '"Lux Aeterna" Crewneck',
    description: <Description />,
    price: 35,
    images: imageList,
    sizes: sizes,
    stripeId: 'lux',
    isSoldOut: false
  }
  return (
    <>
      <Product {...props} />
    </>
  )
}