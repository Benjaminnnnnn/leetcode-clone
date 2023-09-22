export const sleep = (time: number) =>
  new Promise((res, rej) => {
    setTimeout(res, time);
  });
