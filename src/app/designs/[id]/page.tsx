import designData from '@/app/designs/design-data';
import DesignPage from '@/app/designs/[id]/DesignPage';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return designData;
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const design = designData.find((design) => design.id === params.id);
  if (design === undefined) {
    notFound();
  }
  return {
    title: `${design.name} - Spero`,
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const design = designData.find((design) => design.id === params.id);
  if (design === undefined) {
    notFound();
  }
  return <DesignPage {...design} />;
}
