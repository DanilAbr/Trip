import {getRandomItem, getRandomItems, getRandomNumber, getRandomTimeMs} from '../utils/common';
import {
  CITIES,
  DESCRIPTION_SENTENCES,
  TYPE_TO_ARTICLE,
  MAX_PHOTOS_COUNT,
  MAX_PRICE,
  MAX_SENTENCES_COUNT,
  MIN_PHOTOS_COUNT,
  MIN_PRICE,
  MIN_SENTENCES_COUNT,
  OFFER_TYPES, MAX_OFFERS, MIN_OFFERS, MAX_PHOTOS,
} from '../const';

const getDateFrom = () => {
  const maxGapMs = 600480000;
  const minGapMs = -maxGapMs;

  return getRandomTimeMs(new Date(), minGapMs, maxGapMs);
};

const getDateTo = (date) => {
  const minGapMs = 900000;
  const maxGapMs = 172800000;

  return getRandomTimeMs(date, minGapMs, maxGapMs);
};

const getPhotos = () => {
  const photosArray = [];

  for (let i = 0; i < MAX_PHOTOS; i++) {
    photosArray.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return getRandomItems(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT, photosArray);
};

const getOffers = () => [...new Set(getRandomItems(MIN_OFFERS, MAX_OFFERS, OFFER_TYPES))];

const createEvent = () => {
  const type = getRandomItem(Object.keys(TYPE_TO_ARTICLE));
  const city = getRandomItem(CITIES);
  const offers = getOffers();
  const basePrice = getRandomNumber(MIN_PRICE, MAX_PRICE);
  const dateFrom = getDateFrom();
  const dateFromISO = dateFrom.toISOString();
  const dateTo = getDateTo(dateFrom);
  const dateToISO = dateTo.toISOString();
  const description = getRandomItems(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT, DESCRIPTION_SENTENCES);
  const photos = getPhotos();

  return {
    type,
    city,
    offers,
    basePrice,
    dateTo: dateToISO,
    dateFrom: dateFromISO,
    info: {
      description,
      photos,
    },
  };
};

export {
  createEvent,
};
