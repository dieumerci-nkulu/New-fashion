# New Fashion - E-commerce Backend API

A comprehensive e-commerce backend system with recommendation engine for the fashion industry, built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Functionality
- **User Management**: Registration, authentication, profile management
- **Product Catalog**: CRUD operations, search, filtering, categorization
- **Shopping Cart**: Add/remove items, quantity management, session persistence
- **Order Processing**: Order creation, tracking, status updates, history
- **Recommendation Engine**: Popular products, personalized suggestions, category-based recommendations

### Security & Performance
- JWT-based authentication with bcrypt password hashing
- Request rate limiting and validation
- CORS configuration
- Comprehensive error handling
- MongoDB indexing for optimized queries

## 🛠 Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **Development**: nodemon

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/new-fashion
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-random
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

3. **Database Setup**
   
   Make sure MongoDB is running locally, or configure MongoDB Atlas connection string in your `.env` file.

4. **Start the Server**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### User Management

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Smith",
  "profile": {
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+1234567890"
  }
}
```

### Shopping Cart

#### Get Cart
```http
GET /api/users/cart
Authorization: Bearer <jwt_token>
```

#### Add to Cart
```http
POST /api/users/cart
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2,
  "size": "M",
  "color": "Blue"
}
```

### Product Management

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=men&sort=-createdAt
```

#### Get Single Product
```http
GET /api/products/:productId
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Stylish T-Shirt",
  "description": "Comfortable cotton t-shirt perfect for everyday wear",
  "price": 29.99,
  "category": "men",
  "subcategory": "t-shirts",
  "brand": "Fashion Brand",
  "sizes": [
    {"size": "S", "stock": 10},
    {"size": "M", "stock": 15},
    {"size": "L", "stock": 8}
  ],
  "images": ["https://example.com/image1.jpg"],
  "colors": [
    {"color": "Blue", "hexCode": "#0000FF"}
  ]
}
```

### Order Management

#### Create Order
```http
POST /api/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product_id_here",
      "quantity": 2,
      "size": "M",
      "color": "Blue"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "United States"
  },
  "paymentMethod": {
    "type": "credit_card"
  }
}
```

#### Get User Orders
```http
GET /api/orders?page=1&limit=10&status=delivered
Authorization: Bearer <jwt_token>
```

### Recommendations

#### Get Popular Products
```http
GET /api/recommendations/popular?limit=8&category=women
```

#### Get Personalized Recommendations
```http
GET /api/recommendations/personalized?limit=8
Authorization: Bearer <jwt_token>
```

#### Get Similar Products
```http
GET /api/recommendations/similar/:productId?limit=8
```

#### Get Category Recommendations
```http
GET /api/recommendations/category/men?limit=8&sortBy=popular
```

## 🗄 Database Schema

### User Collection
- Personal information and authentication
- Shopping cart and wishlist
- User preferences and order history
- Profile details and addresses

### Product Collection
- Product details (name, description, price)
- Categories, brands, and tags
- Stock management by size and color
- Ratings, reviews, and sales analytics
- Images and product variants

### Order Collection
- Order items and quantities
- Shipping and billing addresses
- Payment information and status
- Order tracking and delivery details
- Order history and status updates

## 🔒 Security Features

- **Password Security**: bcrypt hashing with 12 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Request Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Error Handling**: Secure error responses without sensitive data exposure

## 🎯 Recommendation Engine

### Algorithm Types

1. **Popular Products**: Based on sales volume and ratings
2. **Trending Products**: Recently popular items (last 30 days)
3. **Personalized**: Based on user's purchase history and preferences
4. **Similar Products**: Category, brand, and attribute-based matching
5. **Category-Based**: Top products within specific categories
6. **Seasonal**: Season-appropriate product suggestions

### Features
- Real-time recommendation updates
- User behavior tracking
- Purchase history analysis
- Category and brand preference learning

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalProducts": 120,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/new-fashion
JWT_SECRET=your-production-jwt-secret-key-very-long-and-random
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
```

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Get the connection string and update your `.env` file

## 🔍 Testing

### Health Check
```http
GET /api/health
```

Expected Response:
```json
{
  "success": true,
  "message": "New Fashion API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support, email support@newfashion.com or create an issue in the repository.

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MongoDB team for the robust database solution
- All contributors who help improve this project

---

**New Fashion Backend API** - Built with ❤️ for the fashion e-commerce industry