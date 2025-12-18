import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../styles/product-card.css";
import { useProductContext } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductCard({ productId }) {
  const { getProductById } = useProductContext();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const product = getProductById(productId);

  if (!product) return null;

  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to purchase");
      navigate('/login');
      return;
    }
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }
    // Add to cart and navigate directly to checkout
    addToCart(product);
    toast.success('Proceeding to checkout...');
    navigate('/checkout');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="product-card">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="wishlist-btn"
        aria-label="Add to wishlist"
      >
        <FiHeart
          className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}
          size={20}
        />
      </button>

      {/* Badges */}
      {product.discount > 0 && (
        <span className="discount-badge">-{product.discount}%</span>
      )}
      {product.isNew && <span className="new-badge">NEW</span>}
      {!product.inStock && <span className="stock-badge">Out of Stock</span>}

      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="product-image">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
        />
      </Link>

      {/* Product Details */}
      <div className="product-content">
        <p className="product-category">{product.category}</p>

        <h3 className="product-title">
          <Link to={`/products/${product.id}`}>
            {product.title}
          </Link>
        </h3>

        {/* Rating */}
        <div className="rating-container">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <p className="product-desc">{product.description}</p>

        {/* Price */}
        <div className="price-container">
          <span className="product-price">₹{product.price}</span>
          {product.discount > 0 && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Actions */}
        <div className="product-actions">
          <button
            onClick={handleAddToCart}
            className="btn btn-cart"
            disabled={!product.inStock}
          >
            <FiShoppingCart size={18} />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            onClick={handleBuyNow}
            className="btn btn-buy-now"
            disabled={!product.inStock}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
