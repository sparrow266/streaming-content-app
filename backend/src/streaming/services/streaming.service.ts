import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StreamingContent } from '../entities/streaming.entity';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';

@Injectable()
export class StreamingService {
  constructor(
    @InjectRepository(StreamingContent)
    private streamingRepository: Repository<StreamingContent>,
  ) {}

  async findAll(): Promise<StreamingContent[]> {
    return this.streamingRepository.find();
  }

  async findOne(id: number): Promise<StreamingContent> {
    const content = await this.streamingRepository.findOne({ where: { id } });
    
    if (!content) {
      throw new NotFoundException(`Streaming content with ID ${id} not found`);
    }
    
    return content;
  }

  async create(createStreamingDto: CreateStreamingDto): Promise<StreamingContent> {
    const newContent = this.streamingRepository.create(createStreamingDto);
    return this.streamingRepository.save(newContent);
  }

  async update(id: number, updateStreamingDto: UpdateStreamingDto): Promise<StreamingContent> {
    const content = await this.findOne(id);
    
    // Update content with new values
    this.streamingRepository.merge(content, updateStreamingDto);
    return this.streamingRepository.save(content);
  }

  async remove(id: number): Promise<void> {
    const result = await this.streamingRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Streaming content with ID ${id} not found`);
    }
  }
}
