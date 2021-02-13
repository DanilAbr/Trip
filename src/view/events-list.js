import {createElement} from '../util';

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsListView {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createEventsListTemplate();
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
