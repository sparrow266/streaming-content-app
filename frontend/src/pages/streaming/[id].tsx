import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { streamingApi, StreamingContent } from '../../services/api';
import StreamingDetail from '../../components/StreamingDetail';

interface StreamingDetailPageProps {
  content?: StreamingContent;
  error?: string;
}

export default function StreamingDetailPage({ content, error }: StreamingDetailPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="container-custom">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="container-custom">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <p>{error || 'Content not found'}</p>
          <div className="mt-4">
            <Link href="/" legacyBehavior>
              <a className="text-primary-600 hover:underline">← Back to home</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom">
      <div className="mb-6">
        <Link href="/" legacyBehavior>
          <a className="text-primary-600 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to all videos
          </a>
        </Link>
      </div>

      <StreamingDetail content={content} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Add proper type checking for params
  const id = context.params?.id as string | undefined;
  
  if (!id || Array.isArray(id)) {
    return {
      props: {
        error: 'Invalid content ID',
        title: 'Error - StreamFlix'
      }
    };
  }

  try {
    // In a real application, you would fetch from your API
    // Since we're creating a mock, for SSR in development without a running backend:
    let content: StreamingContent | undefined;
    
    try {
      // Try to fetch from API
      content = await streamingApi.getById(parseInt(id as string));
    } catch (e) {
      // Fall back to mock data if API is not available
      // This is a simple mock implementation
      const mockItems = [
        {
          id: 1,
          title: 'Ocean Explorers',
          description: 'Dive deep into the mysteries of the ocean in this fascinating documentary series. Discover unique marine life and underwater ecosystems.\n\nFrom the depths of the Mariana Trench to the vibrant coral reefs of the Great Barrier Reef, this documentary takes you on an extraordinary journey through the world\'s oceans. Led by marine biologists and underwater photographers, you\'ll encounter rare species, learn about ocean conservation, and witness the breathtaking beauty that exists beneath the waves.\n\nProduced by award-winning filmmaker James Anderson, "Ocean Explorers" combines stunning cinematography with cutting-edge underwater filming techniques to bring you closer than ever to the wonders of marine life.',
          thumbnail_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Mountain Escape',
          description: 'Follow adventurers as they tackle the world\'s most challenging mountain terrains. Experience breathtaking views and survival stories.\n\nJoin experienced climbers Alex Honnold and Jimmy Chin as they journey through the most formidable mountain ranges on Earth. From the icy peaks of the Himalayas to the treacherous slopes of the Andes, witness their incredible feats of endurance and skill.\n\nThis documentary not only showcases the physical challenges of extreme mountaineering but also delves into the psychological aspects of risking everything for the ultimate climb. Through intimate interviews and stunning aerial footage, you\'ll experience both the danger and the beauty that draws these adventurers to the world\'s highest places.',
          thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          title: 'Urban Landscapes',
          description: 'A visual journey through the world\'s most impressive cityscapes and urban architectural wonders.\n\nFrom the soaring skyscrapers of Dubai to the historic streets of Rome, "Urban Landscapes" explores how human innovation has shaped our living environments. This documentary examines the artistic vision, engineering feats, and cultural influences that have created the world\'s most iconic urban spaces.\n\nArchitecture critics and urban planners provide insights into the design philosophies behind these remarkable structures, while time-lapse photography reveals the dynamic energy of city life. Discover how modern metropolises balance growth with preservation, functionality with beauty, and history with innovation.',
          thumbnail_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          title: 'Desert Survival',
          description: 'Learn the art of survival in the world\'s harshest desert environments. Essential techniques and amazing natural adaptations.\n\nSurvival expert Ray Mears guides you through the extreme challenges of desert life, demonstrating ancient and modern techniques for finding water, food, and shelter in these seemingly barren landscapes. From the scorching Sahara to the rugged Outback, discover how both humans and wildlife have adapted to thrive in these harsh conditions.\n\nThrough practical demonstrations and encounters with indigenous peoples who have maintained traditional desert lifestyles for generations, this documentary provides valuable insights into sustainable living in extreme environments. "Desert Survival" combines practical knowledge with breathtaking cinematography to showcase the stark beauty and hidden abundance of the world\'s deserts.',
          thumbnail_url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          title: 'Rainforest Secrets',
          description: 'Explore the rich biodiversity of Earth\'s rainforests. Discover rare species and learn about conservation efforts.\n\nJourney into the heart of the world\'s most diverse ecosystems with biologist Dr. Emma Wilson. This documentary offers unprecedented access to remote areas of the Amazon, Congo Basin, and Southeast Asian rainforests, revealing species that have never before been captured on film.\n\nBeyond showcasing the incredible variety of life, "Rainforest Secrets" examines the critical importance of these ecosystems for global climate regulation, medicine, and indigenous cultures. The documentary also highlights innovative conservation projects and sustainable development initiatives that are working to protect these precious habitats for future generations.',
          thumbnail_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        },
        {
          id: 6,
          title: 'Space Frontiers',
          description: 'Journey through the cosmos and learn about the latest discoveries in space exploration and astronomy.\n\nHosted by astrophysicist Dr. Neil deGrasse Tyson, "Space Frontiers" takes viewers on an awe-inspiring tour of our universe, from our solar system to the edge of the observable cosmos. Using cutting-edge CGI and actual footage from space telescopes and planetary rovers, this documentary brings distant celestial phenomena into vivid focus.\n\nThe series explores humanity\'s greatest space achievements, current missions, and future ambitions, including Mars colonization, asteroid mining, and the search for extraterrestrial life. Interviews with NASA engineers, private space company entrepreneurs, and international space agency representatives provide insights into how these bold visions might become reality within our lifetime.',
          thumbnail_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          created_at: new Date().toISOString(),
        }
      ];

      const foundItem = mockItems.find(item => item.id === parseInt(id as string));
      if (foundItem) {
        content = foundItem;
      }
    }

    if (!content) {
      return {
        props: {
          error: 'Content not found',
          title: 'Not Found - StreamFlix'
        }
      };
    }

    return { 
      props: { 
        content,
        title: `${content.title} - StreamFlix`
      } 
    };
  } catch (error) {
    console.error('Error fetching streaming content:', error);
    return { 
      props: { 
        error: 'Failed to load streaming content',
        title: 'Error - StreamFlix'
      } 
    };
  }
};
