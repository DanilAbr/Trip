import Abstract from './abstract';
import {getDates, getRoute} from '../utils/trip-info';

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

export default class TripInfoView extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
