import { Grid } from './grid.js';
import { Modal } from './modal.js';
import { MakeathonAPI } from './api.js';
import { setRoute } from './utils.js';

export class Search {
  constructor() {
    this.grid = new Grid();
    this.modal = new Modal();
    this.makeathonAPI = new MakeathonAPI();
  }

  init() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.elements = {
      modalContent: document.querySelector('.js-modal__content'),
      openButton: document.querySelector('.js-open-search-button')
    }
  }

  setEvents() {
    document.addEventListener('route:search', (event) => {
      this.query = this.getQueryFromRoute(event.detail.route);
      this.openSearch();
      this.searchResults();
    });

    this.elements.openButton.addEventListener('click', event => {
      event.preventDefault();
      this.openSearch();
    });
  }

  openSearch() {
    this.setContent();
    this.modal.openModal();
  }

  async searchResults(reset) {
    this.isLoading();

    const results = await this.makeathonAPI.fetchData({
      url: 'entries/data.json',
      query: this.query
    });

    if (results.length > 0 && !reset) {
      this.isResults();
    }

    if (results.length === 0) {
      this.noResults();
      this.grid.setGrid([]);
    }

    if (results.length > 0 || reset) {
      this.grid.setGrid(results);
    }

    this.isLoaded();
  }

  getQueryFromRoute(route = window.location.hash) {
    return route.split('/')[1];
  }

  isLoading() {
    document.querySelector('.js-main-content').classList.add('content-loading');
  }

  isLoaded() {
    document.querySelector('.js-main-content').classList.remove('content-loading');
  }

  isResults() {
    this.elements.container.classList.add('search--has-results');
  }

  noResults() {
    this.elements.container.classList.remove('search--has-results');
    this.setMessage('no-results');
  }

  clearResults() {
    this.elements.container.classList.remove('search--has-results');
    this.query = '';
    setRoute();
    this.elements.searchInput.value = '';
    this.resetMessage();
    this.searchResults(true);
  }

  setMessage(messageType) {
    let message = '';

    switch (messageType) {
      case 'no-results':
        message = 'Your search came up empty.';
        break;

      case 'characters':
        message = 'Search with at least 3 characters.';
        break;

      default:
        message = 'Looks like our search got a little lost.';
    }

    this.elements.searchMessage.classList.add('search__message--show');
    this.elements.searchMessage.innerHTML = message;
  }

  resetMessage() {
    this.elements.searchMessage.classList.remove('search__message--show');
    this.elements.searchMessage.innerHTML = '';
  }

  setContent() {
    const content = `
      <form class="search js-search">
        <label for="search-input" id="modalLabel">Search for an entry</label>
        <input id="search-input" class="search__input js-search__input" type="text" aria-describedby="search-message" value="${this.query}">
        <span id="search-message" class="search__message js-search__message" aria-live="assertive"></span>
        <div class="search__buttons">
          <button class="button button--style2 search__button js-search__button">Search</button>
          <button class="button button--style3 search__clear-button js-search__clear-button">Clear results</button>
        </div>
      </form>
    `;

    this.modal.setContent(content, 'modal--search');

    this.afterRender();
  }

  setInputValue(input) {
    input.value = this.getQueryFromRoute() || '';
  }

  afterRender() {
    this.elements.container = document.querySelector('.js-search');
    this.elements.searchButton = document.querySelector('.js-search__button');
    this.elements.searchClearButton = document.querySelector('.js-search__clear-button');
    this.elements.searchInput = document.querySelector('.js-search__input');
    this.elements.searchMessage = document.querySelector('.js-search__message');

    this.setInputValue(this.elements.searchInput);

    setTimeout(() => {
      this.elements.searchInput.focus();
    }, 10);

    this.elements.searchButton.addEventListener('click', event => {
      event.preventDefault();

      this.query = this.elements.searchInput.value.trim();

      this.resetMessage();

      if (this.query.length >= 3) {
        setRoute(`search/${this.query}`);
      } else {
        this.setMessage('characters');
      }
    });

    this.elements.searchClearButton.addEventListener('click', event => {
      event.preventDefault();

      this.clearResults();
    });
  }
}
