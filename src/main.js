import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/button-add-event';
import {render} from './utils/common';
import {EVENTS_COUNT, RenderPosition} from './const';
import {createEvent} from './mock/mock';
import BoardPresenter from './presenter/board';

const events = new Array(EVENTS_COUNT).fill().map(createEvent);

const tripHeaderElement = document.querySelector(`.trip-main`);

render(tripHeaderElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-controls`);

render(tripControlsElement, new MenuView(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FiltersView(), RenderPosition.BEFOREEND);
render(tripHeaderElement, new ButtonNewEventView(), RenderPosition.BEFOREEND);

const mainElement = document.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(mainElement);

boardPresenter.init(events);
