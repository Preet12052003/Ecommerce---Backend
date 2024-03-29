const express = require('express')
const router = express.Router()
const {addToCart, fetchCartByUser, deleteFromCart, updateCart} = require('../controllers/cartController')

router
    .post('/' , addToCart)
    .get('/' , fetchCartByUser)
    .delete('/:id', deleteFromCart)
    .patch('/:id', updateCart)

exports.router = router