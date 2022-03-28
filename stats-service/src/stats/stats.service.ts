import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Payload, Transport } from '@nestjs/microservices';
import { IEmailStats } from 'src/const';

@Injectable()
export class StatsService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'stats',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'stats-reciever',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('get.stats');

    await this.client.connect();
  }
  getStats(@Payload() stats : IEmailStats) {
    this.client
      .emit('get.stats', stats)
      .subscribe(() => console.log('Stats sended' + JSON.stringify(stats)));
  }
}
