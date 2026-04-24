# 📮 Postman Testing Guide - OrderKing API

Complete guide to test the OrderKing API using Postman.

## 🚀 Quick Start

### Step 1: Import Collection

1. Open **Postman**
2. Click **Import** button (top left)
3. Select **File** tab
4. Choose `postman_collection.json` from this directory
5. Click **Import**

You should now see **"OrderKing API"** collection in your sidebar with all endpoints organized in folders.

### Step 2: Set Up Environment (Optional but Recommended)

**Option A: Use Collection Variables (Already Set Up)**
The collection already has these variables configured:
- `base_url`: `http://localhost:5000/api`
- `token`: (empty - will be set manually)
- `admin_token`: (empty - will be set manually)

**Option B: Create Postman Environment**
1. Click **Environments** (left sidebar)
2. Click **+** to create new environment
3. Name it: `OrderKing Local`
4. Add variables:
   - `base_url` = `http://localhost:5000/api`
   - `token` = (leave empty)
   - `admin_token` = (leave empty)
5. Click **Save**
6. Select the environment from dropdown (top right)

## 📋 Testing Workflow

### 1️⃣ Health Check (First Test)

**Endpoint:** `Health Check`

1. Open the request
2. Click **Send**
3. You should see:
   ```json
   {
     "success": true,
     "message": "OrderKing API is running",
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

✅ If this works, your API is running!

---

### 2️⃣ Register a New User

**Folder:** `Authentication` → `Register User`

1. Open the request
2. Check the **Body** tab - sample data is already filled:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```
3. Click **Send**
4. You should get a **201 Created** response with:
   ```json
   {
     "success": true,
     "data": {
       "user": {
         "id": "uuid-here",
         "name": "Test User",
         "email": "test@example.com",
         "role": "user"
       },
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     }
   }
   ```

5. **IMPORTANT:** Copy the `token` value from the response
6. Go to **Collection Variables** or **Environment**
7. Paste the token into the `token` variable
8. Click **Save**

---

### 3️⃣ Login as Admin

**Folder:** `Authentication` → `Login Admin`

1. Open the request
2. The body already has admin credentials:
   ```json
   {
     "email": "admin@orderking.com",
     "password": "admin123"
   }
   ```
3. Click **Send**
4. Copy the `token` from response
5. Paste it into the `admin_token` variable
6. Click **Save**

Now you have both user and admin tokens ready!

---

### 4️⃣ Get Current User Profile

**Folder:** `Authentication` → `Get Current User`

1. Open the request
2. Check **Headers** tab - it uses `{{token}}` variable
3. Click **Send**
4. You should see your user profile:
   ```json
   {
     "success": true,
     "data": {
       "id": "uuid",
       "name": "Test User",
       "email": "test@example.com",
       "role": "user",
       "is_active": true
     }
   }
   ```

---

### 5️⃣ Get All Products

**Folder:** `Products` → `Get All Products`

1. Open the request
2. Click **Send**
3. You should see paginated products list (if you ran `npm run seed`)

**Try the filters:**
- Click **Params** tab
- Enable/modify query parameters:
  - `search`: `phone`
  - `category`: `electronics`
  - `page`: `1`
  - `limit`: `5`

---

### 6️⃣ Create a Product (Admin Only)

**Folder:** `Products` → `Create Product (Admin)`

1. Open the request
2. Check **Headers** - it uses `{{admin_token}}`
3. Update the **Body** with product details:
   ```json
   {
     "name": "Test Product",
     "description": "This is a test product",
     "price": 99.99,
     "stock_quantity": 50,
     "image_url": "https://example.com/product.jpg",
     "is_active": true
   }
   ```
4. Click **Send**
5. You should get **201 Created** with the new product

**Note:** You need to get a `category_id` first by viewing products or categories.

---

### 7️⃣ Place an Order

**Folder:** `Orders` → `Place Order`

1. First, get a product ID from the products list
2. Open the request
3. Update the **Body**:
   ```json
   {
     "items": [
       {
         "product_id": "paste-product-id-here",
         "quantity": 2
       }
     ],
     "shipping_address": "123 Main St, Nasr City, Cairo, Egypt",
     "phone": "+20123456789",
     "notes": "Please deliver in the morning"
   }
   ```
4. Make sure you're using the **user token** (not admin)
5. Click **Send**
6. You should get **201 Created** with order details

---

### 8️⃣ Get My Orders

**Folder:** `Orders` → `Get My Orders`

1. Open the request
2. Click **Send**
3. You should see your order history

---

### 9️⃣ Update Order Status (Admin)

**Folder:** `Orders` → `Update Order Status (Admin)`

1. Get an order ID from "Get All Orders (Admin)"
2. Update the URL parameter `:id` with the order ID
3. Update the **Body**:
   ```json
   {
     "status": "processing"
   }
   ```
