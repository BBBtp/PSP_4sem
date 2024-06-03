const express = require('express'),
    router = express.Router(),
    productsRoutes = require('./ProductsRouter');

router.use('/products', productsRoutes);

module.exports = router;