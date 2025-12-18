import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useThemeContext } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiShoppingCart, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";
import { authAPI } from "../services/api";

export default function Layout({ children }) {
  const { theme } = useThemeContext();
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Check for logged in user - verify token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');

    // If we have user but no token, clear the user (old data)
    if (user && !token) {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      return;
    }

    // If we have both, set user as logged in
    if (user && token) {
      setCurrentUser(JSON.parse(user));
    }

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('currentUser');

      if (user && !token) {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      } else if (user && token) {
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleStorageChange); // Listen for custom event

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    authAPI.logout(); // This clears both token and currentUser
    setCurrentUser(null);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="app fade-animation" data-theme={theme}>

      {/* ---------- HEADER ---------- */}
      <header className="site-header">
        <div className="container header-inner">

          <Link to="/" className="brand">
            <img src="/src/assets/logo.svg" alt="Logo" className="logo" />
            {/* <span>Product Showcase</span>  -- Removed as per user request */}
          </Link>

          <nav className="site-nav">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {/* Divider for visual separation */}
            <div style={{
              width: '1px',
              height: '24px',
              background: 'rgba(255,255,255,0.2)',
              margin: '0 0.5rem'
            }}></div>

            {/* Profile Icon - Always visible */}
            <Link
              to={currentUser ? "/profile" : "/login"}
              className="nav-icon-link"
              title={currentUser ? currentUser.name : "Login to view profile"}
            >
              <div className="icon-badge-wrapper">
                <FiUser size={22} />
                {currentUser && <span className="user-online-dot"></span>}
              </div>
            </Link>

            {/* Wishlist Icon with Badge */}
            <Link to="/wishlist" className="nav-icon-link">
              <div className="icon-badge-wrapper">
                <FiHeart size={22} />
                {wishlistItems.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}
              </div>
            </Link>

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="nav-icon-link">
              <div className="icon-badge-wrapper">
                <FiShoppingCart size={22} />
                {getCartCount() > 0 && (
                  <span className="badge">{getCartCount()}</span>
                )}
              </div>
            </Link>

            {/* Divider for visual separation */}
            <div style={{
              width: '1px',
              height: '24px',
              background: 'rgba(255,255,255,0.2)',
              margin: '0 0.5rem'
            }}></div>

            {/* Login/Logout Section - Separate from profile */}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="nav-link-btn logout-btn"
                title="Logout"
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                }}
              >
                <FiLogOut size={18} />
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="nav-btn nav-btn-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-btn nav-btn-success"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

        </div>
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="container">{children}</main>



      {/* ---------- FOOTER ---------- */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            {/* Brand Section */}
            <div className="footer-brand-section">
              <div className="flex items-center gap-2 mb-4">
                <img src="/src/assets/logo.svg" alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Product Showcase
                </span>
              </div>
              <p className="footer-desc mb-6">
                Discover the most amazing products at unbeatable prices.
                Quality, style, and innovation delivered to your doorstep.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">All Products</Link></li>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="footer-links-section">
              <h4>Customer Care</h4>
              <ul className="footer-links">
                <li><Link to="/profile">My Account</Link></li>
                <li><Link to="/cart">Shopping Cart</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter-section">
              <h4>Stay Updated</h4>
              <p className="footer-desc mb-4">Subscribe to get the latest products and best deals.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Product Showcase. All rights reserved.</p>
            <div className="payment-icons">
              {/* Using text/emoji for simplicity if icons aren't available, or simple spans */}
              <span className="payment-badge">Visa</span>
              <span className="payment-badge">Mastercard</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
