import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('streaming_content')
export class StreamingContent {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Content title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Content description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'URL to content thumbnail image' })
  @Column()
  thumbnail_url: string;

  @ApiProperty({ description: 'URL to video content' })
  @Column()
  video_url: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  created_at: Date;
}
