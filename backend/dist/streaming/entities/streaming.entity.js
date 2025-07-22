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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingContent = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let StreamingContent = class StreamingContent {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StreamingContent.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StreamingContent.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content description' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], StreamingContent.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL to content thumbnail image' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StreamingContent.prototype, "thumbnail_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL to video content' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StreamingContent.prototype, "video_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StreamingContent.prototype, "created_at", void 0);
StreamingContent = __decorate([
    (0, typeorm_1.Entity)('streaming_content')
], StreamingContent);
exports.StreamingContent = StreamingContent;
//# sourceMappingURL=streaming.entity.js.map