import {capitalizeString} from '../util';
import {TYPE_TO_ARTICLE} from '../const';

const getTime = (date) => {
  return new Intl.DateTimeFormat(`ru`, {
    hour: `numeric`,
    minute: `numeric`,
  }).format(new Date(date));
};

const getDuration = (start, end) => {
  const endMs = new Date(end).getTime();
  const startMs = new Date(start).getTime();
  const durationMs = endMs - startMs;

  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(durationMs / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(durationMs / (1000 * 60)) % 60;

  return `${days ? `${days}D` : ``}
          ${hours ? `${hours}H` : ``}
          ${minutes ? `${minutes}M` : ``}`;
};

const getOffersItemTemplate = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  }).join(``);
};

const getOffersListTemplate = (offers) => {
  return (
    `<ul class="event__selected-offers">
      ${getOffersItemTemplate(offers)}
    </ul>`
  );
};

const getDatetime = (date) => new Date(date).toISOString().slice(0, 16);

export const createEventItemTemplate = (event) => {
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
  const duration = getDuration(dateFrom, dateTo);
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
