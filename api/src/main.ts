import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice({
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
  });
  await app.startAllMicroservices();
  await app.listen(3100).then(() => {
    console.log(`API Listen to you ...`);
  });
}
bootstrap();
