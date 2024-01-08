import { Grid } from './grid.js';
import { Search } from './search.js';
import { Router } from './router.js';

const grid = new Grid();
grid.init();

const search = new Search();
search.init();

const _router = new Router({
  '': () => {
    const navigationHome = new CustomEvent('navigation:home');
    document.dispatchEvent(navigationHome);
  },
  'entry*': () => {
    let routeEntry = new CustomEvent('route:entry', {
      detail: {
        route: window.location.hash
      }
    });
    document.dispatchEvent(routeEntry);
  },
  'search/*': () => {
    const searchQuery = new CustomEvent('search:query', {
      detail: {
        route: window.location.hash
      }
    });
    document.dispatchEvent(searchQuery);
  }
});
