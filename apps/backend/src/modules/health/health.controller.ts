import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {

  @Get()
  @ApiOperation({ summary: 'Health Check API' })
  getHealth() {
    return {
      status: 'UP',
      service: 'Readora API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
  
}