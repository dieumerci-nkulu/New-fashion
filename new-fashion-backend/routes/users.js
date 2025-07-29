const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart
} = require('../controllers/userController');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .trim(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const cartValidation = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  body('size')
    .optional()
    .notEmpty()
    .withMessage('Size cannot be empty'),
  body('color')
    .optional()
    .notEmpty()
    .withMessage('Color cannot be empty')
];

// Public routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Cart routes
router.get('/cart', getCart);
router.post('/cart', cartValidation, addToCart);
router.put('/cart/:itemId', updateCartItem);
router.delete('/cart/:itemId', removeFromCart);
router.delete('/cart', clearCart);

module.exports = router;