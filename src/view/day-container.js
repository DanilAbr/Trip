import Abstract from './abstract';
import {getCurrentDate, getDatetime} from '../utils/day-container';

const createDayInfoTemplate = (dateObj, index) => {
  if (dateObj && index >= 0) {
    const dayDate = getCurrentDate(dateObj);
    const datetime = getDatetime(dateObj);

    return (
      `<span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="${datetime}">${dayDate}</time>`
    );
  }
  return ``;
};

const createDayContainerTemplate = (dateObj, index) => {
  const dayInfoTemplate = createDayInfoTemplate(dateObj, index);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">${dayInfoTemplate}</div>
    </li>`
  );
};

export default class DayContainerView extends Abstract {
  constructor(dateObj, index) {
    super();
    this._date = dateObj;
    this._index = index;
  }

  _getTemplate() {
    return createDayContainerTemplate(this._date, this._index);
  }
}
