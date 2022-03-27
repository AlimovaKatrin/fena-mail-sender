import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { NotifierGateway } from '../notifier.gateway';

@Injectable()
export class StatsService {
  constructor(private readonly socketGetaway: NotifierGateway) {}
  async getStats(stats: any) {
    console.log('StatsService getStats');
    
    this.socketGetaway.handleMessage(stats);
  }
}
