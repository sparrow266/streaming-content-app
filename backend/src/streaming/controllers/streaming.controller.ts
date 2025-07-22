import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StreamingService } from '../services/streaming.service';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';
import { StreamingContent } from '../entities/streaming.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('streaming')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all streaming content' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all streaming content', 
    type: [StreamingContent] 
  })
  async findAll(): Promise<StreamingContent[]> {
    return this.streamingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get streaming content by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Found streaming content', 
    type: StreamingContent 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Streaming content not found' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StreamingContent> {
    return this.streamingService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new streaming content' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The streaming content has been successfully created', 
    type: StreamingContent 
  })
  async create(@Body() createStreamingDto: CreateStreamingDto): Promise<StreamingContent> {
    return this.streamingService.create(createStreamingDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update streaming content by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The streaming content has been successfully updated', 
    type: StreamingContent 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Streaming content not found' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateStreamingDto: UpdateStreamingDto,
  ): Promise<StreamingContent> {
    return this.streamingService.update(id, updateStreamingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete streaming content by ID' })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'The streaming content has been successfully deleted' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Streaming content not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.streamingService.remove(id);
  }
}
