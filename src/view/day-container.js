const getCurrentDate = (dateObj) => {
  return new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }).format(new Date(dateObj));
};

const getDatetime = (dateObj) => {
  return dateObj.toISOString().slice(0, 10);
};

export const createDayContainerTemplate = (dateObj, index) => {
  const dayDate = getCurrentDate(dateObj);
  const datetime = getDatetime(dateObj);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${datetime}">${dayDate}</time>
      </div>
    </li>`
  );
};
