import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IEmailJob } from 'src/const';
import { SenderService } from './sender.service';

@Controller()
export class SenderController {
  constructor(private emailService: SenderService) {}

  @MessagePattern('send.new.email')
  sendEmail(@Payload() message : { value : IEmailJob } ) {
    const { value } = message;
    return this.emailService.sendEmail(value);
  }
}
