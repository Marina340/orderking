# 🔧 Quick Fix Guide

## Issues Fixed:

1. ✅ Added missing `expo-asset`, `expo-font`, and `expo-splash-screen` packages
2. ✅ Updated `tsconfig.json` with proper React Native/Expo configuration

## Steps to Run:

### 1. Install the new dependencies:
```bash
cd mobile
npm install
```

### 2. Create `.env` file:
```bash
# Copy the example
cp .env.example .env
```

Then edit `.env` with your API URL:

**For Android Emulator:**
```env
API_URL=http://10.0.2.2:5000/api
```

**For iOS Simulator:**
```env
API_URL=http://localhost:5000/api
```

**For Physical Device (replace with your computer's IP):**
```env
API_URL=http://192.168.1.100:5000/api
```

### 3. Start the backend server (in another terminal):
```bash
cd ../backend
npm run dev
```

### 4. Start the mobile app:
```bash
cd ../mobile
npm start
```

Then press:
- `a` for Android
- `i` for iOS  
- `w` for Web

## TypeScript Errors

The TypeScript errors you're seeing in the IDE are expected before running `npm install`. They will disappear after:

1. Installing the packages (`npm install`)
2. Restarting your IDE/TypeScript server

## If you still see errors:

1. **Restart TypeScript Server:**
   - In VS Code: Press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

2. **Clear Expo cache:**
   ```bash
   npx expo start --clear
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Testing the App:

1. **Register** a new account or use:
   - Email: `test@example.com`
   - Password: `password123`

2. **Browse products** on the Shop tab
3. **Add to cart** and checkout
4. **View orders** in Orders tab

---

**The app is ready to run! 🚀**
