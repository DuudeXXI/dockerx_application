export const intervalId = (func) => {
  setInterval(func, 5000);
  
  return clearInterval(intervalId);
};
