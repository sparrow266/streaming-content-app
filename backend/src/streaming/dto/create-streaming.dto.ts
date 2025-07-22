import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStreamingDto {
  @ApiProperty({ example: 'Ocean Documentary' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'An in-depth look at marine life in the Pacific Ocean' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://example.com/thumbnails/ocean-doc.jpg' })
  @IsNotEmpty()
  @IsUrl()
  thumbnail_url: string;

  @ApiProperty({ example: 'https://example.com/videos/ocean-doc.mp4' })
  @IsNotEmpty()
  @IsUrl()
  video_url: string;
}
