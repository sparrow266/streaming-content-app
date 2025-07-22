import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StreamingContent } from '../services/api';

interface StreamingItemCardProps {
  item: StreamingContent;
}

const StreamingItemCard: React.FC<StreamingItemCardProps> = ({ item }) => {
  return (
    <Link href={`/streaming/${item.id}`} legacyBehavior>
      <a className="card block h-full">
        <div className="relative aspect-video w-full">
          <Image 
            src={item.thumbnail_url} 
            alt={item.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white font-medium">Watch Now</div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {item.description}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default StreamingItemCard;
