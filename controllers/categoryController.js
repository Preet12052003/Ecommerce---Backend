const {Category} = require('../models/Category')

exports.fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).exec()
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json(error)
    }
}

// THIS WILL BE USED BY ADMIN
exports.createCategory = async (req,res) => {
    const cat = new Category(req.body)
    try {
        const doc = await cat.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}