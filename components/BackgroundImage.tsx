import Image from 'next/image';
import papaBG from '../public/background-papa.png';

export default function BackgroundImage() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={papaBG}
        alt="Papa"
        fill
        className="object-cover object-center opacity-40"
        priority
        sizes="100vw"
      />
    </div>
  );
} 