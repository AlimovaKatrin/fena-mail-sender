import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}
  
  @MessagePattern('send.new.email')
  sendEmail(emailIndex) {
    return this.emailService.sendEmail(emailIndex);
  }
}
