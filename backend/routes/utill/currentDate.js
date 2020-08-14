// Get Current Date
const getCurrentDate = () => {
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth() + 1;
  const currDate = String(date.getDate()).padStart(2, "0");

  const formattedDate = currDate + "/" + currMonth + "/" + currYear;
  return formattedDate;
};

module.exports = getCurrentDate;
