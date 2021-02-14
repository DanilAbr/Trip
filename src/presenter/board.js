import DaysContainerView from '../view/days-container';
import {RenderPosition, SortType} from '../const';
import {render, replace} from '../utils/common';
import EventView from '../view/event';
import EventEditView from '../view/EventEdit';
import EventsListView from '../view/events-list';
import DayContainerView from '../view/day-container';
import NoEventsView from '../view/no-events';
import SortView from '../view/sort';
import {sortByDate, sortPrice, sortTime} from '../utils/event';

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._currentSortType = `default`;

    this._daysContainerComponent = new DaysContainerView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events;

    this._sourcedEvents = this._events.slice();

    if (this._events.length) {
      this._renderBoard();
    } else {
      this._renderNoEvents();
    }
  }

  _sortEvents(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    switch (sortType) {
      case SortType.PRICE:
        this._events.sort(sortPrice);
        break;
      case SortType.TIME:
        this._events.sort(sortTime);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    this._sortEvents(sortType);
    this._clearEventsList();

    if (sortType === SortType.DEFAULT) {
      this._renderDayContainers();
    } else {
      this._renderDayContainer();
    }
    this._renderEventsContainers();
    this._renderEvents();
  }

  _clearEventsList() {
    this._daysContainerComponent.getElement().innerHTML = ``;
  }

  _renderSort() {
    const sortComponent = new SortView();

    render(this._boardContainer, sortComponent, RenderPosition.BEFOREEND);
    sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoEvents() {
    render(this._boardContainer, new NoEventsView(), RenderPosition.BEFOREEND);
  }

  _getDays() {
    this._events = this._events.slice().sort(sortByDate);

    return this._events
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
      }, [[this._events[0]]]);
  }

  _renderDaysContainer() {
    render(this._boardContainer, this._daysContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderDayContainer(date, index) {
    render(this._daysContainerComponent, new DayContainerView(date, index), RenderPosition.BEFOREEND);
  }

  _renderDayContainers() {
    if (this._events.length) {
      this._days = this._getDays();
    }

    this._days.forEach((day, index) => {
      this._renderDayContainer(new Date(day[0].dateFrom), index);
    });
  }

  _renderEventsContainers() {
    const dayContainerElements =
      this._daysContainerComponent.getElement().querySelectorAll(`.day`);

    dayContainerElements.forEach((day) => {
      render(day, new EventsListView(), RenderPosition.BEFOREEND);
    });
  }

  _renderEvent(eventsList, event) {
    const eventItem = new EventView(event);
    const eventEditItem = new EventEditView();

    const replaceEventToEdit = () => replace(eventEditItem, eventItem);
    const replaceEditToEvent = () => replace(eventItem, eventEditItem);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventItem.setRollupBtnClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditItem.setRollupClickHandler(() => replaceEditToEvent());
    eventEditItem.setSaveClickHandler(() => replaceEditToEvent());

    render(eventsList, eventItem, RenderPosition.AFTERBEGIN);
  }

  _renderEvents() {
    if (this._currentSortType === SortType.DEFAULT) {
      const eventsListElements = this._daysContainerComponent.getElement().querySelectorAll(`.trip-events__list`);

      eventsListElements.forEach((eventsList, index) => {
        this._days[index].map((event) => this._renderEvent(eventsList, event));
      });
    } else {
      const eventsList = this._daysContainerComponent.getElement().querySelector(`.trip-events__list`);

      this._events.forEach((event) => this._renderEvent(eventsList, event));
    }
  }

  _renderBoard() {
    this._renderSort();
    this._renderDaysContainer();
    this._renderDayContainers();
    this._renderEventsContainers();
    this._renderEvents();
  }
}
