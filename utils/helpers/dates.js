const isMonday = () => {
  return new Date().getDay() === 1;
};

const isWeekend = () => {
  return new Date().getDay() % 6 === 0;
};

module.exports = {
  isMonday,
  isWeekend
};