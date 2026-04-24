# 📡 OrderKing API Endpoints Reference

Complete reference for all API endpoints with request/response examples.

---

## 🔐 Authentication Endpoints

Base URL: `/api/auth`

### 1. Register New User

**Endpoint:** `POST /api/auth/register`  
**Access:** Public  
**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "User already exists with this email"
}
```

---

### 2. Login

**Endpoint:** `POST /api/auth/login`  
**Access:** Public  
**Description:** Login and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### 3. Forgot Password

**Endpoint:** `POST /api/auth/forgotpassword`  
**Access:** Public  
**Description:** Trigger password reset email via Supabase

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

---

### 4. Get Current User Profile

**Endpoint:** `GET /api/auth/me`  
**Access:** Protected (requires authentication)  
**Description:** Get current logged-in user's profile

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 📦 Product Endpoints

Base URL: `/api/products`

### 1. Get All Products

**Endpoint:** `GET /api/products`  
**Access:** Public  
**Description:** List all active products with optional search and filters

**Query Parameters:**
- `search` (optional): Search in product name and description
- `category` (optional): Filter by category slug
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/products?search=phone&category=electronics&page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "iPhone 14 Pro",
      "description": "Latest Apple smartphone with advanced camera system",
      "price": 999.99,
      "stock_quantity": 50,
      "image_url": "https://example.com/iphone14.jpg",
      "is_active": true,
      "category": {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "name": "Electronics",
        "slug": "electronics"
      },
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Product

**Endpoint:** `GET /api/products/:id`  
**Access:** Public  
**Description:** Get detailed information about a single product

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "iPhone 14 Pro",
    "description": "Latest Apple smartphone with advanced camera system",
    "price": 999.99,
    "stock_quantity": 50,
    "image_url": "https://example.com/iphone14.jpg",
    "is_active": true,
    "category": {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Electronics",
      "slug": "electronics"
    },
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

---

### 3. Create Product

**Endpoint:** `POST /api/products`  
**Access:** Protected (Admin only)  
**Description:** Create a new product

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category_id": "660e8400-e29b-41d4-a716-446655440000",
  "stock_quantity": 100,
  "image_url": "https://example.com/product.jpg",
  "is_active": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category_id": "660e8400-e29b-41d4-a716-446655440000",
    "stock_quantity": 100,
    "image_url": "https://example.com/product.jpg",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Update Product

**Endpoint:** `PATCH /api/products/:id`  
**Access:** Protected (Admin only)  
**Description:** Update an existing product (partial update)

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock_quantity": 150,
  "is_active": false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "name": "Updated Product Name",
    "description": "Product description",
    "price": 89.99,
    "category_id": "660e8400-e29b-41d4-a716-446655440000",
    "stock_quantity": 150,
    "image_url": "https://example.com/product.jpg",
    "is_active": false,
    "updated_at": "2024-01-02T00:00:00.000Z"
  }
}
```

---

### 5. Delete Product

**Endpoint:** `DELETE /api/products/:id`  
**Access:** Protected (Admin only)  
**Description:** Soft-delete a product (sets is_deleted flag)

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🛒 Order Endpoints

Base URL: `/api/orders`

### 1. Place Order

**Endpoint:** `POST /api/orders`  
**Access:** Protected (Authenticated users)  
**Description:** Place a new order with multiple items

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "product_id": "550e8400-e29b-41d4-a716-446655440000",
      "quantity": 2
    },
    {
      "product_id": "660e8400-e29b-41d4-a716-446655440000",
      "quantity": 1
    }
  ],
  "shipping_address": "123 Main St, Nasr City, Cairo, Egypt",
  "phone": "+20123456789",
  "notes": "Please deliver in the morning"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "total_amount": 2999.97,
    "shipping_address": "123 Main St, Nasr City, Cairo, Egypt",
    "phone": "+20123456789",
    "notes": "Please deliver in the morning",
    "status": "pending",
    "items": [
      {
        "id": "990e8400-e29b-41d4-a716-446655440000",
        "product_id": "550e8400-e29b-41d4-a716-446655440000",
        "product_name": "iPhone 14 Pro",
        "image_url": "https://example.com/iphone14.jpg",
        "quantity": 2,
        "price": 999.99,
        "subtotal": 1999.98
      },
      {
        "id": "aa0e8400-e29b-41d4-a716-446655440000",
        "product_id": "660e8400-e29b-41d4-a716-446655440000",
        "product_name": "MacBook Pro",
        "image_url": "https://example.com/macbook.jpg",
        "quantity": 1,
        "price": 999.99,
        "subtotal": 999.99
      }
    ],
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Insufficient stock for product \"iPhone 14 Pro\". Available: 1"
}
```

---

### 2. Get My Orders

**Endpoint:** `GET /api/orders/my`  
**Access:** Protected (Authenticated users)  
**Description:** Get current user's order history

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/orders/my?page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "page": 1,
  "pages": 2,
  "data": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "total_amount": 2999.97,
      "shipping_address": "123 Main St, Cairo, Egypt",
      "phone": "+20123456789",
      "notes": "Please deliver in the morning",
      "status": "pending",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "items": [
        {
          "id": "990e8400-e29b-41d4-a716-446655440000",
          "product_id": "550e8400-e29b-41d4-a716-446655440000",
          "product_name": "iPhone 14 Pro",
          "image_url": "https://example.com/iphone14.jpg",
          "quantity": 2,
          "price": 999.99,
          "subtotal": 1999.98
        }
      ]
    }
  ]
}
```

---

### 3. Get All Orders (Admin)

**Endpoint:** `GET /api/orders`  
**Access:** Protected (Admin only)  
**Description:** Get all orders with pagination and filtering

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, processing, shipped, delivered, cancelled)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/orders?status=pending&page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "total_amount": 2999.97,
      "shipping_address": "123 Main St, Cairo, Egypt",
      "phone": "+20123456789",
      "notes": "Please deliver in the morning",
      "status": "pending",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "items": [...]
    }
  ]
}
```

---

### 4. Update Order Status (Admin)

**Endpoint:** `PATCH /api/orders/:id/status`  
**Access:** Protected (Admin only)  
**Description:** Update the status of an order

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "processing"
}
```

**Valid Status Values:**
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "status": "processing",
    "updated_at": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Invalid status. Must be one of: pending, processing, shipped, delivered, cancelled"
}
```

---

## 🔑 Authentication Headers

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📊 HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🎯 Role-Based Access

| Endpoint | Public | User | Admin |
|----------|--------|------|-------|
| POST /auth/register | ✅ | ✅ | ✅ |
| POST /auth/login | ✅ | ✅ | ✅ |
| POST /auth/forgotpassword | ✅ | ✅ | ✅ |
| GET /auth/me | ❌ | ✅ | ✅ |
| GET /products | ✅ | ✅ | ✅ |
| GET /products/:id | ✅ | ✅ | ✅ |
| POST /products | ❌ | ❌ | ✅ |
| PATCH /products/:id | ❌ | ❌ | ✅ |
| DELETE /products/:id | ❌ | ❌ | ✅ |
| POST /orders | ❌ | ✅ | ✅ |
| GET /orders/my | ❌ | ✅ | ✅ |
| GET /orders | ❌ | ❌ | ✅ |
| PATCH /orders/:id/status | ❌ | ❌ | ✅ |

---

**For more information, see [README.md](README.md)**
