class Urls {
    constructor() {
        this.url = 'http://localhost:8000/api'
    }

    getProducts() {
        return `${this.url}/products`
    }

    getProductById(productId) {
        return `${this.url}/products/${productId}`
    }
}

export const urls = new Urls()