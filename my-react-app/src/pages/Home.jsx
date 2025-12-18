import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductContext";
import { FiTruck, FiShield, FiAward, FiRefreshCw } from "react-icons/fi";

export default function Home() {
  const { products } = useProductContext();

  // Featured products (products marked as featured)
  const featured = products.filter(p => p.featured).slice(0, 4);

  // New arrivals
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div>

      {/* ---------- HERO SECTION ---------- */}
      <section
        className="hero hero-animate relative overflow-hidden py-24 px-8 rounded-3xl text-white mb-12 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
            Discover Amazing Products ✨
          </h1>

          <p className="max-w-2xl leading-relaxed text-xl font-medium text-white/95 mb-8 animate-slide-up">
            Shop the latest and greatest products with unbeatable prices.
            Free shipping on all orders. Quality guaranteed.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to="/products"
              className="btn inline-flex items-center gap-2 text-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold border border-white/20 transition-all duration-300"
            >
              Shop Now <span className="text-xl">→</span>
            </Link>
            <Link
              to="/about"
              className="btn inline-flex items-center gap-2 text-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-custom-card p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FiTruck className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
          <p className="text-sm text-custom-muted">On all orders above ₹500</p>
        </div>
        <div className="bg-custom-card p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FiShield className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
          <p className="text-sm text-custom-muted">100% secure transactions</p>
        </div>
        <div className="bg-custom-card p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FiAward className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h3 className="font-bold text-lg mb-2">Best Quality</h3>
          <p className="text-sm text-custom-muted">Premium products only</p>
        </div>
        <div className="bg-custom-card p-6 rounded-xl text-center hover:scale-105 transition-transform">
          <FiRefreshCw className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
          <p className="text-sm text-custom-muted">30-day return policy</p>
        </div>
      </section>

      {/* ---------- FEATURED PRODUCTS ---------- */}
      {featured.length > 0 && (
        <section className="section mb-16">
          <h2 className="text-3xl font-bold mb-3">🔥 Featured Products</h2>
          <p className="text-custom-muted mb-8">
            Top picks specially selected for you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------- NEW ARRIVALS ---------- */}
      {newArrivals.length > 0 && (
        <section className="section mb-16">
          <h2 className="text-3xl font-bold mb-3">✨ New Arrivals</h2>
          <p className="text-custom-muted mb-8">
            Check out our latest products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------- CTA SECTION ---------- */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Browse our full catalog of amazing products at unbeatable prices
        </p>
        <Link
          to="/products"
          className="btn inline-flex items-center gap-2 text-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold border border-white/20 transition-all duration-300"
        >
          View All Products <span className="text-xl">→</span>
        </Link>
      </section>

    </div>
  );
}
