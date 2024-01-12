const express = require('express')
const router = express.Router()
const {createUser, loginUser, checkUser} = require('../controllers/authController')
const passport = require('passport')

router
    .post('/signup' , createUser)
    .post('/login', passport.authenticate('local') , loginUser)
    .get('/check', passport.authenticate("jwt") , checkUser)

exports.router = router