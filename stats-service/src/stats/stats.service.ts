import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Payload, Transport } from '@nestjs/microservices';

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
  getStats(@Payload() stats) {
    const { value } = stats;
    this.client
      .emit('get.stats', value)
      .subscribe(() => console.log('Stats sended' + value));
  }
}
