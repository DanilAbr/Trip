import {createElement} from '../util';

const createDaysContainerTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysContainerView {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createDaysContainerTemplate();
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
