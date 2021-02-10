import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createButtonAddEventTemplate} from './view/button-add-event';
import {createSortTemplate} from './view/sort';
import {createDaysContainerTemplate} from './view/days-container';
import {createDayContainerTemplate} from './view/day-container';
import {createEventsListTemplate} from './view/events-list';
import {createEventItemTemplate} from './view/event';
import {render} from './util';
import {EVENTS_COUNT} from './const';
import {createTripPoint} from './mock/mock';

const allEvents = new Array(EVENTS_COUNT).fill(``).map(createTripPoint);

const sortedEvents = allEvents.slice().sort((a, b) => {
  return new Date(a.dateFrom) - new Date(b.dateFrom);
});

const getDays = (events) => {
  return events
    .slice(1)
    .reduce((days, currentEvent) => {
      const currentEventDate = new Date(currentEvent.dateFrom).getDate();
      const currentDay = days[days.length - 1];
      const lastEvent = currentDay[0];
      const lastEventDate = new Date(lastEvent.dateFrom).getDate();

      if (currentEventDate === lastEventDate) {
        currentDay.push(currentEvent);
      } else {
        days.push([currentEvent]);
      }

      return days;
    }, [[events[0]]]);
};


const tripMainElement = document.querySelector(`.trip-main`);

if (allEvents.length) {
  render(tripMainElement, createTripInfoTemplate(sortedEvents), `afterbegin`);
}

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

let days = [];
if (allEvents.length) {
  days = getDays(sortedEvents);
}


days.forEach((day, index) => {
  if (day.length) {
    const dateObj = new Date(day[0].dateFrom);
    render(daysContainerElement, createDayContainerTemplate(dateObj, index), `beforeend`);
  }
});

const dayContainerElements = daysContainerElement.querySelectorAll(`.day`);

dayContainerElements.forEach((day) => {
  render(day, createEventsListTemplate(), `beforeend`);
});


const eventsListElements = daysContainerElement.querySelectorAll(`.trip-events__list`);

eventsListElements.forEach((eventsList, index) => {
  days[index].map((event) => {
    render(eventsList, createEventItemTemplate(event), `afterbegin`);
  });
});
