const {Cart} = require('../models/Cart')
exports.addToCart = async (req, res) => {
    const cart = new Cart(req.body)
    try {
        const response = await cart.save()
        const result = await response.populate('product')
        // console.log(result);
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.deleteFromCart = async (req, res) => {
    // const cart = new Cart(req.body)
    const { id } = req.params;
    try {
        const response = await Cart.findByIdAndDelete(id)
        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.updateCart = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, {new: true}).populate('user').populate('product')
        console.log(cart);
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchCartByUser = async (req , res) => {
    const {user} = req.query
    try {
        const cartItems = await Cart.find({user: user}).populate('product')
        console.log('line no : 42 ', cartItems);
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}

// exports.fetchProductById = async (req, res) => {
//     const { id } = req.params
//     try {
//         const products = await Product.findById(id)
//         res.status(200).json(products)
//     } catch (err) {
//         res.status(400).json(err)
//     }
// }

// exports.updateProduct = async (req, res) => {
//     const { id } = req.params
//     try {
//         const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
//         res.status(200).json(product)
//     } catch (err) {
//         res.status(400).json(err)
//     }
// }