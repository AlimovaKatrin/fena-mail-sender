import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IEmailStats } from 'src/const';
import { StatsService } from '../stats/stats.service';

@Controller('posts')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('send.email.stats')
  getStats(@Payload() stats: { value : IEmailStats}) {    
    const { value } = stats
    return this.statsService.getStats(value);
  }
}
