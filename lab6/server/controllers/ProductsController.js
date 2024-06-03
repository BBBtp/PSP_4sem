const ProductsService = require('../services/ProductsService');

const INTERNAL_SERVER_ERROR = 500
const STATUS_NOT_FOUND = 404
const STATUS_OK = 200
const STATUS_CONFLICT = 409
const STATUS_BAD_REQUEST = 400

class ProductsController {
    async getProducts(req, res) {
        let requestLog = 'GET api/products/'
        if (req.params.id) {
            requestLog += req.params.id
            const product = req.products.find((p) => p.id === parseInt(req.params.id));
            if (product) {
                console.log(`${requestLog} => ${STATUS_OK}`)
                return res.status(STATUS_OK).send({
                    data: product,
                });
            }
            console.log(`${requestLog} => ${STATUS_NOT_FOUND}`)
            return res.status(STATUS_NOT_FOUND).send({
                message: 'Product not found.'
            });
        } else if (!req.products) {
            console.log(`${requestLog} => ${STATUS_NOT_FOUND}`)
            return res.status(STATUS_NOT_FOUND).send({
                message: 'Products not found.'
            });
        }
        console.log(`${requestLog} => ${STATUS_OK}`)
        return res.status(STATUS_OK).send({
            data: req.products
        });
    }

    async createProduct(req, res) {
        let requestLog = 'POST api/products/'
        if (req.body) {
            const newProduct = Object.assign({id: req.maxId + 1}, req.body)

            req.products.push(newProduct);

            let result = await ProductsService.createProduct(
                req.products
            );

            if (result) {
                console.log(`${requestLog} => ${STATUS_OK}`)
                return res.status(STATUS_OK).send(result);
            } else {
                console.log(`${requestLog} => ${INTERNAL_SERVER_ERROR}`)
                return res.status(INTERNAL_SERVER_ERROR).send({
                    message: 'Unable create product.',
                });
            }
        } else {
            console.log(`${requestLog} => ${STATUS_BAD_REQUEST}`)
            return res.status(STATUS_BAD_REQUEST).send({
                message: 'Bad request.'
            });
        }
    }

    async deleteProduct(req, res) {
        let requestLog = 'DELETE api/products/'
        if (req.params.id) {
            requestLog += req.params.id
            const index = req.products.findIndex((p) => p.id === parseInt(req.params.id))
            if (index >= 0) {
                delete req.products[index]
                const products = req.products.filter(n => n)
                console.log(products)

                let result = await ProductsService.deleteProduct(
                    products
                );

                if (result) {
                    console.log(`${requestLog} => ${STATUS_OK}`)
                    return res.status(STATUS_OK).send(result);
                }
                else {
                    console.log(`${requestLog} => ${INTERNAL_SERVER_ERROR}`)
                    return res.status(INTERNAL_SERVER_ERROR).send({
                        message: 'Unable delete product.',
                    });
                }
            } else {
                console.log(`${requestLog} => ${STATUS_NOT_FOUND}`)
                return res.status(STATUS_NOT_FOUND).send({
                    message: 'Product not found.'
                });
            }
        } else {
            console.log(`${requestLog} => ${STATUS_BAD_REQUEST}`)
            return res.status(STATUS_BAD_REQUEST).send({
                message: 'Bad request.'
            });
        }
    }
}

module.exports = new ProductsController();