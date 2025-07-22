import React from 'react';
import dynamic from 'next/dynamic';
import { StreamingContent } from '../services/api';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface StreamingDetailProps {
  content: StreamingContent;
}

const StreamingDetail: React.FC<StreamingDetailProps> = ({ content }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
        <ReactPlayer
          url={content.video_url}
          width="100%"
          height="100%"
          controls
          playing
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
        />
      </div>
      
      <div className="mt-6">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span>
            {new Date(content.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        
        <div className="mt-6 text-gray-700 prose max-w-none">
          <p>{content.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StreamingDetail;
