import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/')
  async appPost(@Body() { amount }) {
    return this.emailService.sendEmail(amount);
  }
}
