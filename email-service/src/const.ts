import { Hash } from "crypto";

export const mockedSending = (emailIndex) =>
  new Promise((res, rej) => {
    console.log('Promise pending .... ');
    setTimeout(() => res(emailIndex), 0);
  });

export interface IEmailJob {
  id: Hash;
  amount: number;
}
