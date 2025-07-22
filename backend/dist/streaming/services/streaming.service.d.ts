import { Repository } from 'typeorm';
import { StreamingContent } from '../entities/streaming.entity';
import { CreateStreamingDto } from '../dto/create-streaming.dto';
import { UpdateStreamingDto } from '../dto/update-streaming.dto';
export declare class StreamingService {
    private streamingRepository;
    constructor(streamingRepository: Repository<StreamingContent>);
    findAll(): Promise<StreamingContent[]>;
    findOne(id: number): Promise<StreamingContent>;
    create(createStreamingDto: CreateStreamingDto): Promise<StreamingContent>;
    update(id: number, updateStreamingDto: UpdateStreamingDto): Promise<StreamingContent>;
    remove(id: number): Promise<void>;
}
