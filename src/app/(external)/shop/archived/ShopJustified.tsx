'use client';

import Product from '../../../../components/Product'


export default function ShopJustified() {
  const imageList = [
    "/images/home/currentdrop3.jpg",
    "/images/home/currentdrop2.jpg",
    "/images/home/currentdrop.jpg"
  ];

  const sizes = new Map<string, string>([
    ["s", "S"],
    ["m", "M"],
    ["l", "L"]
  ]);

  const props = {
    name: 'Justified Hoodie',
    description: 'The Justified Hoodie was inspired by Romans 3:24-26 which says\n' +
      '"justified by his grace as a gift, through the redemption that \n' +
      'is in Christ Jesus, whom God put forward as a propitiation by his blood, \n' +
      'to be received by faith. This was to show God\'s righteousness, because \n' +
      'in his divine forbearance he had passed over former sins. It was to show \n' +
      'his righteousness at the present time, so that he might be just and the \n' +
      'justifier of the one who has faith in Jesus."; The hoodie reminds us of \n' +
      'God\'s grace and how we have been justified at the cost of the precious \n' +
      'blood of Jesus Christ.',
    price: 45,
    images: imageList,
    sizes: sizes,
    stripeId: 'justified',
    isSoldOut: false
  }
  return (
    <>
      <Product {...props} />
    </>
  )
}
