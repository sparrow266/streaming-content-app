"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStreamingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_streaming_dto_1 = require("./create-streaming.dto");
class UpdateStreamingDto extends (0, swagger_1.PartialType)(create_streaming_dto_1.CreateStreamingDto) {
}
exports.UpdateStreamingDto = UpdateStreamingDto;
//# sourceMappingURL=update-streaming.dto.js.map