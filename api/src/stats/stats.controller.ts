import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IEmailStats } from 'src/const';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @MessagePattern('get.stats')
  sendEmail(@Payload() message : { value : IEmailStats}) {
    const { value } = message;
    return this.statsService.getStats(value);
  }
}
