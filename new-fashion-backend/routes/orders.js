const express = require('express');
const { body } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders
} = require('../controllers/orderController');

const router = express.Router();

// Order validation middleware
const orderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  body('items.*.size')
    .notEmpty()
    .withMessage('Size is required'),
  body('shippingAddress.firstName')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must not exceed 50 characters')
    .trim(),
  body('shippingAddress.lastName')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must not exceed 50 characters')
    .trim(),
  body('shippingAddress.email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('shippingAddress.phone')
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street address is required')
    .trim(),
  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required')
    .trim(),
  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required')
    .trim(),
  body('shippingAddress.zipCode')
    .isPostalCode('any')
    .withMessage('Valid zip code is required'),
  body('paymentMethod.type')
    .isIn(['credit_card', 'debit_card', 'paypal', 'apple_pay', 'google_pay'])
    .withMessage('Invalid payment method')
];

const statusUpdateValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid order status'),
  body('trackingNumber')
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage('Tracking number must be between 5 and 50 characters'),
  body('estimatedDelivery')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format for estimated delivery')
];

// Protected routes - all routes require authentication
router.use(authenticate);

// User routes
router.post('/', orderValidation, createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/admin/all', authorize('admin'), getAllOrders);
router.put('/:id/status', authorize('admin'), statusUpdateValidation, updateOrderStatus);

module.exports = router;