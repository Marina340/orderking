# 🚀 OrderKing Mobile - Complete Setup Guide

## Step 1: Install Dependencies

```bash
cd mobile
npm install
```

## Step 2: Configure Environment

```bash
# Copy environment file
cp .env.example .env
```

Edit `.env` and set your API URL based on your platform:

```env
# For Android Emulator
API_URL=http://10.0.2.2:5000/api

# For iOS Simulator
API_URL=http://localhost:5000/api

# For Physical Device (replace with your computer's IP)
API_URL=http://192.168.1.100:5000/api
```

## Step 3: Create Remaining Screens

The following screens need to be created from `REMAINING_SCREENS.md`:

1. **Cart Screen**: Copy code to `app/(tabs)/cart.tsx`
2. **Orders Screen**: Copy code to `app/(tabs)/orders.tsx`
3. **Profile Screen**: Copy code to `app/(tabs)/profile.tsx`

## Step 4: Start Backend Server

Make sure your backend is running:

```bash
cd ../backend
npm run dev
```

Backend should be running on `http://localhost:5000`

## Step 5: Run Mobile App

```bash
# Start Expo
npm start

# Then press:
# - 'a' for Android
# - 'i' for iOS
# - 'w' for Web
```

## 📱 Testing the App

### 1. Register a New Account
- Open the app
- Tap "Sign Up"
- Fill in: Name, Email, Password
- Tap "Sign Up"

### 2. Browse Products
- You'll be on the Shop screen
- Search for products
- Filter by category
- Pull down to refresh

### 3. Add to Cart
- Tap the "+" button on any product
- Cart badge will update

### 4. Checkout
- Go to Cart tab
- Review items
- Tap "Proceed to Checkout"
- Enter shipping address
- Enter phone number
- Confirm order

### 5. View Orders
- Go to Orders tab
- See your order history
- Check order status

### 6. Profile
- Go to Profile tab
- View your account info
- Logout when done

## 🎨 Customization

### Change Colors

Edit `constants/theme.ts`:

```typescript
export const COLORS = {
  primary: '#YOUR_COLOR',  // Change primary color
  secondary: '#YOUR_COLOR', // Change secondary color
  // ... other colors
};
```

### Change API URL

Edit `.env`:

```env
API_URL=https://your-api-domain.com/api
```

## 🐛 Common Issues

### Issue: Cannot connect to API

**Solution:**
- Check backend is running
- Verify API_URL in `.env`
- For Android: Use `10.0.2.2` instead of `localhost`
- For physical device: Use your computer's IP address

### Issue: Module not found

**Solution:**
```bash
npm install
# or
rm -rf node_modules package-lock.json
npm install
```

### Issue: Expo not starting

**Solution:**
```bash
npx expo start --clear
```

## 📦 Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

### iOS

```bash
# Build for iOS (requires Mac)
eas build --platform ios --profile preview
```

## 🎯 Next Steps

1. ✅ Test all features
2. ✅ Customize colors and branding
3. ✅ Add your own product images
4. ✅ Deploy backend to production
5. ✅ Update API_URL to production URL
6. ✅ Build and test production app
7. ✅ Submit to App Store / Play Store

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

---

**Need Help?** Check the main README.md for detailed documentation.
