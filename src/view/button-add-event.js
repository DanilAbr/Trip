import Abstract from './abstract';

export const createButtonNewEventTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class ButtonNewEventView extends Abstract {
  _getTemplate() {
    return createButtonNewEventTemplate();
  }
}
