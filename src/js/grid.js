import { MakeathonAPI } from './api.js';
import { Modal } from './modal.js';
import { encodeHTML, isSearch } from './utils.js';

export class Grid {
  constructor() {
    this.customRenderEvent = new CustomEvent('grid:rendered');
  }

  init() {
    this.makeathonAPI = new MakeathonAPI();
    this.modal = new Modal();

    if (!isSearch()) {
      this.setGrid();
    }

    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.elements = {
      grid: document.querySelector('.js-image-grid')
    }
  }

  setEvents() {
    document.addEventListener('grid:rendered', () => {
      const route = window.location.hash;

      if (!route.includes('entry')) return;

      const element = document.querySelector(`${route}-target`);
      this.setModalContent(element);
    });

    document.addEventListener('navigation:home', () => {
      this.modal.closeModal();
    });

    document.addEventListener('route:entry', () => {
      const element = document.querySelector(`${window.location.hash}-target`);
      if (element) {
        this.setModalContent(element);
      }
    });

    this.elements.grid.addEventListener('click', event => {
      const element = event.target;

      if (element.tagName === 'A') {
        this.setModalContent(element);
      }
    });
  }

  getRouteId() {
    return window.location.hash.replace('#entry', '');
  }

  async setModalContent(element) {
    if (!element) return;

    const { dataset: { image, message, name } } = element;
    const content = `
      <figure>
        <div class="modal__image-wrapper">
          <img src="${image}" class="modal__image" alt="Photo of ${name}'s knitted flower">
          <div class="content-loader"></div>
        </div>
        <figcaption class="modal__text">
          <p id="modalDescription" class="modal__message">${encodeHTML(message)}</p>
          <cite class="modal__cite" id="modalLabel">By ${name}</cite>
        </figcaption>
      </figure>
    `;

    this.modal.setContent(content);
    this.modal.openModal();
  }

  lazyImages(images) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const { dataset: { alt, src } } = image;

          image.src = src;
          image.alt = alt;

          imageObserver.unobserve(image);
        }
      });
    });

    images.forEach(image => imageObserver.observe(image));
  }

  async setGrid(results) {
    const data = results || await this.makeathonAPI.fetchData('entries/data.json');
    const dataLength = data.length < 50 ? 50 : data.length;
    let content = '';

    for (let i = 0; i < dataLength; i++) {
      const item = data[i];

      if (!item) {
        content += `
          <div class="image-grid__item-wrapper"><div class="image-grid__item image-grid__item--placeholder" aria-hidden="true"></div></div>
        `;
      } else {
        const { highlight, imageSmall, imageMedium, message, name, id } = item;
        const entryId = `entry${id}`;
        const highlightedClass = highlight ? ' image-grid__item--highlighted' : '';
        const image = {
          small: `https://futuredreamsmakeathon.org.uk/${imageSmall}`,
          medium: `https://futuredreamsmakeathon.org.uk/${imageMedium}`
        }

        content += `
          <div class="image-grid__item-wrapper">
            <a id="${entryId}-target" href="#${entryId}" class="image-grid__item${highlightedClass}" data-id="${entryId}" data-image="${image.medium}" data-name="${name}" data-message="${encodeHTML(message)}">
              <p class="sr-only">Read the message from ${name}</p>
              <img class="image-grid__image js-lazy-image" data-src="${image.small}" data-alt="Photo of ${name}'s knitted flower" />
            </a>
          </div>
        `;
      }
    }

    this.render(content);
  }

  renderEvent() {
    document.dispatchEvent(this.customRenderEvent);
  }

  render(content) {
    const target = document.querySelector('.js-image-grid');
    target.classList.remove('image-grid--loading');

    target.innerHTML = content;

    this.lazyImages(target.querySelectorAll('.js-lazy-image'));

    this.renderEvent();
  }
}
