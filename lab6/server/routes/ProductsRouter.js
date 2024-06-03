const express = require('express'),
    router = express.Router(),
    productController = require('../controllers/ProductsController'),
    productsService = require('../services/ProductsService');

const internalServerError = 500

router.use(async (req, res, next) => {
    let data = await productsService.getProducts();

    if (data) {
        req.products = data;
        let maxId = 0
        for (const product of data) {
            if (product.id > maxId) {
                maxId = product.id
            }
        }
        req.maxId = maxId
        next();
    } else
        return res.status(internalServerError).send({
            message: 'Error while getting products'
        });
});

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/:id')
    .get(productController.getProducts)
    .delete(productController.deleteProduct);

module.exports = router;