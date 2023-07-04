import {
  FullnessDescription,
  ConfidenceDescription,
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
    id: 'confidence',
    name: 'Confidence',
    description: <ConfidenceDescription />,
    imgs: [
      '/images/designs/confidence-1.jpg',
      '/images/designs/confidence-2.jpg',
      '/images/designs/confidence-3.jpg',
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
