import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/button-add-event';
import SortView from './view/sort';
import DaysContainerView from './view/days-container';
import DayContainerView from './view/day-container';
import EventsListView from './view/events-list';
import EventView from './view/event';
import {render} from './util';
import {EVENTS_COUNT, RenderPosition} from './const';
import {createEvent} from './mock/mock';
import NoEventsView from './view/no-events';
import EventEditView from './view/EventEdit';

const allEvents = new Array(EVENTS_COUNT).fill().map(createEvent);
const sortedEvents = allEvents.slice().sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

const tripHeaderElement = document.querySelector(`.trip-main`);

render(tripHeaderElement, new TripInfoView(sortedEvents).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-controls`);

render(tripControlsElement, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(tripHeaderElement, new ButtonNewEventView().getElement(), RenderPosition.BEFOREEND);

const mainElement = document.querySelector(`.trip-events`);

const renderBoard = (currentEvents) => {
  const daysContainer = new DaysContainerView().getElement();
  const sort = new SortView().getElement();

  render(mainElement, sort, RenderPosition.BEFOREEND);
  render(mainElement, daysContainer, RenderPosition.BEFOREEND);

  const getDays = (events) => {
    return currentEvents
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

  let days = [];
  if (allEvents.length) {
    days = getDays(sortedEvents);
  }

  days.forEach((day, index) => {
    if (day.length) {
      const dateObj = new Date(day[0].dateFrom);
      const dayContainer = new DayContainerView(dateObj, index).getElement();

      render(daysContainer, dayContainer, RenderPosition.BEFOREEND);
    }
  });

  const dayContainerElements = daysContainer.querySelectorAll(`.day`);

  dayContainerElements.forEach((day) => {
    render(day, new EventsListView().getElement(), RenderPosition.BEFOREEND);
  });

  const eventsListElements = daysContainer.querySelectorAll(`.trip-events__list`);

  const renderEvent = (eventsList, event) => {
    const eventItem = new EventView(event).getElement();
    const eventEditItem = new EventEditView().getElement();

    const replaceEventToEdit = () => {
      eventsList.replaceChild(eventEditItem, eventItem);
    };

    const replaceEditToEvent = () => {
      eventsList.replaceChild(eventItem, eventEditItem);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventItem.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditItem.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceEditToEvent();
    });

    eventEditItem.querySelector(`.event--edit`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
    });

    render(eventsList, eventItem, RenderPosition.AFTERBEGIN);
  };

  eventsListElements.forEach((eventsList, index) => {
    days[index].map((event) => {
      renderEvent(eventsList, event);
    });
  });
};

if (allEvents.length) {
  renderBoard(sortedEvents);
} else {
  render(mainElement, new NoEventsView().getElement(), RenderPosition.BEFOREEND);
}
