import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StreamingService } from './streaming.service';
import { StreamingContent } from '../entities/streaming.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
});

describe('StreamingService', () => {
  let service: StreamingService;
  let repository: MockRepository<StreamingContent>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamingService,
        {
          provide: getRepositoryToken(StreamingContent),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<StreamingService>(StreamingService);
    repository = module.get<MockRepository<StreamingContent>>(
      getRepositoryToken(StreamingContent),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of streaming content items', async () => {
      const mockContentItems = [
        {
          id: 1,
          title: 'Test Video 1',
          description: 'Test Description 1',
          thumbnail_url: 'http://example.com/thumb1.jpg',
          video_url: 'http://example.com/video1.mp4',
          created_at: new Date(),
        },
        {
          id: 2,
          title: 'Test Video 2',
          description: 'Test Description 2',
          thumbnail_url: 'http://example.com/thumb2.jpg',
          video_url: 'http://example.com/video2.mp4',
          created_at: new Date(),
        },
      ];
      
      repository.find.mockReturnValue(mockContentItems);
      
      const result = await service.findAll();
      expect(result).toEqual(mockContentItems);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a streaming content item if found', async () => {
      const mockContentItem = {
        id: 1,
        title: 'Test Video 1',
        description: 'Test Description 1',
        thumbnail_url: 'http://example.com/thumb1.jpg',
        video_url: 'http://example.com/video1.mp4',
        created_at: new Date(),
      };
      
      repository.findOne.mockReturnValue(mockContentItem);
      
      const result = await service.findOne(1);
      expect(result).toEqual(mockContentItem);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if content item is not found', async () => {
      repository.findOne.mockReturnValue(null);
      
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should successfully create and return a new content item', async () => {
      const createDto = {
        title: 'New Video',
        description: 'New Description',
        thumbnail_url: 'http://example.com/new-thumb.jpg',
        video_url: 'http://example.com/new-video.mp4',
      };
      
      const newContentItem = {
        id: 3,
        ...createDto,
        created_at: new Date(),
      };
      
      repository.create.mockReturnValue(newContentItem);
      repository.save.mockReturnValue(newContentItem);
      
      const result = await service.create(createDto);
      
      expect(result).toEqual(newContentItem);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(newContentItem);
    });
  });

  describe('update', () => {
    it('should update and return the content item if found', async () => {
      const updateDto = {
        title: 'Updated Video',
        description: 'Updated Description',
      };
      
      const existingContentItem = {
        id: 1,
        title: 'Original Video',
        description: 'Original Description',
        thumbnail_url: 'http://example.com/thumb1.jpg',
        video_url: 'http://example.com/video1.mp4',
        created_at: new Date(),
      };
      
      const updatedContentItem = {
        ...existingContentItem,
        ...updateDto,
      };
      
      repository.findOne.mockReturnValue(existingContentItem);
      repository.merge.mockReturnValue(updatedContentItem);
      repository.save.mockReturnValue(updatedContentItem);
      
      const result = await service.update(1, updateDto);
      
      expect(result).toEqual(updatedContentItem);
      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.merge).toHaveBeenCalledWith(existingContentItem, updateDto);
      expect(repository.save).toHaveBeenCalledWith(updatedContentItem);
    });

    it('should throw NotFoundException if content item is not found', async () => {
      const updateDto = { title: 'Updated Video' };
      
      repository.findOne.mockReturnValue(null);
      
      await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('remove', () => {
    it('should successfully delete a content item', async () => {
      repository.delete.mockReturnValue({ affected: 1 });
      
      await service.remove(1);
      
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if content item is not found', async () => {
      repository.delete.mockReturnValue({ affected: 0 });
      
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.delete).toHaveBeenCalledWith(999);
    });
  });
});
