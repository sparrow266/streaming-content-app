import React from 'react';
import { StreamingContent } from '../services/api';
import StreamingItemCard from './StreamingItemCard';

interface StreamingListProps {
  items: StreamingContent[];
}

const StreamingList: React.FC<StreamingListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="container-custom text-center py-16">
        <h2 className="text-xl font-medium text-gray-600">No streaming content available</h2>
        <p className="mt-2 text-gray-500">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="h-full">
          <StreamingItemCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default StreamingList;
