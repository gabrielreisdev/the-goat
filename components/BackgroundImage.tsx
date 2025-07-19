import Image from 'next/image';
import papaBG from '../public/background-papa.png';

export default function BackgroundImage() {
  return (
    <Image src={papaBG} alt="Papa" className="absolute inset-0 bg-cover bg-center opacity-40 h-screen" />
  );
} 