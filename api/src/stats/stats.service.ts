import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { NotifierGateway } from '../notifier.gateway';

@Injectable()
export class StatsService {
  constructor(private readonly socketGetaway: NotifierGateway) {}

  getStats(@Payload() stats) {
    return this.socketGetaway.handleMessage(stats);
  }
}
