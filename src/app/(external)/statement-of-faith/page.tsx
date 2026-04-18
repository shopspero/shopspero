import { Metadata } from 'next';
import GospelSlider from './GospelSlider';

export const metadata: Metadata = {
  title: 'Statement of Faith - Spero',
};

export default function Page() {
  return <GospelSlider />;
}
