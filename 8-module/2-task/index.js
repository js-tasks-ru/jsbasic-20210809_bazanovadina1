import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
	constructor(products) {
		this.products = products // полный спиток товаров. this.selectedProducts - текущий список товаров
		this.filters = {}
		this.currentFilters = {}
		this.setSelectedProducts(products)
		this.renderElem()
		this.renderProductsCard()
	}

	renderElem() {
		this.elem = createElement(`
			<div class="products-grid">
				<div class="products-grid__inner">
					<!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
				</div>
			</div>
		`)
		this.productsGridInner = this.elem.querySelector('.products-grid__inner')
	}
	renderProductsCard() {
		
		this.productsGridInner.innerHTML = this.selectedProducts.map(item => {
			return `
				<div class="card">
					<div class="card__top">
						<img src="/assets/images/products/${item.image}" class="card__image" alt="product">
						<span class="card__price">€${item.price.toFixed(2)}</span>
					</div>
					<div class="card__body">
						<div class="card__title">${item.name}</div>
						<button type="button" class="card__button">
							<img src="/assets/images/icons/plus-icon.svg" alt="icon">
						</button>
					</div>
				</div>
			`})
			.join('')	
	}
	
	setSelectedProducts(value) {
		return this.selectedProducts = value
	}

	updateFilter(filters) {
		this.setSelectedProducts(this.products)

		Object.assign(this.currentFilters,filters)
		
		if (this.currentFilters.noNuts === true) {
			this.selectedProducts = this.selectedProducts.filter( item => {
				if (["nuts"] in item == false || item["nuts"] == false) {
					return item
				}
			})
		
		}
		
		if (this.currentFilters.vegeterianOnly === true) {
			this.selectedProducts = this.selectedProducts.filter( item => {
				if (item["vegeterian"] === true) {
					return item
				}
			})		
		}

		if (this.currentFilters.maxSpiciness >= 0) {
			this.selectedProducts = this.selectedProducts.filter( item => {
				if (item.spiciness <= this.currentFilters.maxSpiciness) {
					return item	
				}
			})
		}

		if (this.currentFilters.category) {
			this.selectedProducts = this.selectedProducts.filter( item => {
				if (item.category === this.currentFilters.category) {
					return item	
				}
			
			})	
		}
		
		this.renderProductsCard()
	}
}
