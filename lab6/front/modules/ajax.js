class Ajax {
    fetchProductList = async (url) => {
        try {
            return await fetch(url);
        } catch (error) {
            console.error('There was a problem with fetching the product list:', error);
        }
    }

    fetchProductById = async (url) => {
        try {
            return await fetch(url);
        } catch (error) {
            console.error(`There was a problem with fetching product:`, error);
        }
    }

    createProduct = async (url, productData) => {
        try {
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
        } catch (error) {
            console.error('There was a problem with creating the product:', error);
        }
    }

    deleteProductById = async (url) => {
        try {
            return await fetch(url, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(`There was a problem with deleting product with id ${id}:`, error);
        }
    }
}

export const ajax = new Ajax();