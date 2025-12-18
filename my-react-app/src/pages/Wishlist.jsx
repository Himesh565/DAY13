import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

export default function Wishlist() {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (item) => {
        addToCart(item);
        removeFromWishlist(item.id);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <FiHeart className="mx-auto text-6xl text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-6">Save your favorite products here!</p>
                <Link
                    to="/products"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length})</h1>
                <button
                    onClick={clearWishlist}
                    className="text-red-600 hover:text-red-700 transition"
                >
                    Clear Wishlist
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
                    >
                        <Link to={`/products/${item.id}`} className="block relative">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                            />
                            {item.discount > 0 && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                                    -{item.discount}%
                                </span>
                            )}
                        </Link>

                        <div className="p-4">
                            <Link to={`/products/${item.id}`}>
                                <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                {item.category}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold">₹{item.price}</span>
                                {item.discount > 0 && (
                                    <span className="text-gray-500 line-through text-sm">
                                        ₹{item.originalPrice}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                    <FiShoppingCart size={18} />
                                    <span>Add to Cart</span>
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="px-4 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
