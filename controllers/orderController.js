const {Order} = require('../models/Order')

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Order.findByIdAndDelete(id)
        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.updateOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true})
        console.log(order);
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchOrderByUser = async (req , res) => {
    const {user} = req.query
    try {
        const order = await Order.find({user: user})
        console.log('line no : 43 ', order);
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.createOrder = async (req , res) => {
    const order = new Order(req.body)
    try {
        const orderItem = await order.save()
        res.status(200).json(orderItem)
    } catch (error) {
        res.status(400).json(error)
    }
}