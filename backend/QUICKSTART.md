# 🚀 Quick Start Guide - OrderKing Backend API

Get your OrderKing backend API up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
PORT=5000
NODE_ENV=development

# Update these with your PostgreSQL credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderking
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE

# Generate a secure JWT secret (or use this for development)
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d
```

## Step 3: Create Database

Make sure PostgreSQL is running, then create the database:

```bash
# Using psql
psql -U postgres -c "CREATE DATABASE orderking;"

# Or using createdb
createdb orderking
```

## Step 4: Initialize Database Schema

```bash
npm run init-db
```

This will:
- Create all necessary tables (users, products, orders, etc.)
- Set up indexes and constraints
- Create a default admin user

**Default Admin Credentials:**
- Email: `admin@orderking.com`
- Password: `admin123`

## Step 5: Seed Sample Data (Optional)

```bash
npm run seed
```

This adds 10 sample products across different categories.

## Step 6: Start the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be running at: **http://localhost:5000**

## ✅ Verify Installation

Test the health endpoint:

```bash
curl http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "OrderKing API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Test the API

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

### 3. Get Products

```bash
curl http://localhost:5000/api/products
```

### 4. Get Your Profile

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Place an Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "items": [
      {
        "product_id": "PRODUCT_ID_HERE",
        "quantity": 2
      }
    ],
    "shipping_address": "123 Main St, Cairo, Egypt",
    "phone": "+20123456789"
  }'
```

## 📋 Available API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgotpassword` - Request password reset
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - List all products (with search & filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PATCH /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Place order (authenticated)
- `GET /api/orders/my` - Get my orders (authenticated)
- `GET /api/orders` - Get all orders (admin only)
- `PATCH /api/orders/:id/status` - Update order status (admin only)

## 🔐 Admin Access

To test admin features, login with the default admin account:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@orderking.com",
    "password": "admin123"
  }'
```

Use the returned token to access admin endpoints like creating products or viewing all orders.

## 🛠️ Useful Commands

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Initialize database (creates tables)
npm run init-db

# Seed sample data
npm run seed

# Full setup (init + seed)
npm run setup
```

## 🐛 Troubleshooting

### Database Connection Error

**Problem:** `Error: connect ECONNREFUSED`

**Solution:** 
1. Make sure PostgreSQL is running
2. Check your database credentials in `.env`
3. Verify the database exists: `psql -U postgres -l`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change the PORT in `.env` to a different number (e.g., 5001)
2. Or kill the process using port 5000

### JWT Token Error

**Problem:** `Invalid or expired token`

**Solution:**
1. Make sure you're including the token in the Authorization header
2. Format: `Authorization: Bearer YOUR_TOKEN`
3. Check if the token has expired (default: 30 days)

## 📚 Next Steps

1. ✅ Read the full [README.md](README.md) for detailed API documentation
2. ✅ Test all endpoints with Postman or your preferred API client
3. ✅ Integrate with your frontend application
4. ✅ Customize the API for your specific needs
5. ✅ Deploy to production (see README for deployment guide)

## 💡 Tips

- Use **Postman** or **Insomnia** for easier API testing
- Keep your JWT tokens secure
- Change the default admin password immediately
- Use environment variables for all sensitive data
- Enable CORS for your frontend domain in production

---

**Happy Coding! 🎉**

For detailed documentation, see [README.md](README.md)
