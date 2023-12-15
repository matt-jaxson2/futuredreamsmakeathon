import { MakeathonAPI } from './api.js';
import { encodeHTML } from './utils.js';

export class Grid {
  constructor() {
    this.makeathonAPI = new MakeathonAPI();
    this.customRenderEvent = new CustomEvent('gridRendered');
    this.setGrid();
  }

  getData() {
    return this.makeathonAPI.fetchData();
  }

  async setGrid() {
    let content = '';
    const data = await this.getData();
    const dataLength = data.length < 50 ? 50 : data.length;

    for (let i = 0; i < dataLength; i++) {
      const item = data[i];

      if (!item) {
        content += `
          <div class="image-grid__item-wrapper"><div class="image-grid__item image-grid__item--placeholder" aria-hidden="true"></div></div>
        `;
      } else {
        const { highlight, image_small, image_medium, message, name, id } = item;
        const highlightedClass = highlight ? ' image-grid__item--highlighted' : '';
        const encodedMessage = encodeHTML(message);

        content += `
          <div class="image-grid__item-wrapper">
            <a id="${id}-target" href="#${id}" class="image-grid__item${highlightedClass}" data-id="${id}" data-image="${image_medium}" data-name="${name}" data-message="${encodedMessage}">
              <p class="sr-only">See a larger image and read the message from ${name}</p>
              <img
                class="image-grid__image"
                loading="lazy"
                src="${image_small}"
                alt="Photo of ${name}'s knitted flower"
                onload="this.className = 'image-grid__image image-loaded'"
                onerror="this.className = 'image-grid__image hidden'">
              <div class="image-grid__loader"></div>
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

    this.renderEvent();
  }
}
