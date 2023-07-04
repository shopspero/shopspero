import {
  FullnessDescription,
  Psalm139Description,
  SalvationDescription,
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
    name: 'Salvation',
    description: <SalvationDescription />,
    imgs: [
      '/images/designs/salvation-1.jpg',
      '/images/designs/salvation-2.jpg',
      '/images/designs/salvation-3.jpg',
    ],
  },
  {
    id: 'psalm-139',
    name: 'Psalm 139',
    description: <Psalm139Description />,
    imgs: [
      '/images/designs/psalm-139-1.jpg',
      '/images/designs/psalm-139-2.jpg',
      '/images/designs/psalm-139-3.jpg',
    ],
  },
  {
    id: 'fullness',
    name: 'Fullness',
    description: <FullnessDescription />,
    imgs: [
      '/images/designs/fullness-1.jpg',
      '/images/designs/fullness-2.jpg',
      '/images/designs/fullness-3.jpg',
    ],
  },
];

export default designData;
