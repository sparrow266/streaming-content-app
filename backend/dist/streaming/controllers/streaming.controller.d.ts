import { StreamingService } from '../services/streaming.service';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';
import { StreamingContent } from '../entities/streaming.entity';
export declare class StreamingController {
    private readonly streamingService;
    constructor(streamingService: StreamingService);
    findAll(): Promise<StreamingContent[]>;
    findOne(id: number): Promise<StreamingContent>;
    create(createStreamingDto: CreateStreamingDto): Promise<StreamingContent>;
    update(id: number, updateStreamingDto: UpdateStreamingDto): Promise<StreamingContent>;
    remove(id: number): Promise<void>;
}
