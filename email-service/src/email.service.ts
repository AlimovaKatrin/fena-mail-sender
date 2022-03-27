import { Injectable } from '@nestjs/common';
import { mockedSending } from './helper';

@Injectable()
export class EmailService {
  async sendEmail(emailIndex: number) {    
    return await mockedSending(emailIndex);
  }
}
