# 🚀 Start OrderKing Mobile App

## ✅ All Issues Fixed!

1. ✅ Added `react-native-web` for web support
2. ✅ Removed asset references (icon, favicon, splash images)
3. ✅ Updated `app.json` to work without image assets
4. ✅ Fixed TypeScript configuration

## 📱 Run the App

### Option 1: Android Emulator (Recommended)

1. **Create `.env` file:**
   ```bash
   echo API_URL=http://10.0.2.2:5000/api > .env
   ```

2. **Start backend** (in another terminal):
   ```bash
   cd ../backend
   npm run dev
   ```

3. **Start mobile app:**
   ```bash
   npm start
   ```
   
4. **Press `a`** to open Android emulator

### Option 2: iOS Simulator (Mac only)

1. **Create `.env` file:**
   ```bash
   echo API_URL=http://localhost:5000/api > .env
   ```

2. **Start backend** (in another terminal):
   ```bash
   cd ../backend
   npm run dev
   ```

3. **Start mobile app:**
   ```bash
   npm start
   ```
   
4. **Press `i`** to open iOS simulator

### Option 3: Web Browser

1. **Create `.env` file:**
   ```bash
   echo API_URL=http://localhost:5000/api > .env
   ```

2. **Start backend** (in another terminal):
   ```bash
   cd ../backend
   npm run dev
   ```

3. **Start mobile app:**
   ```bash
   npm start
   ```
   
4. **Press `w`** to open in web browser

## 🎯 Quick Test

After the app starts:

1. **Register** a new account:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123

2. **Browse products** on Shop tab
3. **Add to cart** using + button
4. **Checkout** from Cart tab
5. **View orders** in Orders tab

## 🐛 If You See Errors

### "Cannot connect to API"
- Make sure backend is running on port 5000
- Check `.env` has correct API_URL

### "Metro bundler error"
```bash
npx expo start --clear
```

### TypeScript errors in IDE
- Press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

**Ready to go! 🎉**
