// All CRUD operations related to Products are defined here
const {Product} = require('../models/Product')
exports.createProduct = async (req, res) => {
    const product = new Product(req.body)
    try {
        const response = await product.save()
        console.log(response);
        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.fetchAllProducts = async (req , res) => {
    let query = Product.find({})
    let totalDocsQuery = Product.find({})

    if(req.query.category){
        query = query.find({ category: req.query.category })
        totalDocsQuery = totalDocsQuery.find({ category: req.query.category })
    }
    if(req.query.brand){
        query = query.find({ brand: req.query.brand })
        totalDocsQuery = totalDocsQuery.find({ brand: req.query.brand })
    }
    if(req.query._sort && req.query._order){
        query = query.sort({ [req.query._sort ]: req.query._order })
        // totalDocsQuery = totalDocsQuery.sort({ [req.query._sort ]: req.query._order })
    }
    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit
        const page = req.query._page
        query = query.skip(pageSize * (page - 1))
        // totalDocsQuery = totalDocsQuery.skip(pageSize * (page - 1))
    }

    // TODO : IMPLEMENT THE X-TOTAL-COUNT HEADERS.
    
    try {
        const totalDocs = await totalDocsQuery.count().exec()
        const response = await query.exec()
        console.log(response);
        res.set('X-Total-Count', totalDocs)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.fetchProductById = async (req, res) => {
    const { id } = req.params
    try {
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err)
    }
}