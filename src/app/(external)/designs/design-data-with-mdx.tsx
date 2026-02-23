/**
 * Full design data (list + MDX descriptions). Import only from the [id] page
 * so the list page never loads MDX and next build succeeds.
 */

import Abide from '@/app/(external)/designs/descriptions/abide.mdx';
import Calling from '@/app/(external)/designs/descriptions/the-calling.mdx';
import Confidence from '@/app/(external)/designs/descriptions/confidence.mdx';
import Fullness from '@/app/(external)/designs/descriptions/fullness.mdx';
import Hope from '@/app/(external)/designs/descriptions/hope.mdx';
import Justified from '@/app/(external)/designs/descriptions/justified.mdx';
import MountainMover from '@/app/(external)/designs/descriptions/mountain-mover.mdx';
import Redeemed from '@/app/(external)/designs/descriptions/redeemed.mdx';
import Salvation from '@/app/(external)/designs/descriptions/salvation.mdx';
import SperoBear from '@/app/(external)/designs/descriptions/spero-bear.mdx';
import Trust from '@/app/(external)/designs/descriptions/trust.mdx';
import WalkOnWater from '@/app/(external)/designs/descriptions/walk-on-water.mdx';
import Worth from '@/app/(external)/designs/descriptions/surpassing-worth.mdx';
import { designList } from '@/app/(external)/designs/design-data';
import type { DesignInfo } from '@/app/(external)/designs/design-data';
import type { ReactNode } from 'react';

/** Design id → component name (all strings). */
const descriptionIdToComponentName: Record<string, string> = {
  'the-calling': 'Calling',
  'surpassing-worth': 'Worth',
  justified: 'Justified',
  trust: 'Trust',
  salvation: 'Salvation',
  confidence: 'Confidence',
  fullness: 'Fullness',
  redeemed: 'Redeemed',
  abide: 'Abide',
  hope: 'Hope',
  'walk-on-water': 'WalkOnWater',
  'spero-bear': 'SperoBear',
  'mountain-mover': 'MountainMover',
};

const componentByName: Record<string, ReactNode> = {
  Calling: <Calling />,
  Worth: <Worth />,
  Justified: <Justified />,
  Trust: <Trust />,
  Salvation: <Salvation />,
  Confidence: <Confidence />,
  Fullness: <Fullness />,
  Redeemed: <Redeemed />,
  Abide: <Abide />,
  Hope: <Hope />,
  WalkOnWater: <WalkOnWater />,
  SperoBear: <SperoBear />,
  MountainMover: <MountainMover />,
};

const designData: DesignInfo[] = designList.map((item) => {
  const componentName = descriptionIdToComponentName[item.id];
  if (!componentName) throw new Error(`Missing description for design: ${item.id}`);
  const description = componentByName[componentName];
  if (description === undefined) throw new Error(`Missing component: ${componentName}`);
  return { ...item, description };
});

export default designData;
