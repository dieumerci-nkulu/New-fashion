const Product = require('../models/Product');

exports.getRecommendations = async (req, res) => {
    try {
        const popularProducts = await Product.find().sort({ stock: -1 }).limit(5);
        res.json(popularProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};