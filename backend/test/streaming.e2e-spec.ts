import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { StreamingContent } from '../src/streaming/entities/streaming.entity';

describe('StreamingController (e2e)', () => {
  let app: INestApplication;
  
  // Mock repository for StreamingContent
  const mockStreamingRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  // Mock streaming content item
  const mockContentItem = {
    id: 1,
    title: 'Test Video',
    description: 'Test Description',
    thumbnail_url: 'http://example.com/thumb.jpg',
    video_url: 'http://example.com/video.mp4',
    created_at: new Date(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(getRepositoryToken(StreamingContent))
    .useValue(mockStreamingRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api');
    await app.init();

    // Reset mock calls between tests
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/streaming (GET)', () => {
    it('should return an array of streaming content items', async () => {
      mockStreamingRepository.find.mockResolvedValue([mockContentItem]);

      const response = await request(app.getHttpServer())
        .get('/api/streaming')
        .expect(200);

      expect(response.body).toEqual([mockContentItem]);
      expect(mockStreamingRepository.find).toHaveBeenCalled();
    });
  });

  describe('/api/streaming/:id (GET)', () => {
    it('should return a single streaming content item', async () => {
      mockStreamingRepository.findOne.mockResolvedValue(mockContentItem);

      const response = await request(app.getHttpServer())
        .get('/api/streaming/1')
        .expect(200);

      expect(response.body).toEqual(mockContentItem);
      expect(mockStreamingRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('should return 404 if content item is not found', async () => {
      mockStreamingRepository.findOne.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/api/streaming/999')
        .expect(404);

      expect(mockStreamingRepository.findOne).toHaveBeenCalledWith(999);
    });
  });
});
