function formatDate(date) {
  let month = `${(new Date(date).getMonth() + 1)}`;
  let day = `${new Date(date).getDate()}`;
  const year = `${new Date(date).getFullYear()}`;

  if (month.length < 2)
    month = '0'.concat(month);
  if (day.length < 2)
    day = '0'.concat(day);

  return [year, month, day].join('-');
}

module.exports = {
  formatDate
}