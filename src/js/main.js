import { Grid } from './grid.js';
import { Search } from './search.js';
import { Router } from './router.js';

const grid = new Grid();
grid.init();

const search = new Search();
search.init();

const customEventRoute = (eventName, data = {}) => {
  const customEvent = new CustomEvent(eventName, {
    detail: data
  });
  document.dispatchEvent(customEvent);
}

const _router = new Router({
  '': () => {
    customEventRoute('route:home');
  },
  'entry*': () => {
    customEventRoute('route:entry');
  },
  'search/*': () => {
    customEventRoute('route:search');
  },
});

window.addEventListener('beforeunload', () => {
  sessionStorage.clear();
});
