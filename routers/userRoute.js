const express = require('express')
const router = express.Router()
const {fetchUserById, updateUser} = require('../controllers/userController')

router
    .get('/:id', fetchUserById)
    .patch('/:id', updateUser)

exports.router = router