const getCurrentDate = (dateObj) => {
  return new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }).format(new Date(dateObj));
};

const getDatetime = (dateObj) => dateObj.toISOString().slice(0, 10);

export {
  getDatetime,
  getCurrentDate
};
