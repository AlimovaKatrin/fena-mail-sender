import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatsService } from '../stats/stats.service';

@Controller('posts')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('send.email.stats')
  getStats(@Payload() stats) {    
    console.log('Stats recieved');
    return this.statsService.getStats(stats);
  }
}
