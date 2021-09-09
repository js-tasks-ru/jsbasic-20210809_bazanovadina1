import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('DIV')
    this.elem.className = 'carousel'
    this.arrowRight = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>`)
    this.arrowLeft = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`)
    this.elem.append(this.arrowRight)
    this.elem.append(this.arrowLeft)

    this.carouselInner = document.createElement('DIV')
    this.carouselInner.className = 'carousel__inner'
    this.elem.append(this.carouselInner)

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i] = createElement(`
        <div class="carousel__slide" data-id="${slides[i].id}">
          <img src="/assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slides[i].price.toFixed(2)}</span>
            <div class="carousel__title">${slides[i].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`)
        this.carouselInner.append(this.slides[i])
    }
    this.arrowRight.addEventListener('click', this.moveRight)
    this.arrowLeft.addEventListener('click', this.moveLeft)
    this.elem.addEventListener('click', this.hideCarouselArrow)
    this.elem.addEventListener('click', this.addInOrder)
    
    this.elem.setAttribute('data-counter',0)
    this.arrowLeft.style.display = 'none'   
  }
  moveRight = (event) => {
    this.carouselInner.style.transform = `translateX(-${this.carouselInner.offsetWidth * (++ event.target.closest('.carousel').dataset.counter)}px)` 
  }

  moveLeft = (event) => {
    this.carouselInner.style.transform = `translateX(-${this.carouselInner.offsetWidth * (-- event.target.closest('.carousel').dataset.counter)}px)`  
  }

  hideCarouselArrow = (event) => {
    if (event.target.closest('.carousel').dataset.counter != this.slides.length - 1 
      && event.target.closest('.carousel').dataset.counter != 0) {
        this.arrowRight.style.display = ''
        this.arrowLeft.style.display = ''
    } else if (event.target.closest('.carousel').dataset.counter == 0) {
      this.arrowLeft.style.display = 'none'
    } else {
      this.arrowRight.style.display = 'none'}
  }
  addInOrder = (ev) => {
    if (ev.target.closest('.carousel__button')) {
      const event = new CustomEvent("product-add", {
        detail: this.slides[ev.target.closest('.carousel').dataset.counter].id,
        bubbles: true
      })
      this.elem.dispatchEvent(event)
    }
  }
}
