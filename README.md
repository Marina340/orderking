# 🛍️ OrderKing - Complete E-Commerce Platform

A full-stack e-commerce platform built with modern technologies, featuring a mobile shopping app, admin dashboard, and RESTful API backend.

## 📹 Video Demonstration

**[Watch the 5-minute demo video here](#)** *(Upload your video to Google Drive/Loom/WeTransfer and add the link)*

### Video Coverage:
1. ✅ Mobile App Demo: Register → Browse Products → Add to Cart → Place Order
2. ✅ Admin Dashboard: View Order → Update Status to "Processing"
3. ✅ Code Structure & Technical Decisions

---

## 🏗️ Project Architecture

```
orderking/
├── backend/          # Node.js + Express + Supabase API
├── dashboard/        # React Admin Dashboard
├── mobile/          # React Native Mobile App (Expo)
└── README.md        # This file
```

---

## 🚀 Quick Start - Run All Components

### Prerequisites
- **Node.js** v20.13+ 
- **npm** v10+
- **Supabase Account** (for database)

### 1️⃣ Backend API

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

✅ **Running on:** `http://localhost:5000`

### 2️⃣ Admin Dashboard

```bash
cd dashboard
npm install
npm run dev
```

✅ **Running on:** `http://localhost:5173`

### 3️⃣ Mobile App

```bash
cd mobile
npm install
npm start --web
# Press 'w' for web browser
```

✅ **Running on:** `http://localhost:8081`

---

## 📱 Mobile App Features

### Customer Experience
- ✅ **User Authentication** - Register & Login with JWT
- ✅ **Product Browsing** - View all products with images
- ✅ **Category Filtering** - Filter by Electronics, Clothing, Food, Home & Garden
- ✅ **Search Functionality** - Search products by name
- ✅ **Shopping Cart** - Add/remove items, adjust quantities
- ✅ **Checkout** - Enter shipping address and phone number
- ✅ **Order History** - View all past orders with status
- ✅ **User Profile** - View account details and logout

### Technical Features
- 📱 **React Native** with Expo SDK 52
- 🎨 **Custom UI Components** with TypeScript
- 🔄 **State Management** with Context API
- 💾 **Persistent Storage** - AsyncStorage for cart, SecureStore/localStorage for auth
- 🌐 **Cross-Platform** - Works on iOS, Android, and Web
- 🎯 **Responsive Design** - Adapts to different screen sizes

### Mobile App Structure
```
mobile/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Login & Register screens
│   ├── (tabs)/            # Main app tabs (Shop, Cart, Orders, Profile)
│   └── index.tsx          # Root redirect
├── components/            # Reusable UI components
├── context/              # Auth & Cart context providers
├── services/             # API client & services
├── constants/            # Theme & configuration
└── types/               # TypeScript type definitions
```

---

## 🎛️ Admin Dashboard Features

### Admin Capabilities
- ✅ **Admin Authentication** - Secure login (admin role required)
- ✅ **Dashboard Analytics** - KPIs (orders today, revenue, active products)
- ✅ **Product Management** - Full CRUD operations
  - Create, edit, delete products
  - Toggle active/inactive status
  - Category dropdown selection
  - Image URL support with fallback icons
  - Stock quantity tracking
- ✅ **Order Management** - View and update orders
  - Filter by status (pending, processing, shipped, delivered, cancelled)
  - Update order status
  - View detailed order information
  - Customer details and shipping address
- ✅ **Category Filtering** - Filter products by category
- ✅ **Responsive Design** - Works on desktop and tablet

### Technical Features
- ⚛️ **React 18** with TypeScript
- ⚡ **Vite** for fast development
- 🎨 **Tailwind CSS 3** for styling
- 🔄 **React Query** for data fetching & caching
- 🗺️ **React Router 7** for navigation
- 🐻 **Zustand** for state management
- 🔔 **React Hot Toast** for notifications
- 🎯 **Lucide Icons** for UI icons

### Dashboard Structure
```
dashboard/
├── src/
│   ├── pages/            # Main pages (Login, Dashboard, Products, Orders)
│   ├── components/       # Reusable components & modals
│   │   ├── layout/      # Layout components (Sidebar, Header)
│   │   ├── ProductModal.tsx
│   │   └── OrderDetailModal.tsx
│   ├── services/        # API client (Axios)
│   ├── store/          # Zustand auth store
│   ├── types/          # TypeScript types
│   └── App.tsx         # Main app with routing
├── .env               # Environment variables
└── package.json
```

---

## 🔧 Backend API

### Features
- ✅ **RESTful API** - Clean, organized endpoints
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Role-Based Access** - Admin and customer roles
- ✅ **Supabase Integration** - PostgreSQL database
- ✅ **Password Hashing** - bcrypt for security
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **CORS Enabled** - Cross-origin requests supported

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgotpassword` - Password reset
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - List all products (with pagination, search, category filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PATCH /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

#### Orders
- `GET /api/orders` - List orders (user's orders or all for admin)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

#### Categories
- `GET /api/categories` - List all categories

### Tech Stack
- 🟢 **Node.js** with Express.js
- 🐘 **PostgreSQL** via Supabase
- 🔐 **JWT** for authentication
- 🔒 **bcrypt** for password hashing
- ✅ **Input validation** with express-validator

### Backend Structure
```
backend/
├── src/
│   ├── routes/          # API route handlers
│   ├── middleware/      # Auth & error middleware
│   ├── config/         # Database configuration
│   └── server.js       # Express app setup
├── .env               # Environment variables
└── package.json
```

---

## 🎯 Technical Decisions & Highlights

### 1. **Cross-Platform Storage Solution** 🌐
**Problem:** React Native's `expo-secure-store` doesn't work on web platform.

**Solution:** Created a unified storage abstraction layer:
```typescript
const storage = {
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  // ... setItem, deleteItem
};
```

**Impact:** Mobile app now works seamlessly on iOS, Android, AND web browsers!

### 2. **Image Fallback System** 🖼️
**Problem:** Broken product image URLs crash the UI.

**Solution:** Implemented error handling with placeholder icons:
```typescript
const [imageError, setImageError] = useState(false);

{!imageError && product.image_url ? (
  <Image onError={() => setImageError(true)} />
) : (
  <View style={styles.imagePlaceholder}>
    <Ionicons name="image-outline" />
  </View>
)}
```

**Impact:** Professional UX even with missing images.

### 3. **Category Filtering with Query Invalidation** 🔄
**Problem:** Need real-time filtering without page refresh.

**Solution:** React Query with dynamic query keys:
```typescript
const { data: products } = useQuery({
  queryKey: ['products', selectedCategory],
  queryFn: async () => {
    const params = selectedCategory ? `?category=${selectedCategory}` : '';
    return api.get(`/products${params}`);
  },
});
```

**Impact:** Instant filtering with automatic cache management!

### 4. **Optimistic UI Updates** ⚡
**Problem:** Slow feedback when toggling product status.

**Solution:** React Query mutations with cache invalidation:
```typescript
const toggleMutation = useMutation({
  mutationFn: (data) => api.patch(`/products/${id}`, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    toast.success('Updated!');
  },
});
```

**Impact:** Instant UI feedback with automatic data refresh.

### 5. **Type-Safe API Client** 🛡️
**Problem:** Runtime errors from API response mismatches.

**Solution:** Full TypeScript coverage with shared types:
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  // ... all fields typed
}

const getProducts = (): Promise<Product[]> => {
  return api.get<ProductsResponse>('/products');
};
```

**Impact:** Catch errors at compile-time, not runtime!

---

## 🗄️ Database Schema

### Tables
- **users** - User accounts with roles (admin/customer)
- **categories** - Product categories
- **products** - Product catalog
- **orders** - Customer orders
- **order_items** - Order line items

### Key Relationships
- Products → Categories (many-to-one)
- Orders → Users (many-to-one)
- Order Items → Orders (many-to-one)
- Order Items → Products (many-to-one)

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

### Dashboard (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Mobile (app.json)
```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://localhost:5000/api"
    }
  }
}
```

---

## 📊 Available Categories

| Category | ID |
|----------|-----|
| Electronics | `dc139218-c079-43e3-ae94-6443519c4307` |
| Clothing | `58e36735-cb70-49ba-8930-84d837b1c78b` |
| Food & Beverages | `c2bd08e4-8f47-43a7-b7b4-89bb6de5f42b` |
| Home & Garden | `809b2d41-ffab-4fa4-841f-8ea21e202e7d` |

---

## 🎬 Video Recording Guide

### What to Show (4-5 minutes)

#### Part 1: Mobile App Demo (2 minutes)
1. **Open mobile app** in browser (`http://localhost:8081`)
2. **Register** a new account
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
3. **Browse products**
   - Show category filters working
   - Show search functionality
4. **Add to cart**
   - Add 2-3 products
   - Show cart with quantities
5. **Place order**
   - Enter shipping address
   - Enter phone number
   - Confirm order placement
6. **View order history**
   - Show the order just placed with "pending" status

#### Part 2: Admin Dashboard Demo (1.5 minutes)
1. **Login to dashboard** (`http://localhost:5173`)
   - Email: admin@orderking.com
   - Password: (your admin password)
2. **Navigate to Orders page**
   - Find the order just placed from mobile app
   - Show order details (customer info, items, total)
3. **Update order status**
   - Change status from "Pending" to "Processing"
   - Show success notification
4. **Show Products page**
   - Demonstrate category filtering
   - Show add/edit product functionality

#### Part 3: Code Walkthrough (1 minute)
1. **Show project structure**
   - Open VS Code
   - Show backend, dashboard, mobile folders
2. **Explain one technical decision**
   - Example: "I'm proud of the cross-platform storage solution that allows the mobile app to work on web, iOS, and Android using a single codebase"
   - Show the code snippet
3. **Highlight key features**
   - TypeScript for type safety
   - React Query for data management
   - Responsive design

### Recording Tips
- ✅ Use **OBS Studio** or **Loom** for recording
- ✅ Record in **1080p** (1920x1080)
- ✅ Enable **microphone** for narration
- ✅ Speak clearly in **English**
- ✅ Keep it **4-5 minutes** max
- ✅ Upload to **Google Drive/Loom/WeTransfer**
- ✅ Add link to this README

---

## 🧪 Testing the Application

### Test Credentials

**Customer Account:**
- Register via mobile app
- Any email/password

**Admin Account:**
```sql
-- Run in Supabase SQL Editor
UPDATE users 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

### Test Workflow
1. ✅ Register customer account in mobile app
2. ✅ Browse and add products to cart
3. ✅ Place an order
4. ✅ Login to admin dashboard
5. ✅ View the order
6. ✅ Update order status
7. ✅ Check mobile app - order status updated

---

## 🐛 Troubleshooting

### Backend Issues
**Port already in use:**
```bash
# Change PORT in .env file
PORT=5001
```

**Database connection error:**
- Verify Supabase credentials in `.env`
- Check Supabase project is active

### Dashboard Issues
**White screen:**
- Check browser console (F12)
- Ensure backend is running
- Verify `.env` has correct API URL

**Can't login:**
- Ensure user has `role='admin'` in database
- Check backend API is accessible

### Mobile App Issues
**API not working on web:**
- Already fixed! Uses localStorage on web
- Check console for API URL log

**Images not loading:**
- Already fixed! Shows placeholder icons
- Verify image URLs are accessible

---

## 📦 Deployment

### Backend (Heroku/Railway)
```bash
# Add environment variables
# Deploy with Git
git push heroku main
```

### Dashboard (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
# Set VITE_API_URL to production API
```

### Mobile (Expo)
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Publish update
eas update
```

---

## 📄 License

ISC License - OrderKing Egypt

---

## 👨‍💻 Developer

Built with ❤️ for OrderKing

### Tech Stack Summary
- **Frontend:** React, React Native, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL (Supabase)
- **State Management:** Zustand, React Query, Context API
- **Authentication:** JWT, bcrypt
- **Tools:** Vite, Expo, Axios

---

## 🎯 Project Completion Status

✅ **Backend API** - 100% Complete
✅ **Admin Dashboard** - 100% Complete  
✅ **Mobile App** - 100% Complete
✅ **Documentation** - 100% Complete
📹 **Video Demo** - Ready to Record

**All features implemented and tested!** 🚀

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the API documentation in `backend/API_ENDPOINTS.md`
3. Check individual README files in each folder

---

**Happy Coding! 🎉**
