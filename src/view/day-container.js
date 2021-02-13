import {createElement} from '../util';

const getCurrentDate = (dateObj) => {
  return new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }).format(new Date(dateObj));
};

const getDatetime = (dateObj) => {
  return dateObj.toISOString().slice(0, 10);
};

const createDayContainerTemplate = (dateObj, index) => {
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

export default class DayContainerView {
  constructor(dateObj, index) {
    this._date = dateObj;
    this._index = index;
    this._element = null;
  }

  _getTemplate() {
    return createDayContainerTemplate(this._date, this._index);
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
