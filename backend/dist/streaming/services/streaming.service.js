"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const streaming_entity_1 = require("../entities/streaming.entity");
let StreamingService = class StreamingService {
    constructor(streamingRepository) {
        this.streamingRepository = streamingRepository;
    }
    async findAll() {
        return this.streamingRepository.find();
    }
    async findOne(id) {
        const content = await this.streamingRepository.findOne({ where: { id } });
        if (!content) {
            throw new common_1.NotFoundException(`Streaming content with ID ${id} not found`);
        }
        return content;
    }
    async create(createStreamingDto) {
        const newContent = this.streamingRepository.create(createStreamingDto);
        return this.streamingRepository.save(newContent);
    }
    async update(id, updateStreamingDto) {
        const content = await this.findOne(id);
        this.streamingRepository.merge(content, updateStreamingDto);
        return this.streamingRepository.save(content);
    }
    async remove(id) {
        const result = await this.streamingRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Streaming content with ID ${id} not found`);
        }
    }
};
StreamingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(streaming_entity_1.StreamingContent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StreamingService);
exports.StreamingService = StreamingService;
//# sourceMappingURL=streaming.service.js.map