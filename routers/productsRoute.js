const express = require('express')
const router = express.Router()
const {createProduct, fetchAllProducts, fetchProductById, updateProduct} = require('../controllers/productController')

router
    .post('/' , createProduct)
    .get('/' , fetchAllProducts)
    .get('/:id', fetchProductById)
    .patch('/:id', updateProduct)

exports.router = router