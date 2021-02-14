import {capitalizeString} from '../utils/common';
import {TYPE_TO_ARTICLE} from '../const';
import Abstract from './abstract';
import {getDatetime, getFormattedDuration, getTime} from '../utils/event';

const getOffersItemTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const getOffersListTemplate = (offers) => {
  const offerItems = offers.map((offer) => getOffersItemTemplate(offer)).join(``);

  return (
    `<ul class="event__selected-offers">
      ${offerItems}
    </ul>`
  );
};

const createEventTemplate = (event) => {
  const {
    type,
    city,
    basePrice,
    dateFrom,
    dateTo,
    offers,
  } = event;
  const typeCapitalize = capitalizeString(type);
  const eventTitle = `${typeCapitalize} ${TYPE_TO_ARTICLE[type]} ${city}`;
  const timeFrom = getTime(dateFrom);
  const timeTo = getTime(dateTo);
  const duration = getFormattedDuration(dateFrom, dateTo);
  const offersList = getOffersListTemplate(offers);
  const datetimeFrom = getDatetime(dateFrom);
  const datetimeTo = getDatetime(dateFrom);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${datetimeFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${datetimeTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${offersList}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView extends Abstract {
  constructor(event) {
    super();
    this._event = event;

    this._rollupClickHandler = this._rollupClickHandler.bind(this);
  }

  _getTemplate() {
    return createEventTemplate(this._event);
  }

  _rollupClickHandler() {
    this._callback.rollupBtnClick();
  }

  setRollupBtnClickHandler(callback) {
    this._callback.rollupBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupClickHandler);
  }
}
