export class Modal {
  constructor() {
    this.keyPress = this.keyPress.bind(this);

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

    this.defaultModalClass = this.elements.modal.className;
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

  setContent(content, identifier) {
    if (this.elements.content.innerHTML !== content) {
      this.elements.content.innerHTML = content;
      this.elements.modal.className = this.defaultModalClass;
      if (identifier) {
        this.elements.modal.classList.add(identifier);
      }
    }
  }

  keyPress(event) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  openModal() {
    this.elements.body.classList.add('modal-open');
    this.elements.closeButton.focus();

    document.addEventListener('keydown', this.keyPress);
  }

  closeModal() {
    this.elements.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.keyPress);
  }
}
