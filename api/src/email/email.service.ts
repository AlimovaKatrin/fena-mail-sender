import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class EmailService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'email',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('send.new.email');

    await this.client.connect();
  }

  sendEmail(@Payload() amount) {
    const id = Math.floor(Math.random() * (1 - 10000) + 10000);
    this.client.emit('send.new.email', { amount, id });
    return id;
  }
}
