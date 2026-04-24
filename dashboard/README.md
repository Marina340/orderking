# 🎨 OrderKing Admin Dashboard

A modern, professional admin dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

### 🔐 Authentication
- Admin-only login with JWT
- Protected routes
- Persistent sessions
- Secure logout

### 📊 Dashboard
- **KPI Cards**: Orders today, revenue today/month, active products
- **Recent Orders**: Quick overview of latest orders
- **Real-time Data**: Auto-refreshing statistics

### 📦 Products Management
- **CRUD Operations**: Create, read, update, delete products
- **Image Support**: Product images with fallback icons
- **Category Dropdown**: Easy category selection with names
- **Stock Tracking**: Monitor inventory levels
- **Toggle Active/Inactive**: Control product visibility
- **Rich Product Details**: Name, description, price, stock

### 📋 Orders Management
- **Status Filters**: Filter by pending, processing, shipped, delivered, cancelled
- **Update Status**: Change order status with dropdown
- **Order Details**: View full order information in modal
- **Customer Info**: Name, email, phone, shipping address
- **Order Items**: Detailed breakdown of products and quantities
- **Total Calculations**: Automatic price calculations

### 🎨 UI/UX
- **Responsive Design**: Works on desktop and tablet
- **Sidebar Navigation**: Easy access to all sections
- **Loading States**: Skeleton screens while data loads
- **Toast Notifications**: Success/error feedback
- **Clean Tailwind Design**: Professional, modern look
- **Modal Dialogs**: For detailed views and forms
- **Placeholder Icons**: Broken images show package icon

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file in the dashboard root:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Dashboard will be available at `http://localhost:5173` (or next available port)

## 📋 Prerequisites

- **Node.js**: v20.13+ (compatible with v20.13.1)
- **Backend API**: Running on `http://localhost:5000`
- **Admin Account**: User with `role='admin'` in database

## 🔑 Admin Login

You need an admin account to access the dashboard.

### Create Admin Account:

**Option 1: Via Supabase Dashboard**
1. Go to Supabase → Authentication → Users
2. Find your user
3. Update `role` to `'admin'`

**Option 2: Via SQL**
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

### Test Credentials:
- Email: `admin@orderking.com`
- Password: Your password
- Role: `admin` (must be set in database)

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Main layout wrapper
│   │   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   │   └── Header.tsx          # Top header
│   │   ├── ProductModal.tsx        # Product CRUD modal
│   │   └── OrderDetailModal.tsx    # Order details modal
│   ├── pages/
│   │   ├── Login.tsx               # Admin login page
│   │   ├── Dashboard.tsx           # KPIs & analytics
│   │   ├── Products.tsx            # Product management
│   │   └── Orders.tsx              # Order management
│   ├── services/
│   │   └── api.ts                  # Axios instance
│   ├── store/
│   │   └── authStore.ts            # Zustand auth state
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── App.tsx                     # Main app with routing
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind CSS
├── .env                            # Environment variables
├── package.json                    # Dependencies
├── tailwind.config.js              # Tailwind configuration
├── vite.config.ts                  # Vite configuration
└── README.md                       # This file
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **React Router 7** - Routing
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📊 Available Categories

When adding/editing products, use these categories:

| Category | ID |
|----------|-----|
| Electronics | `dc139218-c079-43e3-ae94-6443519c4307` |
| Clothing | `58e36735-cb70-49ba-8930-84d837b1c78b` |
| Food & Beverages | `c2bd08e4-8f47-43a7-b7b4-89bb6de5f42b` |
| Home & Garden | `809b2d41-ffab-4fa4-841f-8ea21e202e7d` |

## 🎯 Usage Guide

### Managing Products

1. **View Products**: Navigate to Products page
2. **Add Product**: Click "Add Product" button
   - Fill in name, description, price, stock
   - Select category from dropdown
   - Add image URL (optional)
   - Toggle active status
3. **Edit Product**: Click edit icon on any product
4. **Delete Product**: Click trash icon (with confirmation)
5. **Toggle Active**: Click toggle icon to activate/deactivate

### Managing Orders

1. **View Orders**: Navigate to Orders page
2. **Filter Orders**: Use status filter tabs
3. **Update Status**: Use dropdown in table
4. **View Details**: Click "View" button for full order info

### Dashboard Analytics

- **Orders Today**: Count of orders placed today
- **Revenue Today**: Total revenue for today (EGP)
- **Revenue This Month**: Monthly revenue (EGP)
- **Active Products**: Count of active products
- **Recent Orders**: Latest 5 orders

## 🚀 Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## 🌐 Deployment

Deploy to any static hosting:

**Netlify:**
```bash
netlify deploy --prod
```

**Vercel:**
```bash
vercel --prod
```

**Environment Variables:**
- Set `VITE_API_URL` to your production API URL

## 🐛 Troubleshooting

### White/Empty Screen
- Check browser console for errors
- Ensure backend API is running
- Verify `.env` file exists with correct API URL

### Login Not Working
- Verify user has `role='admin'` in database
- Check backend API is accessible
- Clear localStorage and try again

### Products Not Loading
- Ensure backend `/api/products` endpoint is working
- Check network tab for API errors
- Verify authentication token is valid

### Images Not Showing
- Products with broken/missing images show package icon
- Verify image URLs are accessible
- Check CORS settings on image host

## 📝 API Endpoints Used

- `POST /api/auth/login` - Admin login
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - List orders
- `PATCH /api/orders/:id/status` - Update order status

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Add New Pages
1. Create page in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/Sidebar.tsx`

## 📄 License

ISC License - OrderKing Egypt

---

**Built with ❤️ for OrderKing**

**Status**: ✅ Production Ready