4. Make sure you're using `{{admin_token}}`
5. Click **Send**

**Valid statuses:**
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

---

## 📁 Collection Structure

```
OrderKing API
├── Authentication
│   ├── Register User
│   ├── Login User
│   ├── Login Admin
│   ├── Get Current User
│   └── Forgot Password
├── Products
│   ├── Get All Products
│   ├── Search Products
│   ├── Filter by Category
│   ├── Get Single Product
│   ├── Create Product (Admin)
│   ├── Update Product (Admin)
│   └── Delete Product (Admin)
├── Orders
│   ├── Place Order
│   ├── Get My Orders
│   ├── Get All Orders (Admin)
│   ├── Filter Orders by Status (Admin)
│   └── Update Order Status (Admin)
└── Health Check
```

## 🔑 Using Variables

### Collection Variables (Already Set)
- `{{base_url}}` - API base URL
- `{{token}}` - User authentication token
- `{{admin_token}}` - Admin authentication token

### How to Update Variables

**Method 1: Edit Collection**
1. Click on **OrderKing API** collection
2. Go to **Variables** tab
3. Update the **Current Value** column
4. Click **Save**

**Method 2: Set from Response**
1. After login, click **Tests** tab in the request
2. Add this script:
   ```javascript
   pm.collectionVariables.set("token", pm.response.json().data.token);
   ```
3. Now the token will auto-save after login!

## 🎯 Testing Scenarios

### Scenario 1: Complete User Journey

1. ✅ Register User
2. ✅ Login User (save token)
3. ✅ Get User Profile
4. ✅ Browse Products
5. ✅ Place Order
6. ✅ View My Orders

### Scenario 2: Admin Workflow

1. ✅ Login as Admin (save admin_token)
2. ✅ Create New Product
3. ✅ Update Product
4. ✅ View All Orders
5. ✅ Update Order Status
6. ✅ Delete Product

### Scenario 3: Search & Filter

1. ✅ Search Products by keyword
2. ✅ Filter Products by category
3. ✅ Filter Orders by status (admin)
4. ✅ Paginate through results

## 🐛 Troubleshooting

### Error: "Not authorized to access this route"

**Solution:** 
- Make sure you've set the token variable
- Check that the token hasn't expired (default: 30 days)
- Verify you're using the correct token (user vs admin)

### Error: "User role 'user' is not authorized"

**Solution:**
- This endpoint requires admin access
- Use `{{admin_token}}` instead of `{{token}}`
- Login as admin first

### Error: "Product not found"

**Solution:**
- Make sure you've run `npm run seed` to add sample products
- Or create products manually using the admin endpoints

### Error: "Insufficient stock"

**Solution:**
- Check product stock_quantity
- Reduce order quantity
- Update product stock as admin

## 💡 Pro Tips

### 1. Auto-Save Tokens

Add this to the **Tests** tab of login requests:

```javascript
// For user login
if (pm.response.code === 200) {
    const token = pm.response.json().data.token;
    pm.collectionVariables.set("token", token);
    console.log("Token saved:", token);
}

// For admin login
if (pm.response.code === 200) {
    const token = pm.response.json().data.token;
    pm.collectionVariables.set("admin_token", token);
    console.log("Admin token saved:", token);
}
```

### 2. Create Test Assertions

Add to **Tests** tab:

```javascript
// Check status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Check response structure
pm.test("Response has success field", function () {
    pm.expect(pm.response.json()).to.have.property('success');
});

// Check data
pm.test("Success is true", function () {
    pm.expect(pm.response.json().success).to.be.true;
});
```

### 3. Use Pre-request Scripts

For dynamic data:

```javascript
// Generate random email
pm.collectionVariables.set("random_email", 
    "user" + Math.floor(Math.random() * 10000) + "@example.com"
);

// Use in body as: {{random_email}}
```

### 4. Environment Switching

Create multiple environments:
- `OrderKing Local` - http://localhost:5000
- `OrderKing Staging` - https://staging-api.orderking.com
- `OrderKing Production` - https://api.orderking.com

Switch between them easily!

## 📊 Expected Response Codes

| Code | Meaning | When You'll See It |
|------|---------|-------------------|
| 200 | OK | Successful GET, PATCH requests |
| 201 | Created | Successful POST (register, create) |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Server-side error |

## 🎉 You're Ready!

You now have everything you need to test the OrderKing API:

1. ✅ Complete Postman collection
2. ✅ Pre-configured requests
3. ✅ Sample data in all requests
4. ✅ Variables for tokens
5. ✅ Organized folder structure

**Start testing and building your frontend!** 🚀

---

**Need more help?** Check:
- `API_ENDPOINTS.md` - Detailed API documentation
- `README.md` - Complete project documentation
- `QUICKSTART.md` - Quick start guide
