# 🛠️ Development Guide - OrderKing Backend

This guide covers common development tasks and workflows.

## 🚀 Initial Setup

### 1. First Time Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your settings
# Then initialize database
npm run setup
```

### 2. Daily Development Workflow
```bash
# Start development server (auto-reload)
npm run dev

# Server runs on http://localhost:5000
```

## 📝 Common Development Tasks

### Adding a New Endpoint

#### 1. Create Controller Function
**File:** `src/controllers/yourController.js`
```javascript
const { query } = require('../config/database');
const { ApiError, asyncHandler } = require('../utils/errorHandler');

const yourFunction = asyncHandler(async (req, res) => {
  // Your logic here
  const result = await query('SELECT * FROM table WHERE id = $1', [id]);
  
  res.status(200).json({
    success: true,
    data: result.rows
  });
});

module.exports = { yourFunction };
```

#### 2. Create Route
**File:** `src/routes/yourRoutes.js`
```javascript
const express = require('express');
const { yourFunction } = require('../controllers/yourController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, yourFunction);

module.exports = router;
```

#### 3. Register Route in Server
**File:** `src/server.js`
```javascript
const yourRoutes = require('./routes/yourRoutes');

// Add this line with other routes
app.use('/api/your-endpoint', yourRoutes);
```

### Adding Database Migrations

#### 1. Create Migration File
**File:** `src/database/migrations/001_add_column.sql`
```sql
-- Add new column to table
ALTER TABLE products ADD COLUMN new_field VARCHAR(255);

-- Create index if needed
CREATE INDEX idx_products_new_field ON products(new_field);
```

#### 2. Run Migration
```bash
psql -U postgres -d orderking -f src/database/migrations/001_add_column.sql
```

### Adding Input Validation

**File:** `src/middleware/validation.js`
```javascript
const validateYourInput = (req, res, next) => {
  const { field1, field2 } = req.body;

  if (!field1) {
    throw new ApiError('Please provide field1', 400);
  }

  if (field2 && field2.length < 5) {
    throw new ApiError('field2 must be at least 5 characters', 400);
  }

  next();
};

module.exports = { validateYourInput };
```

### Adding Custom Middleware

**File:** `src/middleware/yourMiddleware.js`
```javascript
const yourMiddleware = (req, res, next) => {
  // Your logic
  console.log('Request received:', req.method, req.path);
  next();
};

module.exports = yourMiddleware;
```

## 🗄️ Database Operations

### Running Raw SQL Queries
```javascript
const { query } = require('../config/database');

// Simple query
const result = await query('SELECT * FROM users WHERE email = $1', ['user@example.com']);

// Multiple parameters
const result = await query(
  'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
  ['Product Name', 99.99]
);
```

### Using Transactions
```javascript
const { getClient } = require('../config/database');

const client = await getClient();

try {
  await client.query('BEGIN');
  
  // Your queries
  await client.query('INSERT INTO table1 ...');
  await client.query('UPDATE table2 ...');
  
  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}
```

### Resetting Database
```bash
# Drop and recreate database
dropdb orderking
createdb orderking

# Reinitialize
npm run init-db
npm run seed
```

## 🧪 Testing Endpoints

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Protected Endpoint:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using PowerShell

**Register User:**
```powershell
$body = @{
    name = "Test User"
    email = "test@test.com"
    password = "test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

**Login:**
```powershell
$body = @{
    email = "test@test.com"
    password = "test123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"

$token = $response.data.token
```

**Protected Endpoint:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" `
  -Headers @{Authorization = "Bearer $token"}
```

## 🔍 Debugging

### Enable Detailed Logging
**File:** `.env`
```env
NODE_ENV=development
```

This enables:
- Morgan HTTP request logging
- Detailed error stack traces
- Database query logging

### Common Debug Points

**Check Database Connection:**
```javascript
// In any controller
console.log('Database pool:', pool.totalCount, 'total,', pool.idleCount, 'idle');
```

**Log Request Data:**
```javascript
// In controller
console.log('Request body:', req.body);
console.log('Request params:', req.params);
console.log('Request query:', req.query);
console.log('Current user:', req.user);
```

**Log Database Queries:**
Already enabled in `src/config/database.js` - check console output

## 🔐 Security Best Practices

### Environment Variables
```env
# Never commit .env file
# Use strong secrets in production
JWT_SECRET=use_a_very_long_random_string_here
DB_PASSWORD=strong_password_here
```

### Password Hashing
```javascript
const bcrypt = require('bcryptjs');

// Hash password (already implemented in authController)
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

// Verify password
const isValid = await bcrypt.compare(password, hash);
```

### JWT Tokens
```javascript
const { generateToken, verifyToken } = require('./utils/jwt');

// Generate token (already implemented)
const token = generateToken({ id: user.id, email: user.email, role: user.role });

// Verify token (already implemented in middleware)
const decoded = verifyToken(token);
```

## 📊 Database Schema Changes

### Adding a New Table
```sql
CREATE TABLE IF NOT EXISTS new_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_new_table_user ON new_table(user_id);

CREATE TRIGGER update_new_table_updated_at 
BEFORE UPDATE ON new_table
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Adding a Column
```sql
ALTER TABLE products ADD COLUMN discount_price DECIMAL(10, 2);
ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT false;
```

### Creating Indexes
```sql
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);
```

## 🚀 Performance Tips

### 1. Use Indexes
```sql
-- For frequently searched columns
CREATE INDEX idx_products_name ON products(name);

-- For foreign keys
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

### 2. Limit Query Results
```javascript
// Always use pagination
const limit = Math.min(req.query.limit || 10, 100); // Max 100
const offset = (page - 1) * limit;
```

### 3. Use Connection Pooling
Already configured in `src/config/database.js`

### 4. Optimize Queries
```javascript
// Bad: N+1 queries
for (const order of orders) {
  const items = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
}

// Good: Single query with JOIN
const result = await query(`
  SELECT o.*, oi.* 
  FROM orders o 
  LEFT JOIN order_items oi ON o.id = oi.order_id
`);
```

## 📦 Adding New Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name
```

Remember to update `package.json` and commit changes.

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

## 📝 Code Style Guidelines

### Naming Conventions
- **Files:** camelCase (e.g., `authController.js`)
- **Functions:** camelCase (e.g., `getUserProfile`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `JWT_SECRET`)
- **Database tables:** snake_case (e.g., `order_items`)

### Error Handling
```javascript
// Always use asyncHandler for async routes
const myFunction = asyncHandler(async (req, res) => {
  // Throw ApiError for expected errors
  if (!data) {
    throw new ApiError('Data not found', 404);
  }
  
  // Let unexpected errors bubble up
  const result = await someAsyncOperation();
});
```

### Response Format
```javascript
// Success response
res.status(200).json({
  success: true,
  data: result
});

// Error response (handled by errorHandler middleware)
throw new ApiError('Error message', 400);
```

## 🐛 Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Issue: Database Connection Failed
```bash
# Check if PostgreSQL is running
# Windows: Services -> PostgreSQL

# Test connection
psql -U postgres -d orderking
```

### Issue: JWT Token Invalid
- Check Authorization header format: `Bearer <token>`
- Verify JWT_SECRET matches between token generation and verification
- Check token expiration

### Issue: CORS Error
Add frontend URL to CORS configuration in `src/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## 📚 Additional Resources

- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Express.js Docs:** https://expressjs.com/
- **JWT.io:** https://jwt.io/
- **Node.js Best Practices:** https://github.com/goldbergyoni/nodebestpractices

---

**Happy Coding! 🎉**
