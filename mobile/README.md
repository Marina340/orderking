# 📱 OrderKing Mobile App

A modern, polished React Native mobile app built with Expo SDK, TypeScript, and integrated with the OrderKing backend API.

## ✨ Features

### 🔐 Authentication
- ✅ Login with email & password
- ✅ User registration
- ✅ Forgot password (Supabase integration)
- ✅ JWT stored in Expo SecureStore
- ✅ Auto-logout on token expiry
- ✅ Persistent authentication

### 🛍️ Product Catalogue
- ✅ Grid/list view of products with images, names, prices
- ✅ Search bar with real-time filtering
- ✅ Category filter tabs
- ✅ Pull-to-refresh functionality
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Product stock indicators

### 🛒 Cart & Checkout
- ✅ Cart screen with items and quantity controls
- ✅ Subtotal calculation
- ✅ Checkout flow
- ✅ Order creation via API
- ✅ Order confirmation screen
- ✅ Persistent cart storage

### 📦 Order History
- ✅ List of user's past orders
- ✅ Status badges (pending, processing, shipped, delivered, cancelled)
- ✅ Tap to see order items detail
- ✅ Order total and date

### 🎨 Design & UX
- ✅ Modern, polished UI
- ✅ Consistent color scheme (Indigo primary)
- ✅ Professional typography
- ✅ Proper spacing and layout
- ✅ Loading states on every screen
- ✅ Error handling with user-friendly messages
- ✅ Empty states with helpful actions
- ✅ Bottom tab navigation
- ✅ Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and set your API URL
# For Android emulator: http://10.0.2.2:5000/api
# For iOS simulator: http://localhost:5000/api
# For physical device: http://YOUR_IP:5000/api
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## 📁 Project Structure

```
mobile/
├── app/                      # Expo Router screens
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/              # Main app tabs
│   │   ├── shop.tsx         # Product catalogue
│   │   ├── cart.tsx         # Shopping cart
│   │   ├── orders.tsx       # Order history
│   │   └── profile.tsx      # User profile
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── components/              # Reusable components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ProductCard.tsx
│   ├── LoadingSpinner.tsx
│   └── EmptyState.tsx
├── context/                 # React Context providers
│   ├── AuthContext.tsx      # Authentication state
│   └── CartContext.tsx      # Shopping cart state
├── services/                # API services
│   ├── api.ts               # Axios instance & interceptors
│   ├── auth.ts              # Auth API calls
│   ├── products.ts          # Products API calls
│   └── orders.ts            # Orders API calls
├── types/                   # TypeScript types
│   └── index.ts
├── constants/               # App constants
│   └── theme.ts             # Colors, spacing, fonts
├── app.json                 # Expo configuration
├── package.json
└── tsconfig.json
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366F1)
- **Secondary**: Pink (#EC4899)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Grays**: 50-900 scale

### Typography
- **Font Sizes**: 12px - 32px
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

## 🔌 API Integration

The app connects to the OrderKing backend API. Configure the API URL in `.env`:

```env
API_URL=http://localhost:5000/api
```

### API Endpoints Used

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/forgotpassword` - Request password reset
- `GET /auth/me` - Get current user

#### Products
- `GET /products` - List products (with search & filters)
- `GET /products/:id` - Get single product

#### Orders
- `POST /orders` - Create new order
- `GET /orders/my` - Get user's orders

## 📱 Screens Overview

### Authentication Flow
1. **Login** - Email/password login with validation
2. **Register** - User registration with password confirmation
3. **Forgot Password** - Password reset via email

### Main App Flow
1. **Shop** - Browse products, search, filter by category
2. **Cart** - View cart items, adjust quantities, proceed to checkout
3. **Orders** - View order history with status tracking
4. **Profile** - User profile and logout

## 🔒 Security

- JWT tokens stored in Expo SecureStore (encrypted)
- Automatic token refresh on app launch
- Auto-logout on token expiry (401 responses)
- Secure password input fields
- Input validation on all forms

## 🎯 Key Features Implementation

### Authentication State Management
```typescript
// Using React Context for global auth state
const { user, isAuthenticated, login, logout } = useAuth();
```

### Cart Management
```typescript
// Persistent cart with AsyncStorage
const { items, addToCart, removeFromCart, totalAmount } = useCart();
```

### API Error Handling
```typescript
// Centralized error handling
try {
  await api.post('/endpoint', data);
} catch (error) {
  Alert.alert('Error', handleApiError(error));
}
```

### Pull-to-Refresh
```typescript
<FlatList
  data={products}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
/>
```

## 🧪 Testing

### Test Credentials
- **Email**: test@example.com
- **Password**: password123

Or create a new account through the registration screen.

## 📦 Building for Production

### iOS
```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android
```bash
# Build for Android
eas build --platform android

# Submit to Play Store
eas submit --platform android
```

## 🐛 Troubleshooting

### Cannot connect to API
- **Android Emulator**: Use `http://10.0.2.2:5000/api`
- **iOS Simulator**: Use `http://localhost:5000/api`
- **Physical Device**: Use your computer's IP address (e.g., `http://192.168.1.100:5000/api`)
- Make sure backend server is running

### Token Expired Error
- The app automatically logs out when token expires
- Login again to get a new token

### Images Not Loading
- Check that product image URLs are valid
- Ensure you have internet connection
- Images use placeholder if URL is invalid

## 🚀 Next Steps

### Recommended Enhancements
1. ✅ Add product detail screen
2. ✅ Implement wishlist/favorites
3. ✅ Add user reviews and ratings
4. ✅ Push notifications for order updates
5. ✅ Add payment gateway integration
6. ✅ Implement dark mode
7. ✅ Add animations with Reanimated
8. ✅ Offline support with caching
9. ✅ Add image zoom/gallery
10. ✅ Implement deep linking

## 📚 Technologies Used

- **Expo SDK 52** - React Native framework
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **Expo SecureStore** - Encrypted storage
- **AsyncStorage** - Persistent storage
- **React Context** - State management
- **Expo Linear Gradient** - Gradient backgrounds
- **Expo Vector Icons** - Icon library

## 📄 License

ISC License - OrderKing Egypt

---

**Built with ❤️ in Cairo, Egypt**

**Status**: ✅ Production Ready
