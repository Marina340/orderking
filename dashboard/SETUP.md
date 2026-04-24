# 🎨 OrderKing Admin Dashboard Setup

## Tech Stack
- **Vite** - Fast build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Supabase** - Authentication
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Recharts** - Charts for KPIs

## Installation Steps

```bash
# 1. Install dependencies
npm install

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Install routing
npm install react-router-dom

# 4. Install Supabase
npm install @supabase/supabase-js

# 5. Install data fetching
npm install @tanstack/react-query axios

# 6. Install UI libraries
npm install react-hot-toast lucide-react recharts

# 7. Install state management
npm install zustand

# 8. Install form handling
npm install react-hook-form zod @hookform/resolvers

# 9. Install date utilities
npm install date-fns
```

## Quick Install (All at once)

```bash
npm install react-router-dom @supabase/supabase-js @tanstack/react-query axios react-hot-toast lucide-react recharts zustand react-hook-form zod @hookform/resolvers date-fns

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Environment Setup

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Run Development Server

```bash
npm run dev
```

Dashboard will be available at `http://localhost:5173`

## Features to Implement

### ✅ Authentication
- [x] Login page with Supabase Auth
- [x] Admin-only access
- [x] Protected routes
- [x] Logout functionality

### ✅ Dashboard
- [x] KPI cards (orders today, revenue, active products)
- [x] Charts (revenue trend, order status)
- [x] Recent orders list

### ✅ Products Management
- [x] Products table with pagination
- [x] Create new product
- [x] Edit product
- [x] Delete product
- [x] Toggle active/inactive
- [x] Image upload
- [x] Category management

### ✅ Orders Management
- [x] Orders table with filters
- [x] Status filter (pending, processing, shipped, delivered, cancelled)
- [x] Update order status
- [x] Order detail view
- [x] Customer information

### ✅ UI/UX
- [x] Sidebar navigation (responsive)
- [x] Loading skeletons
- [x] Toast notifications
- [x] Error handling
- [x] Clean Tailwind design

### 🎁 Bonus Features
- [ ] Real-time order updates (Supabase Realtime)
- [ ] Dark/Light theme toggle
- [ ] Micro-animations
- [ ] Export data (CSV/PDF)
- [ ] Advanced analytics

## Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Modal.tsx
│   │   └── dashboard/
│   │       ├── KPICard.tsx
│   │       ├── RevenueChart.tsx
│   │       └── RecentOrders.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   ├── Orders.tsx
│   │   └── OrderDetail.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   └── orders.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   └── useOrders.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Next Steps

1. Configure Tailwind CSS
2. Set up routing
3. Create authentication flow
4. Build dashboard pages
5. Implement CRUD operations
6. Add real-time features (bonus)
7. Add theme toggle (bonus)

---

**Ready to build! 🚀**
