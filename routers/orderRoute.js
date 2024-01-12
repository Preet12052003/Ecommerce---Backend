const express = require('express')
const router = express.Router()
const {createOrder, fetchOrderByUser, deleteOrder, updateOrder} = require('../controllers/orderController')

router
    .post('/' , createOrder)
    .get('/' , fetchOrderByUser)
    .delete('/:id', deleteOrder)
    .patch('/:id', updateOrder)

exports.router = router