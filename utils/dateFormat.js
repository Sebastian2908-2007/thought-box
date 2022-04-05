const dayjs = require ('dayjs');
const today = dayjs();

const dateFormat = () => {
  return today.format("dddd, MMMM D YYYY h:mm a");
};



module.exports = dateFormat;