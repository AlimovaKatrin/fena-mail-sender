import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('get.stats')
  sendEmail(@Payload() message) {
    const { value } = message;
    return this.statsService.getStats(value);
  }
}
