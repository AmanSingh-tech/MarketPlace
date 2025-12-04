'use client'

import { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface ProfileImageProps {
  image: string | null;
  alt: string;
}

export default function ProfileImage({ image, alt }: ProfileImageProps) {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return (
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
        <User size={48} className="text-white/90" />
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      layout="fill"
      objectFit="cover"
      onError={() => setImageError(true)}
    />
  );
}
