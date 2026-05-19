# Database Integration Guide - Reet Riwaz

## Overview
The application has been successfully migrated from static hardcoded data to a **database-driven product system**. Products are now stored in MongoDB and managed through an admin panel.

---

## What Changed

### 1. **Backend Product Management** ✅
- **Created/Updated Admin Endpoints** in `backend/routes/adminRoutes.js`:
  - `POST /api/admin/products` - Create new product
  - `PUT /api/admin/products/:id` - Update product
  - `DELETE /api/admin/products/:id` - Delete product
  - `GET /api/admin/products` - Get all products (admin only)
  - `GET /api/admin/stats` - Get dashboard stats

- **Public Endpoints** in `backend/routes/productRoutes.js`:
  - `GET /api/products` - Get all products (public)
  - `GET /api/products?category=women` - Filter by category
  - `GET /api/products/:id` - Get single product

- **Product Model** (`backend/models/Product.js`):
  ```javascript
  {
    name: String,
    price: String,           // Display price (e.g., "₹1,999")
    priceValue: Number,      // Numeric value (e.g., 1999)
    rating: Number,
    desc: String,
    image: String,           // Can be full URL or Cloudinary public_id
    category: String,        // "women", "men", "kids"
    stock: Number,
    inStock: Boolean,
    timestamps: true
  }
  ```

### 2. **Frontend API Functions** ✅
Added to `src/utils/api.js`:
- `getAdminProducts(adminEmail)` - Fetch all products (admin view)
- `createProduct(adminEmail, productData)` - Add new product
- `updateProductData(adminEmail, productId, productData)` - Update product
- `deleteProductData(adminEmail, productId)` - Delete product
- `getAdminStats(adminEmail)` - Get stats for dashboard
- `getProducts()` - Public endpoint (for customers)

### 3. **Admin Panel** ✅
**File**: `src/pages/AdminPanel.jsx` (completely rewritten)

Features:
- **Product Management Tab**:
  - ➕ Add new products with full details
  - 📦 View all products in grid layout
  - 🗑️ Delete products
  - Display stock quantities and product info

- **Order Management Tab**:
  - View all customer orders
  - Update order status (Placed → Processing → Shipped → Delivered)
  - See order details, amounts, customer info

- **Admin Dashboard**:
  - Total orders count
  - Pending orders count
  - Total products count
  - Total revenue

Access: `http://localhost:5173/admin` (requires Clerk auth with admin email: angelpreetk2315@gmail.com)

### 4. **Customer Product Display** ✅

**Updated Components**:

- **WomensCollection.jsx** (`src/components/WomensCollection.jsx`):
  - Fetches women's products from `GET /api/products?category=women`
  - Displays products in tabs (Suits, Lehengas, Sarees, Dresses, Kurtis, Anarkalis)
  - Shows loading skeleton while fetching
  - Falls back to static data if DB has no products
  - **Removed**: All hardcoded static product data

- **ShopByCategory.jsx** (`src/components/ShopByCategory.jsx`):
  - Already fetching from database by category
  - Filters products dynamically

---

## Testing the System

### Step 1: Start Backend Server
```bash
cd backend
npm start
# Server should run on http://localhost:5000
```

### Step 2: Start Frontend Development Server
```bash
npm run dev
# Frontend should run on http://localhost:5173
```

### Step 3: Add Products via Admin Panel
1. Login to `/admin` with admin email: **angelpreetk2315@gmail.com**
2. Go to **Products** tab
3. Fill in product details:
   - **Product Name**: e.g., "Silk Saree"
   - **Display Price**: e.g., "₹2,499"
   - **Price Value**: e.g., 2499
   - **Rating**: 1-5 (e.g., 4.5)
   - **Description**: Product details
   - **Image URL**: Full HTTPS URL or Cloudinary public_id
   - **Stock Quantity**: e.g., 10
   - **Category**: women / men / kids
4. Click **Add Product** button
5. Product appears in the grid below

### Step 4: View Products as Customer
1. Go to shop pages:
   - `/shop` → Women's Collection tab
   - Categories → Select category
   - Search for products

2. Products will be loaded from database with:
   - Product image, name, price
   - Star rating
   - Add to bag / Buy now options
   - Wishlist & sharing options

