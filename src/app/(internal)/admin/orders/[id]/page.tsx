import { getOrder } from '@/actions/admin';
import OrderPage from './OrderPage';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Inspect Order - Spero',
};

export default async function Page({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);
  if (!order) {
    notFound();
  }
  return <OrderPage order={order} />;
}
