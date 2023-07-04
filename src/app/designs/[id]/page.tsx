import designData from '@/app/designs/design-data';
import DesignPage from '@/app/designs/[id]/DesignPage';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  return designData;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const design = designData.find((design) => design.id === params.id);
  if (design === undefined) {
    notFound();
  }
  return {
    title: `${design.name} - Spero`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const design = designData.find((design) => design.id === params.id);
  if (design === undefined) {
    notFound();
  }
  return <DesignPage {...design} />;
}
