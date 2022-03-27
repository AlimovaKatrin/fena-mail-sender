import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { NotifierGateway } from './notifier.gateway';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [NotifierGateway],
})
export class AppModule {}
