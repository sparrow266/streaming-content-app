import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { StreamingService } from '../streaming/services/streaming.service';
import { AuthService } from '../auth/services/auth.service';

async function bootstrap() {
  const logger = new Logger('Seeder');
  
  logger.log('Starting database seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const streamingService = app.get(StreamingService);
    const authService = app.get(AuthService);
    
    // Seed admin user
    await authService.seedUser();
    logger.log('Admin user created successfully');
    
    // Check if we have content already
    const existingContent = await streamingService.findAll();
    
    if (existingContent.length === 0) {
      // Seed streaming content
      const streamingContent = [
        {
          title: 'Ocean Explorers',
          description: 'Dive deep into the mysteries of the ocean in this fascinating documentary series. Discover unique marine life and underwater ecosystems.\n\nFrom the depths of the Mariana Trench to the vibrant coral reefs of the Great Barrier Reef, this documentary takes you on an extraordinary journey through the world\'s oceans.',
          thumbnail_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        },
        {
          title: 'Mountain Escape',
          description: 'Follow adventurers as they tackle the world\'s most challenging mountain terrains. Experience breathtaking views and survival stories.\n\nJoin experienced climbers Alex Honnold and Jimmy Chin as they journey through the most formidable mountain ranges on Earth.',
          thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        },
        {
          title: 'Urban Landscapes',
          description: 'A visual journey through the world\'s most impressive cityscapes and urban architectural wonders.\n\nFrom the soaring skyscrapers of Dubai to the historic streets of Rome, "Urban Landscapes" explores how human innovation has shaped our living environments.',
          thumbnail_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        },
        {
          title: 'Desert Survival',
          description: 'Learn the art of survival in the world\'s harshest desert environments. Essential techniques and amazing natural adaptations.\n\nSurvival expert Ray Mears guides you through the extreme challenges of desert life.',
          thumbnail_url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        },
        {
          title: 'Rainforest Secrets',
          description: 'Explore the rich biodiversity of Earth\'s rainforests. Discover rare species and learn about conservation efforts.\n\nJourney into the heart of the world\'s most diverse ecosystems with biologist Dr. Emma Wilson.',
          thumbnail_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        },
        {
          title: 'Space Frontiers',
          description: 'Journey through the cosmos and learn about the latest discoveries in space exploration and astronomy.\n\nHosted by astrophysicist Dr. Neil deGrasse Tyson, "Space Frontiers" takes viewers on an awe-inspiring tour of our universe.',
          thumbnail_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80',
          video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        }
      ];
      
      for (const content of streamingContent) {
        await streamingService.create(content);
      }
      
      logger.log(`${streamingContent.length} streaming content items created successfully`);
    } else {
      logger.log(`Database already contains ${existingContent.length} content items. Skipping content seeding.`);
    }
    
    logger.log('Database seeding completed successfully');
  } catch (error) {
    logger.error('Database seeding failed', error.stack);
  } finally {
    await app.close();
  }
}

bootstrap();
