import { Grid } from './grid.js';
// import { Search } from './search.js';
import { Router } from './router.js';

const grid = new Grid();
grid.init();

// const search = new Search();
// search.init();

const adminRoute = () => {
  window.location.assign('../admin/index.php');
}

const customEventRoute = (eventName, data = {}) => {
  const customEvent = new CustomEvent(eventName, {
    detail: data
  });
  document.dispatchEvent(customEvent);
}

const _router = new Router({
  '': () => {
    customEventRoute('navigation:home');
  },
  'entry*': () => {
    customEventRoute('route:entry', {
      route: window.location.hash
    });
  },
  // 'search/*': () => {
  //   customEventRoute('search:query', {
  //     route: window.location.hash
  //   });
  // },
});

window.addEventListener('beforeunload', () => {
  sessionStorage.clear();
});
