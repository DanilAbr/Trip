const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (items) => items[getRandomNumber(0, items.length - 1)];
const capitalizeString = (string) => string[0].toUpperCase() + string.slice(1);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const getRandomItems = (minItems, maxItems, items) => {
  const itemsCount = getRandomNumber(minItems, maxItems);
  const randomItems = [];

  for (let i = 0; i < itemsCount; i++) {
    randomItems.push(getRandomItem(items));
  }

  return randomItems;
};

const getRandomTimeMs = (date, minGap, maxGap) => {
  const gap = getRandomNumber(minGap, maxGap);
  date.setTime(date.getTime() + gap);

  return new Date(date);
};

const getLastItem = (items) => items[items.length - 1];

export {
  render,
  getRandomItem,
  getRandomNumber,
  capitalizeString,
  getRandomItems,
  getRandomTimeMs,
  getLastItem,
};
