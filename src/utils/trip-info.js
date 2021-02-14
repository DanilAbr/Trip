import {getLastItem} from './common';
import {sortByDate} from './event';

const getFormattedDate = (date) => {
  return new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }).format(new Date(date));
};

const getDates = (events) => {
  const sortedEvents = events.slice().sort(sortByDate);
  const firstDate = new Date(sortedEvents[0].dateFrom);
  const firstDateMonth = firstDate.getMonth();

  const formattedFirstDate = getFormattedDate(firstDate);

  if (sortedEvents.length === 1) {
    return `${formattedFirstDate}`;
  }

  const lastDate = new Date(getLastItem(sortedEvents).dateFrom);
  const secondDateMonth = lastDate.getMonth();

  const formattedLastDate = firstDateMonth === secondDateMonth
    ? getFormattedDate(lastDate).slice(-2)
    : getFormattedDate(lastDate);

  return `${formattedFirstDate}&nbsp;&mdash;&nbsp;${formattedLastDate}`;
};

const getRoute = (events) => {
  let cities = [];
  events.map((event) => cities.push(event.city));
  cities = [...new Set(cities)];

  const firstCity = cities[0];
  const secondCity = cities[1];
  const lastCity = getLastItem(cities);

  if (cities.length === 1) {
    return `${firstCity}`;
  }

  if (cities.length === 2) {
    return `${firstCity} &mdash; ${secondCity}`;
  }

  if (cities.length === 3) {
    return `${firstCity} &mdash; ${secondCity} &mdash; ${lastCity}`;
  }

  if (cities.length > 3) {
    return `${firstCity} &mdash; ... &mdash; ${lastCity}`;
  }

  return ``;
};

export {
  getDates,
  getFormattedDate,
  getRoute,
};
