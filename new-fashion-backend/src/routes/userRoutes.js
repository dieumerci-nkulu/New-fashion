const express = require('express');
const { register, login } = require('../controllers/userController');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { getRecommendations } = require('../controllers/recommendationController');
const auth = require('../middleware/auth');

const router = express.Router();

// User Routes
router.post('/register', register);
router.post('/login', login);

// Product Routes
router.get('/products', getAllProducts);
router.post('/products', auth, createProduct);
router.put('/products/:id', auth, updateProduct);
router.delete('/products/:id', auth, deleteProduct);

// Order Routes
router.post('/orders', auth, createOrder);
router.get('/orders', auth, getUserOrders);

// Recommendation Routes
router.get('/recommendations', getRecommendations);

module.exports = router;