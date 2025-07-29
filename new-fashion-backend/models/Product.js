const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['men', 'women', 'children', 'accessories', 'shoes', 'bags'],
      message: 'Category must be one of: men, women, children, accessories, shoes, bags'
    }
  },
  subcategory: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  sizes: [{
    size: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative']
    }
  }],
  colors: [{
    color: {
      type: String,
      required: true
    },
    hexCode: String,
    images: [String]
  }],
  images: {
    type: [String],
    required: [true, 'At least one product image is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one image URL is required'
    }
  },
  tags: [String],
  material: String,
  careInstructions: String,
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  saleStartDate: Date,
  saleEndDate: Date,
  totalStock: {
    type: Number,
    default: 0
  },
  soldCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ soldCount: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Calculate total stock before saving
productSchema.pre('save', function(next) {
  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((total, size) => total + size.stock, 0);
  }
  next();
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for availability status
productSchema.virtual('isAvailable').get(function() {
  return this.isActive && this.totalStock > 0;
});

// Ensure virtuals are included when converting to JSON
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);