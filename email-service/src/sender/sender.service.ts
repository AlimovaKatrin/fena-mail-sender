import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport, Payload } from '@nestjs/microservices';
import { mockedSending } from '../const';

@Injectable()
export class SenderService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'stats',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'stats',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('send.email.stats');

    await this.client.connect();
  }

  async sendEmail(@Payload() message) {
    const {
      value: { amount, id },
    } = message;

    for (let index = 1; index <= Number(amount); index++) {
      const emailIndex = await mockedSending(index);
      this.client
        .send('send.email.stats', {
          jobId: id,
          timestamp: Date.now(),
          amount,
          status: `${emailIndex} of ${amount}`,
        }).subscribe(() => console.log(`Sended ${emailIndex} of ${amount}`))
    }
  }
}
