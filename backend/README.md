# OrderKing Egypt - Backend API

A robust and scalable REST API for an e-commerce platform built with Node.js, Express, and PostgreSQL 18.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (User/Admin)
- **Product Management**: Full CRUD operations with search, filtering, and soft-delete
- **Order Management**: Complete order lifecycle with inventory tracking
- **Database**: PostgreSQL 18 with optimized queries and transactions
- **Security**: Password hashing with bcrypt, input validation, and SQL injection protection
- **Modular Architecture**: Clean, maintainable code structure following best practices
- **Error Handling**: Centralized error handling with detailed error messages
- **Password Reset**: Integration with Supabase for password reset emails

## 📋 Prerequisites

- Node.js >= 16.0.0
- PostgreSQL 18
- npm >= 8.0.0

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=orderking
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   
   SUPABASE_URL=your_supabase_url (optional)
   SUPABASE_SERVICE_KEY=your_supabase_key (optional)
   ```

4. **Create PostgreSQL database**
   ```bash
   createdb orderking
   ```

5. **Initialize database schema**
   ```bash
   npm run init-db
   ```

6. **Seed sample data (optional)**
   ```bash
   npm run seed
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

#### Forgot Password
```http
POST /auth/forgotpassword
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Get Current User Profile
```http
GET /auth/me
Authorization: Bearer {token}
```

### Product Endpoints

#### Get All Products
```http
GET /products?search=phone&category=electronics&page=1&limit=10
```

**Query Parameters:**
- `search` (optional): Search in product name and description
- `category` (optional): Filter by category slug
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "id": "uuid",
      "name": "iPhone 14 Pro",
      "description": "Latest Apple smartphone",
      "price": 999.99,
      "stock_quantity": 50,
      "image_url": "https://...",
      "is_active": true,
      "category": {
        "id": "uuid",
        "name": "Electronics",
        "slug": "electronics"
      },
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category_id": "uuid",
  "stock_quantity": 100,
  "image_url": "https://...",
  "is_active": true
}
```

#### Update Product (Admin Only)
```http
PATCH /products/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock_quantity": 150
}
```

#### Delete Product (Admin Only)
```http
DELETE /products/:id
Authorization: Bearer {admin_token}
```

### Order Endpoints

#### Place New Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2
    },
    {
      "product_id": "uuid",
      "quantity": 1
    }
  ],
  "shipping_address": "123 Main St, Cairo, Egypt",
  "phone": "+20123456789",
  "notes": "Please deliver in the morning"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "total_amount": 1999.98,
    "shipping_address": "123 Main St, Cairo, Egypt",
    "phone": "+20123456789",
    "notes": "Please deliver in the morning",
    "status": "pending",
    "items": [
      {
        "id": "uuid",
        "product_id": "uuid",
        "product_name": "iPhone 14 Pro",
        "quantity": 2,
        "price": 999.99,
        "subtotal": 1999.98
      }
    ],
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Get My Orders
```http
GET /orders/my?page=1&limit=10
Authorization: Bearer {token}
```

#### Get All Orders (Admin Only)
```http
GET /orders?status=pending&page=1&limit=10
Authorization: Bearer {admin_token}
```

**Query Parameters:**
- `status` (optional): Filter by order status (pending, processing, shipped, delivered, cancelled)
- `page` (optional): Page number
- `limit` (optional): Items per page

#### Update Order Status (Admin Only)
```http
PATCH /orders/:id/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "processing"
}
```

**Valid statuses:** `pending`, `processing`, `shipped`, `delivered`, `cancelled`

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # PostgreSQL connection & query helpers
│   │   └── supabase.js          # Supabase client configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── productController.js # Product CRUD operations
│   │   └── orderController.js   # Order management
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication & authorization
│   │   └── validation.js        # Input validation middleware
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   └── orderRoutes.js       # Order endpoints
│   ├── utils/
│   │   ├── jwt.js               # JWT token utilities
│   │   └── errorHandler.js      # Error handling utilities
│   ├── database/
│   │   └── schema.sql           # Database schema
│   ├── scripts/
│   │   ├── initDb.js            # Database initialization script
│   │   └── seedData.js          # Sample data seeding script
│   └── server.js                # Application entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your_jwt_token}
```

### User Roles

- **user**: Can view products, place orders, view own orders
- **admin**: Full access to all endpoints including product management and order status updates

### Default Admin Credentials

After running `npm run init-db`, a default admin account is created:

- **Email**: `admin@orderking.com`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change this password immediately in production!

## 🗄️ Database Schema

### Tables

- **users**: User accounts with authentication
- **categories**: Product categories
- **products**: Product catalog with soft-delete support
- **orders**: Customer orders
- **order_items**: Individual items in each order
- **password_reset_tokens**: Password reset token management

### Key Features

- UUID primary keys for better security
- Timestamps (created_at, updated_at) on all tables
- Soft-delete for products (is_deleted flag)
- Foreign key constraints for data integrity
- Indexes on frequently queried columns
- Automatic timestamp updates via triggers

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get products
curl http://localhost:5000/api/products

# Get user profile (replace TOKEN)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Set up environment variables for base URL and token
3. Test each endpoint with sample data

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 5000 |
| NODE_ENV | Environment (development/production) | No | development |
| DB_HOST | PostgreSQL host | Yes | localhost |
| DB_PORT | PostgreSQL port | No | 5432 |
| DB_NAME | Database name | Yes | orderking |
| DB_USER | Database user | Yes | postgres |
| DB_PASSWORD | Database password | Yes | - |
| JWT_SECRET | Secret key for JWT | Yes | - |
| JWT_EXPIRE | JWT expiration time | No | 30d |
| SUPABASE_URL | Supabase project URL | No | - |
| SUPABASE_SERVICE_KEY | Supabase service role key | No | - |

## 🚨 Error Handling

All errors return a consistent JSON format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Role-based access control
- SQL injection protection via parameterized queries
- Input validation on all endpoints
- CORS enabled for cross-origin requests
- Environment variable protection

## 🚀 Deployment

### Production Checklist

1. ✅ Set `NODE_ENV=production`
2. ✅ Use strong `JWT_SECRET`
3. ✅ Change default admin password
4. ✅ Configure proper database credentials
5. ✅ Set up SSL/TLS for database connection
6. ✅ Enable rate limiting
7. ✅ Set up monitoring and logging
8. ✅ Configure CORS for specific origins
9. ✅ Use environment-specific configuration

### Recommended Hosting

- **API**: Heroku, Railway, Render, DigitalOcean
- **Database**: Supabase, Railway, Heroku Postgres, AWS RDS

## 📞 Support

For issues or questions, please contact the development team.

## 📄 License

ISC License - OrderKing Egypt

---

**Built with ❤️ in Cairo, Egypt**
