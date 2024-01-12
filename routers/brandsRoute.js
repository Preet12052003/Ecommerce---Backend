const express = require('express')
const router = express.Router()
const {fetchBrands, createBrand} = require('../controllers/brandController')

router
    .get('/' , fetchBrands)
    .post('/' , createBrand)

exports.router = router