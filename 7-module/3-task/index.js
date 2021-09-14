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

	sub(ref) {
		return this.elem.querySelector(`.slider__${ref}`);
	}
}
