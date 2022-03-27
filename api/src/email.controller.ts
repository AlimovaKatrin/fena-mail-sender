import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { NotifierGateway } from './notifier.gateway';

@Controller('email')
export class EmailController {
  constructor(private readonly socketGetaway: NotifierGateway) {}
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'email-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('send.new.email');

    await this.client.connect();
  }

  @Post('/')
  async appPost(@Body() { amount }) {
    const id = Math.floor(Math.random() * (1 - 10000) + 10000);
    for (let index = 1; index <= Number(amount); index++) {
      this.client.send('send.new.email', index).subscribe(val => {        
        this.socketGetaway.handleMessage({
          jobId: id,
          timestamp: Date.now(),
          amount,
          status: `${val} of ${amount}`,
        });
      });
    }
    return id;
  }
}