### Step 5: Verify Data Persistence
- Restart the backend server
- Products should still exist (stored in MongoDB)
- Admin panel should still show all products
- Customer pages should display them

---

## Product Data Flow

```
Admin Panel (Create/Update/Delete)
           ↓
POST /api/admin/products (with admin-email header)
           ↓
Backend: addProduct() in adminController.js
           ↓
MongoDB Product Collection
           ↓
GET /api/products?category=women (public)
           ↓
Frontend: useEffect fetches and displays
           ↓
Customer sees products on shop pages
```

---

## Important Notes

### Authentication
- **Admin Panel**: Uses Clerk authentication + `admin-email` header check
- **Admin Email**: `angelpreetk2315@gmail.com` (change in `AdminPanel.jsx` if needed)
- **Products**: Public endpoint (no auth required for customers)

### Image Handling
Products support multiple image sources:
1. **Full HTTPS URLs**: `https://example.com/image.jpg`
2. **Cloudinary public_ids**: `reet-riwaz/suits/suit-1`
   - Automatically resolved to: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto/reet-riwaz/suits/suit-1`

### Static Data (Deprecated)
- **Not removed** but deprecated in:
  - `src/components/WomensCollection.jsx`
  - `src/components/ExploreByOccasion.jsx`
  - `src/components/ExploreByRegion.jsx`
- These still exist as fallback but use database by default

### Fallback Behavior
If database is empty:
- WomensCollection falls back to static data
- Admin panel shows "No products yet" message
- Add products through admin panel to populate

---

## Troubleshooting

### Products not showing on frontend
1. Check backend is running: `http://localhost:5000/api/products`
2. Add at least one product via admin panel
3. Check browser console for fetch errors
4. Verify database connection in backend

### Admin panel not loading
1. Ensure you're logged in with Clerk
2. Use the admin email: `angelpreetk2315@gmail.com`
3. Check console for auth errors

### Products not saving
1. Verify backend `/api/admin/products` endpoint is working
2. Check admin-email header is being sent
3. Look at backend logs for errors

### Images not loading
1. Verify URL is accessible (can you open it in browser?)
2. For Cloudinary URLs, check the config in `WomensCollection.jsx`
3. Try replacing with a full HTTPS URL temporarily to test

---

## Next Steps (Optional)

1. **Product Editing**: Add `PUT` button to edit existing products (code template in adminController.js)
2. **Image Upload**: Implement Cloudinary upload instead of manual URLs
3. **Bulk Operations**: Add bulk delete/category update
4. **Search/Filter**: Implement advanced search on admin panel
5. **Export Data**: CSV export of products/orders
6. **Stock Alerts**: Notify admin when stock is low

---

## API Reference

### Admin Endpoints
```bash
# Get stats
GET /api/admin/stats
Headers: admin-email: angelpreetk2315@gmail.com

# Get all products
GET /api/admin/products
Headers: admin-email: angelpreetk2315@gmail.com

# Create product
POST /api/admin/products
Headers: admin-email: angelpreetk2315@gmail.com
Body: { name, price, priceValue, rating, desc, image, category, stock }

# Update product
PUT /api/admin/products/:id
Headers: admin-email: angelpreetk2315@gmail.com
Body: { name, price, priceValue, rating, desc, image, category, stock }

# Delete product
DELETE /api/admin/products/:id
Headers: admin-email: angelpreetk2315@gmail.com
```

### Public Endpoints
```bash
# Get all products
GET /api/products

# Get products by category
GET /api/products?category=women

# Get single product
GET /api/products/:id
```

---

## Files Modified

✅ `src/utils/api.js` - Added product API functions
✅ `src/pages/AdminPanel.jsx` - Complete rewrite with database integration
✅ `src/components/WomensCollection.jsx` - Updated to fetch from database
✅ `backend/controllers/adminController.js` - Already has full CRUD operations
✅ `backend/routes/adminRoutes.js` - Already has admin endpoints
✅ `backend/controllers/productController.js` - Public product endpoints
✅ `backend/routes/productRoutes.js` - Product route setup

---

**Status**: ✅ Ready for testing!
**Last Updated**: May 19, 2026
