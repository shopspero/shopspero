import ShopClosed from '@/app/(external)/shop/ShopClosed';
// import ShopSalvation from '@/app/(external)/shop/ShopSalvation';
// import ShopAbba from '@/app/(external)/shop/ShopAbba';

export const metadata = {
  title: 'Shop - Spero',
};

export default function Page() {
  // return <ShopAbba />
  // return <ShopSalvation />
  return <ShopClosed />;
}
