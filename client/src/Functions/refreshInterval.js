export const intervalId = (func) => {
  setInterval(func, 5000);
  // console.log(func());
  return clearInterval(intervalId);
};
