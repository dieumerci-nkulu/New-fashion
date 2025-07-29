const express = require('express');
const { authenticate } = require('../middleware/auth');
const {
  getPopularProducts,
  getTrendingProducts,
  getPersonalizedRecommendations,
  getSimilarProducts,
  getCategoryRecommendations,
  getRecentlyViewedRecommendations,
  getSeasonalRecommendations
} = require('../controllers/recommendationController');

const router = express.Router();

// Public recommendation routes
router.get('/popular', getPopularProducts);
router.get('/trending', getTrendingProducts);
router.get('/similar/:productId', getSimilarProducts);
router.get('/category/:category', getCategoryRecommendations);
router.get('/recently-viewed', getRecentlyViewedRecommendations);
router.get('/seasonal', getSeasonalRecommendations);

// Protected recommendation routes
router.get('/personalized', authenticate, getPersonalizedRecommendations);

module.exports = router;