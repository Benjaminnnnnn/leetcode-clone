/**
 *
 * @param time sleep for {time} miliseconds
 * @returns
 */
export const sleep = (time: number) =>
  new Promise((res, rej) => {
    setTimeout(res, time);
  });
