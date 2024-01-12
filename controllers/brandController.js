const {Brands} = require('../models/Brand')

exports.fetchBrands = async (req, res) => {
    try {
        const brands = await Brands.find({}).exec()
        res.status(200).json(brands)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.createBrand = async (req,res) => {
    const brand = new Brands(req.body)
    try {
        const doc = await brand.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}