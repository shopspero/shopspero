import ShopClosed from '@/app/(external)/shop/ShopClosed';

export const metadata = {
  title: 'Shop - Spero',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <ShopClosed />;
}
