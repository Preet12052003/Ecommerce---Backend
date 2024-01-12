const express = require('express')
const router = express.Router()
const {fetchCategories, createCategory} = require('../controllers/categoryController')

router
    .get('/' , fetchCategories)
    .post('/' , createCategory)

exports.router = router