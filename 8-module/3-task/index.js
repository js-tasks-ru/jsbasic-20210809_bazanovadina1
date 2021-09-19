export default class Cart {
	cartItems = []; // [product: {...}, count: N]
    
	constructor(cartIcon) {
		this.cartIcon = cartIcon;
	}

	addProduct(product) {
		if (product) {
			let result
			if (result = this.cartItems.find ( item => item.product === product)) {
				result.count++
			} else {
				this.cartItems.push({product,count: 1})
			}
		}
		this.cartIcon.update(this)
	}

	updateProductCount(productId, amount) {
		this.cartItems.find( item => item.product["id"] === `${productId}`).count += amount
		
		this.cartItems.forEach( (item, index, arr) => {
			if (item.count === 0) {
				arr.splice(index, 1)
			}
		})
		
		this.cartIcon.update(this)
		this.onProductUpdate(this.cartItems)   
	}

	isEmpty() {
		if (this.cartItems.length === 0) {
			return true
		} else { return false }
	}

	getTotalCount() {
		let totalCount = 0
		this.cartItems.map ( item => totalCount += item.count)
		return totalCount
	}

	getTotalPrice() {
		let totalPrice = 0
		this.cartItems.map ( item => totalPrice += item.count * item.product["price"])
		return totalPrice
	}

	onProductUpdate(cartItem) {
		// реализуем в следующей задаче
		this.cartIcon.update(this);
	}
}

