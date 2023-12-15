import { encodeHTML } from './utils.js';

export class Modal {
  constructor() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.elements = {
      body: document.querySelector('body'),
      grid: document.querySelector('.js-image-grid'),
      background: document.querySelector('.js-modal-background'),
      modal: document.querySelector('.js-modal'),
      image: document.querySelector('.js-modal__image'),
      message: document.querySelector('.js-modal__message'),
      name: document.querySelector('.js-modal__cite-name'),
      closeButton: document.querySelector('.js-modal__close')
    }
  }

  setEvents() {
    this.elements.closeButton.addEventListener('click', event => {
      event.preventDefault();

      this.toggleModalState(false);
    });

    this.elements.background.addEventListener('click', () => {
      this.toggleModalState(false);
    });

    this.elements.grid.addEventListener('click', event => {
      const element = event.target;

      if (element.tagName === 'A') {
        event.preventDefault();

        this.elements.source = element;

        window.location.hash = element.getAttribute('data-id');

        this.setModal(this.getModalData(element));
      }
    });

    // Trap focus in modal.
    const focusableElements = this.elements.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    this.elements.modal.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') {
        event.preventDefault();

        // Determine the next focusable element
        const index = Array.from(focusableElements).indexOf(document.activeElement);

        if (index === -1) {
          // If no element is focused, focus the first one
          focusableElements[0].focus();
        } else {
          // Focus the next or first element in a loop
          const nextIndex = (index + 1) % focusableElements.length;
          focusableElements[nextIndex].focus();
        }
      }
    });
  }

  setModal(data) {
    const { image, message, name } = data;

    this.resetModal();

    this.elements.modal.setAttribute('aria-label', `Image of knitted rose and message by ${name}`);
    this.elements.image.setAttribute('src', image);
    this.elements.message.innerHTML = encodeHTML(message);
    this.elements.name.innerHTML = name;

    this.toggleModalState();
  }

  resetModal() {
    this.elements.image.setAttribute('src', '');
  }

  getModalData(element) {
    return {
      image: element.getAttribute('data-image'),
      message: element.getAttribute('data-message'),
      name: element.getAttribute('data-name')
    }
  }

  toggleModalState(open = true) {
    this.elements.modal.setAttribute('aria-hidden', !open);

    if (open) {
      this.elements.closeButton.focus();
      this.elements.body.classList.add('modal-open');
    } else {
      this.elements.source.focus();
      this.elements.body.classList.remove('modal-open');
    }
  }
}
