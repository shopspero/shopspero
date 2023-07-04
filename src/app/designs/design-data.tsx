import {
  AbideDescription,
  BayAreaDescription,
  BerkeleyDescription,
  BlessedToBlessDescription,
  ConfidenceDescription,
  FullnessDescription,
  HopeDescription,
  IAmThatGirlDescription,
  MacronDescription,
  MountainMoverDescription,
  RedeemedDescription,
  SalvationDescription,
  SperoBearDescription,
  WalkOnWaterDescription,
} from '@/app/designs/descriptions/descriptions';
import { ReactNode } from 'react';

export interface DesignInfo {
  id: string;
  name: string;
  description: ReactNode;
  imgs: string[];
}

const designData: DesignInfo[] = [
  {
    id: 'salvation',
    name: 'Salvation Crewneck',
    description: <SalvationDescription />,
    imgs: [
      '/images/designs/salvation-1.jpg',
      '/images/designs/salvation-2.jpg',
      '/images/designs/salvation-3.jpg',
    ],
  },
  {
    id: 'confidence',
    name: 'Confidence T-Shirt',
    description: <ConfidenceDescription />,
    imgs: [
      '/images/designs/confidence-1.jpg',
      '/images/designs/confidence-2.jpg',
      '/images/designs/confidence-3.jpg',
    ],
  },
  {
    id: 'fullness',
    name: 'Fullness Hoodie',
    description: <FullnessDescription />,
    imgs: [
      '/images/designs/fullness-1.jpg',
      '/images/designs/fullness-2.jpg',
      '/images/designs/fullness-3.jpg',
    ],
  },
  {
    id: 'walk-on-water',
    name: 'Walk on Water Sticker',
    description: <WalkOnWaterDescription />,
    imgs: [
      '/images/designs/walk-on-water-1.png',
      '/images/designs/walk-on-water-2.jpg',
      '/images/designs/walk-on-water-3.jpg',
    ],
  },
  {
    id: 'spero-bear',
    name: 'Spero Bear Sticker',
    description: <SperoBearDescription />,
    imgs: [
      '/images/designs/spero-bear-1.png',
      '/images/designs/spero-bear-2.jpg',
      '/images/designs/spero-bear-3.jpg',
    ],
  },
  {
    id: 'mountain-mover',
    name: 'Mountain Mover Sticker',
    description: <MountainMoverDescription />,
    imgs: [
      '/images/designs/mountain-mover-1.png',
      '/images/designs/mountain-mover-2.jpg',
      '/images/designs/mountain-mover-3.jpg',
    ],
  },
  {
    id: 'redeemed',
    name: 'Redeemed Hoodie',
    description: <RedeemedDescription />,
    imgs: [
      '/images/designs/redeemed-1.jpg',
      '/images/designs/redeemed-2.jpg',
      '/images/designs/redeemed-3.jpg',
    ],
  },
  {
    id: 'abide',
    name: 'Abide Hoodie',
    description: <AbideDescription />,
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
    description: <HopeDescription />,
    imgs: [
      '/images/designs/hope-1.jpg',
      '/images/designs/hope-2.jpg',
      '/images/designs/hope-3.jpg',
    ],
  },
  {
    id: 'i-am-that-girl',
    name: 'I Am That Girl Hat',
    description: <IAmThatGirlDescription />,
    imgs: [
      '/images/designs/i-am-that-girl-1.jpg',
      '/images/designs/i-am-that-girl-2.jpg',
    ],
  },
  {
    id: 'macron',
    name: 'Macron Hoodie',
    description: <MacronDescription />,
    imgs: [
      '/images/designs/macron-1.jpg',
      '/images/designs/macron-2.jpg',
      '/images/designs/macron-3.jpg',
    ],
  },
  {
    id: 'blessed-to-bless',
    name: 'Blessed to Bless Shirt',
    description: <BlessedToBlessDescription />,
    imgs: [
      '/images/designs/blessed-to-bless-1.jpg',
      '/images/designs/blessed-to-bless-2.jpg',
    ],
  },
  {
    id: 'bay-area',
    name: 'Bay Area Longsleeve',
    description: <BayAreaDescription />,
    imgs: ['/images/designs/bay-area-1.jpg', '/images/designs/bay-area-2.jpg'],
  },
  {
    id: 'berkeley',
    name: 'Berkeley Hoodie',
    description: <BerkeleyDescription />,
    imgs: ['/images/designs/berkeley-1.jpg', '/images/designs/berkeley-2.jpg'],
  },
];

export default designData;
