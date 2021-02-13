import {createElement, getLastItem} from '../util';

const getFormattedDate = (date) => {
  return new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }).format(new Date(date));
};

const getDates = (events) => {
  const firstDate = new Date(events[0].dateFrom);
  const firstDateMonth = firstDate.getMonth();

  const formattedFirstDate = getFormattedDate(firstDate);

  if (events.length === 1) {
    return `${formattedFirstDate}`;
  }

  const lastDate = new Date(getLastItem(events).dateFrom);
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

const createInfoMainTemplate = (events) => {
  const dates = getDates(events);
  const route = getRoute(events);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
      <p class="trip-info__dates">${dates}</p>
    </div>`
  );
};

const createTripInfoTemplate = (events) => {
  const totalPrice = events.reduce((total, event) => total + event.basePrice, 0);
  const infoMainTemplate = events.length ? createInfoMainTemplate(events) : ``;

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${infoMainTemplate}

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
