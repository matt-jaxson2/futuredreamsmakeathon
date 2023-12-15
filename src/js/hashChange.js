import { resetGridItems } from './utils.js';

export class HashChange {
  constructor() {
    this.setEvents();
  }

  setEvents() {
    document.addEventListener('gridRendered', () => {
      this.handleHashChange();
    });

    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });
  }

  handleHashChange() {
    const hash = window.location.hash;
    const id = hash.replace('#', '');
    const gridItem = document.getElementById(`${id}-target`);

    if (gridItem) {
      resetGridItems();
      this.setCurrent(gridItem);
    }
  }

  setCurrent(gridItem) {
    gridItem.click();
  }
}
