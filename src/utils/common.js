import {RenderPosition} from '../const';
import Abstract from '../view/abstract';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (items) => items[getRandomNumber(0, items.length - 1)];
const capitalizeString = (string) => string[0].toUpperCase() + string.slice(1);

const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
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
  createElement,
  getRandomItem,
  getRandomNumber,
  capitalizeString,
  getRandomItems,
  getRandomTimeMs,
  getLastItem,
  replace
};
