const express = require('express');
const { body } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addProductReview
} = require('../controllers/productController');

const router = express.Router();

// Product validation middleware
const productValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters')
    .trim(),
  body('description')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters')
    .trim(),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['men', 'women', 'children', 'accessories', 'shoes', 'bags'])
    .withMessage('Invalid category'),
  body('subcategory')
    .notEmpty()
    .withMessage('Subcategory is required')
    .trim(),
  body('brand')
    .isLength({ min: 1, max: 50 })
    .withMessage('Brand must be between 1 and 50 characters')
    .trim(),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image URL is required'),
  body('sizes')
    .isArray({ min: 1 })
    .withMessage('At least one size option is required')
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
    .trim()
];

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', authenticate, reviewValidation, addProductReview);

// Admin only routes
router.post('/', authenticate, authorize('admin'), productValidation, createProduct);
router.put('/:id', authenticate, authorize('admin'), updateProduct);
router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

module.exports = router;