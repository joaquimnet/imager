module.exports = (times, operation) => {
  if (isNaN(times)) return;
  const t = Math.abs(Math.trunc(times));
  for (let i = 0; i < t; i++) {
    operation(i);
  }
};
