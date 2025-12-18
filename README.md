# 🛍️ Product Showcase - E-commerce Platform

A modern, full-stack e-commerce web application built with React, Node.js, and MongoDB. Features a beautiful UI, complete shopping cart functionality, user authentication, and seamless checkout experience.

![Product Showcase](https://img.shields.io/badge/Status-Active-success)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green)
![React](https://img.shields.io/badge/Frontend-React%2018-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)

---

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse 22+ premium products across multiple categories
- **Product Details** - Detailed product pages with specifications and reviews
- **Shopping Cart** - Add, update, and remove items with real-time cart updates
- **Wishlist** - Save favorite products for later
- **Search & Filter** - Find products easily with category filters

### 👤 User Management
- **User Registration** - Create account with email and password
- **Login/Logout** - Secure authentication with JWT tokens
- **User Profile** - Manage personal information and preferences
- **Password Management** - Change password securely
- **Account Deletion** - Delete account with data cleanup

### 📦 Order Management
- **Secure Checkout** - Multi-step checkout process
- **Order Placement** - Create orders with shipping details
- **Order History** - View all past orders
- **Order Tracking** - Track order status
- **Order Cancellation** - Cancel orders before shipping

### 📱 User Interface
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Dark Mode Support** - Eye-friendly dark color scheme
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Elegant loading indicators

### 📄 Additional Pages
- **FAQ Page** - Common questions and answers
- **Contact Form** - Submit inquiries and feedback
- **About Page** - Learn about the platform

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library
- **React Hot Toast** - Elegant notifications
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📁 Project Structure

```
DAY 13/
├── backend/                 # Backend API
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Contact.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   └── contact.js
│   ├── server.js           # Express server
│   ├── seedProducts.js     # Database seeder
│   ├── package.json
│   └── .env                # Environment variables
│
├── my-react-app/           # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── FAQ.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── context/        # React Context
│   │   │   ├── CartContext.jsx
│   │   │   └── WishlistContext.jsx
│   │   ├── utils/          # Utility functions
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "DAY 13"
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../my-react-app
   npm install
   ```

4. **Set up environment variables**

   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

   Create `my-react-app/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the development servers**

   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd my-react-app
   npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🌐 Deployment

This application is ready to be deployed to free hosting services:

- **Database**: MongoDB Atlas (Free M0 tier)
- **Backend**: Render (Free tier)
- **Frontend**: Vercel (Free tier)

### Quick Deployment Guide

1. **MongoDB Atlas** - Already configured! ✅
2. **Render** - Deploy backend API
3. **Vercel** - Deploy frontend

📚 See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed deployment instructions.

---

## 📸 Screenshots

### Homepage
Beautiful landing page with hero section and featured products.

### Products Page
Browse all products with category filters and search functionality.

### Shopping Cart
Manage cart items with quantity updates and price calculations.

### Checkout
Secure checkout process with shipping details and order summary.

---

## 🔑 Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/ecommerce` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://yourapp.vercel.app` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 📦 Available Scripts

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample products

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🎨 Key Features Implementation

### Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Automatic token refresh

### State Management
- React Context API for cart and wishlist
- localStorage for persistent data
- Real-time UI updates

### API Architecture
- RESTful API design
- Error handling middleware
- Request logging
- CORS configuration

### Security
- Password hashing
- JWT token authentication
- Input validation
- Environment variable protection
- CORS policy

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password
- `DELETE /api/auth/delete-account` - Delete account

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `DELETE /api/orders/:id` - Cancel order

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Contact
- `POST /api/contact` - Submit contact form

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Himesh Ambaliya**
- Email: himeshambaliya555@gmail.com

---

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from React Icons
- UI inspiration from modern e-commerce platforms

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue in the repository
- Contact via email: himeshambaliya555@gmail.com

---

**⭐ Star this repository if you found it helpful!**

---

*Last Updated: December 2025*
