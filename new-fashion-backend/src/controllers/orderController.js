const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const order = new Order({
        userId: req.user.id,
        products: req.body.products,
        totalAmount: req.body.totalAmount,
    });

    try {
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};