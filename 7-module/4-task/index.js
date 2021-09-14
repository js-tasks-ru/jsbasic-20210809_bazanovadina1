import createElement from '../../assets/lib/create-element.js'

export default class StepSlider {
	constructor({ steps, value = 0 }) {

		this.steps = steps
		this.segments = steps - 1

		this.render()
		this.addEventListeners()
		this.setValue(value)	
	}

	render() {
		this.elem = createElement(`
			<div class="slider">
				<div class="slider__thumb">
    				<span class="slider__value">${this.value}</span>
    			</div>
    			<div class="slider__progress" style="width: 0%;"></div>
				<div class="slider__steps">
					${'<span></span>'.repeat(this.steps)}
				</div> 
			</div>
		`)
	}

	setValue(value) {
		this.value = value

		let valuePercents = (value / this.segments) * 100

		this.sub('thumb').style.left = `${valuePercents}%`
		this.sub('progress').style.width = `${valuePercents}%`
		this.setValueAndClass()	
	}

	setValueAndClass() {
		this.sub('value').innerHTML = this.value

		for (let child of this.sub('steps').children) {
			child.classList.remove('slider__step-active')
		}
		this.sub('steps').children[this.value].classList.add('slider__step-active')
	}

	addEventListeners() {
		this.sub('thumb').ondragstart = () => false;
	
		this.sub('thumb').onpointerdown = this.onPointerDown;
	
		this.elem.onclick = this.onClick;
	  }

	onClick = (ev) => {
		let leftRelative = (ev.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth
		
		let approximateValue = leftRelative * this.segments
		this.setValue(Math.round(approximateValue))

		let event = new CustomEvent('slider-change', {
			detail: this.value,
			bubbles: true
		})
		this.elem.dispatchEvent(event)
	}

	onPointerDown = (event) => {
		event.preventDefault()
		this.elem.classList.add('slider_dragging');

		document.addEventListener('pointermove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp);
	}

	onPointerMove = (event) => {
		event.preventDefault()

		let leftRelative = this.calcLeftByEvent(event)

		this.sub('thumb').style.left = `${leftRelative * 100}%`
		this.sub('progress').style.width = `${leftRelative * 100}%`

		this.value = Math.round(this.segments * leftRelative)

		this.setValueAndClass()
	}

	calcLeftByEvent(event) {
		let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
	
		if (leftRelative < 0) { leftRelative = 0; }
		if (leftRelative > 1) { leftRelative = 1; }
	
		return leftRelative;
	}

	onPointerUp = () => {
		document.removeEventListener('pointermove', this.onPointerMove)
		document.removeEventListener('pointerup', this.onPointerUp)
	
		this.elem.classList.remove('slider_dragging')
	
		// stick to the final value
		this.sub('thumb').style.left = `${(this.value / this.segments) * 100}%`
		this.sub('progress').style.width = `${(this.value / this.segments) * 100}%`
	
		this.elem.dispatchEvent(
		  new CustomEvent('slider-change', {
			detail: this.value,
			bubbles: true
		  })
		)
	}

	sub(ref) {
		return this.elem.querySelector(`.slider__${ref}`);
	}


	// this.thumb.onpointerdown = function(event) {
	// 	this.thumb.style.position = 'absolute'
	// 	this.thumb.style.zIndex = 1000

	// 	let moveAt = (pageX) => {
	// 		let left = pageX - this.elem.getBoundingClientRect().left;
	// 		let leftRelative = left / this.elem.offsetWidth;

	// 		if (leftRelative <= 0) {
	// 		leftRelative = 0;
	// 		}

	// 		if (leftRelative > 1) {
	// 		leftRelative = 1;
	// 		}
	// 		let leftPercents = leftRelative * 100;
	// 		let segments = this.steps - 1;
	// 		let approximateValue = leftRelative * segments;
	// 		this.value = Math.round(approximateValue);
			
	// 		document.querySelector('.slider__value').textContent = this.value

	// 		for (let child of document.querySelector('.slider__steps').children) {
	// 			child.classList.remove('slider__step-active')
	// 		}
	// 		document.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active')
	// 		thumb.style.left = `${leftPercents}%`;
	// 		progress.style.width = `${leftPercents}%`
	// 	}

	// 	function onPointerMove(event) {
	// 		moveAt(event.pageX)	
	// 	}

	// 	document.addEventListener('pointermove', onPointerMove)
	// 	thumb.onpointerup = () => {
	// 		document.removeEventListener('pointermove', onPointerMove)
	// 		thumb.onpointerup = null
	// 	}
	// }
	// thumb.ondragstart = function() {
	// 	return false;
	// }
}
