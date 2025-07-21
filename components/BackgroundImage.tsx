import Image from 'next/image';
import papaBG from '../public/background-papa.webp';

export default function BackgroundImage() {
  return (
    <div className="">
      <Image
        src={papaBG}
        alt="Papa"
        fill
        className="object-cover object-center opacity-80"
        priority
        sizes="100vw"
        placeholder="blur"
      />
    </div>
  );
} 