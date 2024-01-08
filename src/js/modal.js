export class Modal {
  constructor() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.elements = {
      body: document.querySelector('body'),
      modal: document.querySelector('.js-modal'),
      content: document.querySelector('.js-modal__content'),
      closeButton: document.querySelector('.js-modal__close')
    }
  }

  setEvents() {
    document.addEventListener('mouseup', event => {
      if (
        !this.elements.modal.contains(event.target) &&
        !event.target.className.includes('image-grid__item')) {
        this.closeModal();
      }
    });

    this.elements.closeButton.addEventListener('click', event => {
      event.preventDefault();
      this.closeModal();
    });
  }

  setContent(content) {
    if (this.elements.content.innerHTML !== content) {
      this.elements.content.innerHTML = content;
    }
  }

  openModal() {
    this.elements.body.classList.add('modal-open');
    this.elements.modal.setAttribute('aria-hidden', false);
    this.elements.closeButton.focus();
  }

  closeModal() {
    this.elements.body.classList.remove('modal-open');
    this.elements.modal.setAttribute('aria-hidden', true);
  }
}
