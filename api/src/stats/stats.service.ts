import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IEmailStats } from 'src/const';
import { NotifierGateway } from '../notifier.gateway';

@Injectable()
export class StatsService {
  constructor(private readonly socketGetaway: NotifierGateway) {}

  getStats(@Payload() stats :  IEmailStats) {
    return this.socketGetaway.handleMessage(stats);
  }
}
