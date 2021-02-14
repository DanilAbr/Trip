import Abstract from './abstract';

export default class NoEventsView extends Abstract {
  _getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
