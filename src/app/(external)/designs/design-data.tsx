import Abide from '@/app/(external)/designs/descriptions/abide.mdx';
import BayArea from '@/app/(external)/designs/descriptions/bay-area.mdx';
import Berkeley from '@/app/(external)/designs/descriptions/berkeley.mdx';
import BlessedToBless from '@/app/(external)/designs/descriptions/blessed-to-bless.mdx';
import Confidence from '@/app/(external)/designs/descriptions/confidence.mdx';
import Fullness from '@/app/(external)/designs/descriptions/fullness.mdx';
import Hope from '@/app/(external)/designs/descriptions/hope.mdx';
import IAmThatGirl from '@/app/(external)/designs/descriptions/i-am-that-girl.mdx';
import Macron from '@/app/(external)/designs/descriptions/macron.mdx';
import MountainMover from '@/app/(external)/designs/descriptions/mountain-mover.mdx';
import Redeemed from '@/app/(external)/designs/descriptions/redeemed.mdx';
import Salvation from '@/app/(external)/designs/descriptions/salvation.mdx';
import SperoBear from '@/app/(external)/designs/descriptions/spero-bear.mdx';
import WalkOnWater from '@/app/(external)/designs/descriptions/walk-on-water.mdx';
import Trust from '@/app/(external)/designs/descriptions/trust.mdx'
import Justified from '@/app/(external)/designs/descriptions/justified.mdx'
import { ReactNode } from 'react';

export interface DesignInfo {
  id: string;
  name: string;
  description: ReactNode;
  imgs: string[];
}

const designData: DesignInfo[] = [
  {
    id: 'justified',
    name: 'Justified Hoodie',
    description: <Justified />,
    imgs: [
      "/images/home/currentdrop3.jpg",
      "/images/home/currentdrop2.jpg",
      "/images/home/currentdrop.jpg"
    ],
  },
  {
    id: 'trust',
    name: 'Trust T-Shirt',
    description: <Trust />,
    imgs: [
      '/images/designs/flowers-1.jpg',
      '/images/designs/flowers-2.jpg',
      '/images/designs/flowers-3.jpg',
    ],
  },
  {
    id: 'salvation',
    name: 'Salvation Crewneck',
    description: <Salvation />,
    imgs: [
      '/images/designs/salvation-1.jpg',
      '/images/designs/salvation-2.jpg',
      '/images/designs/salvation-3.jpg',
    ],
  },
  {
    id: 'confidence',
    name: 'Confidence T-Shirt',
    description: <Confidence />,
    imgs: [
      '/images/designs/confidence-2.jpg',
      '/images/designs/confidence-1.jpg',
      '/images/designs/confidence-3.jpg',
    ],
  },
  {
    id: 'fullness',
    name: 'Fullness Hoodie',
    description: <Fullness />,
    imgs: [
      '/images/designs/fullness-2.jpg',
      '/images/designs/fullness-1.jpg',
      '/images/designs/fullness-3.jpg',
    ],
  },
  {
    id: 'redeemed',
    name: 'Redeemed Hoodie',
    description: <Redeemed />,
    imgs: [
      '/images/designs/redeemed-1.jpg',
      '/images/designs/redeemed-2.jpg',
      '/images/designs/redeemed-3.jpg',
    ],
  },
  {
    id: 'abide',
    name: 'Abide Hoodie',
    description: <Abide />,
    imgs: [
      '/images/designs/abide-1.jpg',
      '/images/designs/abide-2.jpg',
      '/images/designs/abide-3.jpg',
      '/images/designs/abide-4.jpg',
    ],
  },
  {
    id: 'hope',
    name: 'Hope Longsleeve',
    description: <Hope />,
    imgs: [
      '/images/designs/hope-1.jpg',
      '/images/designs/hope-2.jpg',
      '/images/designs/hope-3.jpg',
    ],
  },
  // {
  //   id: 'i-am-that-girl',
  //   name: 'I Am That Girl Hat',
  //   description: <IAmThatGirl />,
  //   imgs: [
  //     '/images/designs/i-am-that-girl-1.jpg',
  //     '/images/designs/i-am-that-girl-2.jpg',
  //   ],
  // },
  // {
  //   id: 'macron',
  //   name: 'Macron Hoodie',
  //   description: <Macron />,
  //   imgs: [
  //     '/images/designs/macron-1.jpg',
  //     '/images/designs/macron-2.jpg',
  //     '/images/designs/macron-3.jpg',
  //   ],
  // },
  // {
  //   id: 'blessed-to-bless',
  //   name: 'Blessed to Bless Shirt',
  //   description: <BlessedToBless />,
  //   imgs: [
  //     '/images/designs/blessed-to-bless-1.jpg',
  //     '/images/designs/blessed-to-bless-2.jpg',
  //   ],
  // },
  // {
  //   id: 'bay-area',
  //   name: 'Bay Area Longsleeve',
  //   description: <BayArea />,
  //   imgs: ['/images/designs/bay-area-1.jpg', '/images/designs/bay-area-2.jpg'],
  // },
  // {
  //   id: 'berkeley',
  //   name: 'Berkeley Hoodie',
  //   description: <Berkeley />,
  //   imgs: ['/images/designs/berkeley-1.jpg', '/images/designs/berkeley-2.jpg'],
  // },
  {
    id: 'walk-on-water',
    name: 'Walk on Water Sticker',
    description: <WalkOnWater />,
    imgs: [
      '/images/designs/walk-on-water-1.png',
      '/images/designs/walk-on-water-2.jpg',
      '/images/designs/walk-on-water-3.jpg',
    ],
  },
  {
    id: 'spero-bear',
    name: 'Spero Bear Sticker',
    description: <SperoBear />,
    imgs: [
      '/images/designs/spero-bear-1.png',
      '/images/designs/spero-bear-2.jpg',
      '/images/designs/spero-bear-3.jpg',
    ],
  },
  {
    id: 'mountain-mover',
    name: 'Mountain Mover Sticker',
    description: <MountainMover />,
    imgs: [
      '/images/designs/mountain-mover-1.png',
      '/images/designs/mountain-mover-2.jpg',
      '/images/designs/mountain-mover-3.jpg',
    ],
  },
];

export default designData;
