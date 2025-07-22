import { GetServerSideProps } from 'next';
import { streamingApi, StreamingContent } from '../services/api';
import StreamingList from '../components/StreamingList';

interface HomeProps {
  items: StreamingContent[];
  error?: string;
}

export default function Home({ items, error }: HomeProps) {
  return (
    <div className="container-custom">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Popular Streams</h1>
        <p className="text-gray-600 mt-2">Watch the latest and greatest streaming content</p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <p>{error}</p>
          <p className="text-sm mt-2">Please try again later or contact support if the problem persists.</p>
        </div>
      ) : (
        <StreamingList items={items} />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // In a real application, you would fetch from your API
    // Since we're creating a mock, for SSR in development without a running backend:
    let items: StreamingContent[];

    try {
      // Try to fetch from API
      items = await streamingApi.getAll();
    } catch (e) {
      // Fall back to mock data if API is not available
      items = [
        {
          id: 1,
          title: 'Ocean Explorers',
          description: 'Dive deep into the mysteries of the ocean in this fascinating documentary series. Discover unique marine life and underwater ecosystems.',
          thumbnail_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Mountain Escape',
          description: 'Follow adventurers as they tackle the world\'s most challenging mountain terrains. Experience breathtaking views and survival stories.',
          thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          title: 'Urban Landscapes',
          description: 'A visual journey through the world\'s most impressive cityscapes and urban architectural wonders.',
          thumbnail_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          title: 'Desert Survival',
          description: 'Learn the art of survival in the world\'s harshest desert environments. Essential techniques and amazing natural adaptations.',
          thumbnail_url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          title: 'Rainforest Secrets',
          description: 'Explore the rich biodiversity of Earth\'s rainforests. Discover rare species and learn about conservation efforts.',
          thumbnail_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 6,
          title: 'Space Frontiers',
          description: 'Journey through the cosmos and learn about the latest discoveries in space exploration and astronomy.',
          thumbnail_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        }
      ];
    }

    return { 
      props: { 
        items,
        title: 'Home - StreamFlix'
      } 
    };
  } catch (error) {
    console.error('Error fetching streaming content:', error);
    return { 
      props: { 
        items: [],
        error: 'Failed to load streaming content',
        title: 'Home - StreamFlix'
      } 
    };
  }
};
