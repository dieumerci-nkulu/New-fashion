const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register user'
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login'
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('cart.product', 'name price images')
      .populate('wishlist', 'name price images');

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile'
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const allowedUpdates = ['name', 'profile', 'preferences'];
    const updates = {};

    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

    const user = await User.findById(req.user._id);
    
    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId && 
               item.size === size && 
               item.color === color
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({
        product: productId,
        quantity,
        size,
        color
      });
    }

    await user.save();
    await user.populate('cart.product', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: { cart: user.cart }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(item => item._id.toString() !== itemId);
    
    await user.save();
    await user.populate('cart.product', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: { cart: user.cart }
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const user = await User.findById(req.user._id);
    const item = user.cart.id(itemId);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    item.quantity = quantity;
    await user.save();
    await user.populate('cart.product', 'name price images');

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: { cart: user.cart }
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item'
    });
  }
};

// Get user cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('cart.product', 'name price images totalStock');

    res.status(200).json({
      success: true,
      data: { cart: user.cart }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get cart'
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { cart: [] });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart
};