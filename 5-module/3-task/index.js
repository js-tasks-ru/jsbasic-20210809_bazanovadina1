function initCarousel() {
  let carousel = document.querySelector('.carousel')
  let carouselArrow = document.querySelectorAll('.carousel__arrow')
  let arrowRight = document.querySelector('.carousel__arrow_right')
  let arrowLeft = document.querySelector('.carousel__arrow_left')

  let carouselInner = document.querySelector('.carousel__inner')
  let carouselLength = document.querySelectorAll('.carousel__slide').length

  carousel.setAttribute('data-counter',0)

  let offSet = carouselInner.offsetWidth

  function moveRight(event) {
    carouselInner.style.transform = `translateX(-${offSet * (++ event.target.closest('.carousel').dataset.counter)}px)` 
  }

  function moveLeft(event) {
    carouselInner.style.transform = `translateX(-${offSet * (-- event.target.closest('.carousel').dataset.counter)}px)`  
  }

  carouselArrow[1].style.display = 'none'

  function hideCarouselArrow (event) {
    if (event.target.closest('.carousel').dataset.counter != carouselLength - 1 
      && event.target.closest('.carousel').dataset.counter != 0) {
      carouselArrow[0].style.display = ''
      carouselArrow[1].style.display = ''
    } else if (event.target.closest('.carousel').dataset.counter == 0) {
      carouselArrow[1].style.display = 'none'
    } else {
      carouselArrow[0].style.display = 'none'}
  }

  arrowRight.addEventListener('click', moveRight)
  arrowLeft.addEventListener('click', moveLeft)
  carousel.addEventListener('click', hideCarouselArrow)
}
