export const mockedSending = (emailIndex) =>
  new Promise((res, rej) => {
    console.log('Promise pending .... ');
    setTimeout(() => res(emailIndex), 1000);
  });

export interface IEmailJob {
  id: number;
  amount: number;
}
export interface IEmailStats {
  jobId: number,
  timestamp: Date,
  amount: number,
  status: string,
}