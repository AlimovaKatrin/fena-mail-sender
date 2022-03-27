export const mockedSending = (emailIndex) =>
  new Promise((res, rej) => {
    console.log('Promise pending .... ');
    setTimeout(() => res(emailIndex), 2000);
  });
