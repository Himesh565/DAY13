import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Add some products to get started!</p>
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
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 transition"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4"
                            >
                                <Link to={`/products/${item.id}`} className="flex-shrink-0">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                </Link>

                                <div className="flex-1">
                                    <Link to={`/products/${item.id}`}>
                                        <h3 className="font-semibold text-lg hover:text-blue-600 transition">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {item.category}
                                    </p>
                                    <p className="text-xl font-bold mt-2">₹{item.price}</p>
                                </div>

                                <div className="flex flex-col justify-between items-end">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-700 transition"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>

                                    <div className="flex items-center gap-2 border rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="px-4 font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-semibold">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                                <span className="font-semibold">₹{(getCartTotal() * 0.1).toFixed(2)}</span>
                            </div>
                            <hr className="dark:border-gray-700" />
                            <div className="flex justify-between text-lg">
                                <span className="font-bold">Total</span>
                                <span className="font-bold text-blue-600">
                                    ₹{(getCartTotal() * 1.1).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold block text-center"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/products"
                            className="block text-center mt-4 text-blue-600 hover:text-blue-700 transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
