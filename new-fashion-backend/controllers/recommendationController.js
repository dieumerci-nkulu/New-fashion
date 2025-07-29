const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// Get popular products based on sales data
const getPopularProducts = async (req, res) => {
  try {
    const { limit = 8, category } = req.query;
    
    const filter = { isActive: true };
    if (category) filter.category = category;

    const popularProducts = await Product.find(filter)
      .sort({ soldCount: -1, 'rating.average': -1 })
      .limit(Number(limit))
      .select('name price images category brand rating soldCount');

    res.status(200).json({
      success: true,
      data: { products: popularProducts }
    });
  } catch (error) {
    console.error('Get popular products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get popular products'
    });
  }
};

// Get trending products (recently popular)
const getTrendingProducts = async (req, res) => {
  try {
    const { limit = 8, category } = req.query;
    
    // Get products that have been ordered frequently in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendingProductIds = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSold: -1, orderCount: -1 } },
      { $limit: Number(limit) }
    ]);

    const productIds = trendingProductIds.map(item => item._id);
    
    const filter = { 
      _id: { $in: productIds },
      isActive: true 
    };
    if (category) filter.category = category;

    const trendingProducts = await Product.find(filter)
      .select('name price images category brand rating soldCount');

    // Sort products by the trending order
    const sortedProducts = productIds.map(id => 
      trendingProducts.find(product => product._id.toString() === id.toString())
    ).filter(Boolean);

    res.status(200).json({
      success: true,
      data: { products: sortedProducts }
    });
  } catch (error) {
    console.error('Get trending products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trending products'
    });
  }
};

// Get personalized recommendations for user
const getPersonalizedRecommendations = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const userId = req.user._id;

    // Get user's order history
    const userOrders = await Order.find({ 
      user: userId,
      status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] }
    }).populate('items.product');

    if (userOrders.length === 0) {
      // If no order history, return popular products
      return getPopularProducts(req, res);
    }

    // Extract categories and brands from user's purchase history
    const purchasedCategories = new Set();
    const purchasedBrands = new Set();
    const purchasedProductIds = new Set();

    userOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.product) {
          purchasedCategories.add(item.product.category);
          purchasedBrands.add(item.product.brand);
          purchasedProductIds.add(item.product._id.toString());
        }
      });
    });

    // Find similar products based on categories and brands
    const recommendations = await Product.find({
      isActive: true,
      _id: { $nin: Array.from(purchasedProductIds) }, // Exclude already purchased
      $or: [
        { category: { $in: Array.from(purchasedCategories) } },
        { brand: { $in: Array.from(purchasedBrands) } }
      ]
    })
    .sort({ 'rating.average': -1, soldCount: -1 })
    .limit(Number(limit))
    .select('name price images category brand rating soldCount');

    res.status(200).json({
      success: true,
      data: { products: recommendations }
    });
  } catch (error) {
    console.error('Get personalized recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get personalized recommendations'
    });
  }
};

// Get similar products based on a specific product
const getSimilarProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const { limit = 8 } = req.query;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find similar products based on category, subcategory, and brand
    const similarProducts = await Product.find({
      isActive: true,
      _id: { $ne: productId },
      $or: [
        { category: product.category, subcategory: product.subcategory },
        { category: product.category, brand: product.brand },
        { brand: product.brand }
      ]
    })
    .sort({ 'rating.average': -1, soldCount: -1 })
    .limit(Number(limit))
    .select('name price images category brand rating soldCount');

    res.status(200).json({
      success: true,
      data: { products: similarProducts }
    });
  } catch (error) {
    console.error('Get similar products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get similar products'
    });
  }
};

// Get category-based recommendations
const getCategoryRecommendations = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 8, subcategory, sortBy = 'popular' } = req.query;

    const filter = { 
      isActive: true,
      category: category
    };
    
    if (subcategory) filter.subcategory = subcategory;

    let sortOption = {};
    switch (sortBy) {
      case 'popular':
        sortOption = { soldCount: -1, 'rating.average': -1 };
        break;
      case 'rating':
        sortOption = { 'rating.average': -1, 'rating.count': -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      default:
        sortOption = { soldCount: -1, 'rating.average': -1 };
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(Number(limit))
      .select('name price images category subcategory brand rating soldCount');

    res.status(200).json({
      success: true,
      data: { 
        products,
        category,
        subcategory: subcategory || null
      }
    });
  } catch (error) {
    console.error('Get category recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get category recommendations'
    });
  }
};

// Get recently viewed products recommendations
const getRecentlyViewedRecommendations = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    // Get products with highest view counts in the last 7 days
    const products = await Product.find({ isActive: true })
      .sort({ viewCount: -1, 'rating.average': -1 })
      .limit(Number(limit))
      .select('name price images category brand rating soldCount viewCount');

    res.status(200).json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Get recently viewed recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recently viewed recommendations'
    });
  }
};

// Get seasonal recommendations
const getSeasonalRecommendations = async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    // Determine current season based on month
    const currentMonth = new Date().getMonth() + 1;
    let seasonalTags = [];
    
    if (currentMonth >= 3 && currentMonth <= 5) {
      seasonalTags = ['spring', 'light', 'casual'];
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      seasonalTags = ['summer', 'beach', 'shorts', 'light'];
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      seasonalTags = ['fall', 'autumn', 'jacket', 'warm'];
    } else {
      seasonalTags = ['winter', 'coat', 'warm', 'heavy'];
    }

    const products = await Product.find({
      isActive: true,
      tags: { $in: seasonalTags }
    })
    .sort({ 'rating.average': -1, soldCount: -1 })
    .limit(Number(limit))
    .select('name price images category brand rating soldCount tags');

    res.status(200).json({
      success: true,
      data: { 
        products,
        season: seasonalTags[0],
        tags: seasonalTags
      }
    });
  } catch (error) {
    console.error('Get seasonal recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get seasonal recommendations'
    });
  }
};

module.exports = {
  getPopularProducts,
  getTrendingProducts,
  getPersonalizedRecommendations,
  getSimilarProducts,
  getCategoryRecommendations,
  getRecentlyViewedRecommendations,
  getSeasonalRecommendations
};