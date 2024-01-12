// this will hold the logic neededduring the login or signup (authentication in checkuser -> frontend)
const { User } = require('../models/User')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { sanitizeUser } = require('../services/common')

const SECRET_KEY = 'SECRET_KEY'

exports.createUser = (req,res) => {
    // const user = new User(req.body)
    try {
        const salt = crypto.randomBytes(16)
        crypto.pbkdf2(req.body.password , salt , 310000 , 32 , 'sha256' , async function(err , hashedPassword){
            const user = new User({...req.body , password: hashedPassword , salt})
            const doc = await user.save()
            req.login(sanitizeUser(doc) , (err) => {
                // this also calls serializer and adds a session
                if(err){ res.status(400).json(err)}
                else{
                    const token = jwt.sign(sanitizeUser(doc) , SECRET_KEY)
                    res.status(201).json(token);
                }
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.loginUser = async (req, res) => {
    res.status(200).json(req.user)
}

exports.checkUser = (req , res) => {
    res.json({status: 'success' , user: req.user})
}