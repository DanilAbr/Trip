import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createButtonAddEventTemplate} from './view/button-add-event';
import {createSortTemplate} from './view/sort';
import {createDaysContainerTemplate} from './view/days-container';
import {createDayContainerTemplate} from './view/day-container';
import {createEventsListTemplate} from './view/events-list';
import {createEventItemTemplate} from './view/event-item';
import {render} from './util';
import {EVENTS_COUNT} from './const';

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const switchViewTitleElement = tripControlsElement.querySelector(`.trip-controls h2:first-child`);

render(switchViewTitleElement, createMenuTemplate(), `afterend`);

const filtersTitleElement = tripControlsElement.querySelector(`.trip-controls h2:last-child`);

render(filtersTitleElement, createFiltersTemplate(), `afterend`);
render(tripMainElement, createButtonAddEventTemplate(), `beforeend`);

const mainElement = document.querySelector(`.trip-events`);
const tripEventsTitleElement = mainElement.querySelector(`.trip-events h2`);

render(tripEventsTitleElement, createSortTemplate(), `afterend`);
render(mainElement, createDaysContainerTemplate(), `beforeend`);

const daysContainerElement = mainElement.querySelector(`.trip-days`);

render(daysContainerElement, createDayContainerTemplate(), `afterbegin`);

const dayContainerElement = daysContainerElement.querySelector(`.day`);

render(dayContainerElement, createEventsListTemplate(), `beforeend`);

const eventsListElement = dayContainerElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsListElement, createEventItemTemplate(), `afterbegin`);
}
