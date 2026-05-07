// import ShopClosed from '@/app/(external)/shop/ShopClosed';
import ShopGodIsLove from '@/app/(external)/shop/ShopGodIsLove';
// import ShopAbba from '@/app/(external)/shop/ShopAbba';

export const metadata = {
  title: 'Shop - Spero',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <ShopGodIsLove />;
  // return <ShopClosed />;
}
