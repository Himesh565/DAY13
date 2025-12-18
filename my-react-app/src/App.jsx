import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import About from "./pages/About";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import TestAPI from "./pages/TestAPI";
import ClearData from "./pages/ClearData";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import OrderTracking from "./pages/OrderTracking";
import PrivateRoute from "./components/PrivateRoute";

/**
 * App defines the Routes for the whole site, using react-router-dom v6.
 * - /               -> Home
 * - /products       -> Products list and search
 * - /products/:id   -> Product details (dynamic route)
 * - /cart           -> Shopping cart
 * - /wishlist       -> Wishlist/favorites
 * - /about          -> About page
 * - /contact        -> Contact page
 * - /checkout       -> Checkout page
 * - /order-success  -> Order confirmation page
 * - /profile        -> User profile page
 * - /login          -> Login page
 * - /register       -> Registration page
 * - /users          -> Users list (admin)
 * - *               -> Fallback 404 page
 */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/test-api" element={<TestAPI />} />
        <Route path="/clear-data" element={<ClearData />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order-tracking/:orderId" element={<PrivateRoute><OrderTracking /></PrivateRoute>} />
        {/* Generic fallback route (optional): */}
        <Route path="*" element={<div className="p-6">Page not found. <a href="/">Go home</a></div>} />
      </Routes>
    </Layout>
  )
}
