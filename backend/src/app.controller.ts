import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      name: 'Streaming Content API',
      version: '1.0.0',
      endpoints: [
        '/api/streaming',
        '/api/auth',
        '/api/docs'
      ]
    };
  }
}
