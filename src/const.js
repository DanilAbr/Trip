const EVENTS_COUNT = 22;
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const TYPE_TO_ARTICLE = {
  'taxi': `to`,
  'bus': `to`,
  'flight': `to`,
  'train': `to`,
  'ship': `to`,
  'transport': `to`,
  'drive': `to`,
  'restaurant': `to`,
  'check-in': `in`,
  'sightseeing': `in`,
};
const CITIES = [`New York`, `Mexico`, `Moscow`, `Cheboksary`, `Kazan`];
const OFFER_TYPES = [
  {name: `Order Uber`, price: `20`},
  {name: `Add luggage`, price: `50`},
  {name: `Switch to comport`, price: `80`},
  {name: `Rent a car`, price: `200`},
  {name: `Add breakfast`, price: `50`},
];

const DESCRIPTION_SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const MIN_SENTENCES_COUNT = 1;
const MAX_SENTENCES_COUNT = 5;
const MIN_PHOTOS_COUNT = 1;
const MAX_PHOTOS_COUNT = 3;
const MIN_PRICE = 10;
const MAX_PRICE = 1100;
const MIN_OFFERS = 0;
const MAX_OFFERS = 3;
const MAX_PHOTOS = 3;

export {
  RenderPosition,
  EVENTS_COUNT,
  TYPE_TO_ARTICLE,
  CITIES,
  OFFER_TYPES,
  DESCRIPTION_SENTENCES,
  MAX_SENTENCES_COUNT,
  MIN_SENTENCES_COUNT,
  MAX_PHOTOS_COUNT,
  MIN_PHOTOS_COUNT,
  MIN_PRICE,
  MAX_PRICE,
  MAX_OFFERS,
  MIN_OFFERS,
  MAX_PHOTOS,
};
