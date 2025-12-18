import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from 'react-icons/fi';
// import confetti from 'canvas-confetti'; // Package not installed

export default function OrderSuccess() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Get order details from localStorage
        const lastOrder = localStorage.getItem('lastOrder');

        if (!lastOrder) {
            navigate('/');
            return;
        }

        try {
            const orderData = JSON.parse(lastOrder);
            // Add date if it doesn't exist
            if (!orderData.date) {
                orderData.date = new Date().toISOString();
            }
            setOrder(orderData);
        } catch (error) {
            console.error('Failed to parse order data:', error);
            navigate('/');
            return;
        }

        // Confetti animation removed (package not available)
        /*
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            confetti({
                particleCount: 2,
                angle: randomInRange(55, 125),
                spread: randomInRange(50, 70),
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
            });
        }, 50);

        return () => clearInterval(interval);
        */
    }, [navigate]);

    if (!order) {
        return null;
    }

    const orderDate = new Date(order.date);
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    return (
        <div className="py-16">
            <div className="max-w-3xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8 relative">
                    <div className="inline-block">
                        <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <FiCheckCircle className="text-green-500" size={64} />
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Order Placed Successfully! 🎉
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                    Thank you for your purchase! Your order has been confirmed.
                </p>

                {/* Order Details Card */}
                <div className="bg-custom-card rounded-2xl shadow-lg p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {/* Order Info */}
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Order Number</p>
                            <p className="text-xl font-bold text-blue-500">{order.id}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-1">Order Date</p>
                            <p className="font-semibold">{orderDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-green-500">₹{order.total}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                            <p className="font-semibold capitalize">
                                {order.paymentMethod === 'card' ? 'Credit/Debit Card' :
                                    order.paymentMethod === 'paypal' ? 'PayPal' :
                                        'Cash on Delivery'}
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-700 my-6" />

                    {/* Shipping Address */}
                    <div className="text-left">
                        <p className="text-sm text-gray-400 mb-2">Shipping Address</p>
                        <p className="font-semibold">{order.shipping.fullName}</p>
                        <p className="text-sm text-gray-400">
                            {order.shipping.address}<br />
                            {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                        </p>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-custom-card rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Order Timeline</h2>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <FiCheckCircle size={24} />
                                </div>
                            </div>
                            <div className="text-left flex-1">
                                <p className="font-semibold">Order Confirmed</p>
                                <p className="text-sm text-gray-400">
                                    {orderDate.toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                    <FiPackage size={24} />
                                </div>
                            </div>
                            <div className="text-left flex-1">
                                <p className="font-semibold text-gray-400">Processing</p>
                                <p className="text-sm text-gray-500">Expected within 1-2 business days</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                    <FiTruck size={24} />
                                </div>
                            </div>
                            <div className="text-left flex-1">
                                <p className="font-semibold text-gray-400">Out for Delivery</p>
                                <p className="text-sm text-gray-500">
                                    Estimated delivery: {estimatedDelivery.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                    <FiHome size={24} />
                                </div>
                            </div>
                            <div className="text-left flex-1">
                                <p className="font-semibold text-gray-400">Delivered</p>
                                <p className="text-sm text-gray-500">Package delivered to your doorstep</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-custom-card rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Order Items</h2>

                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center bg-gray-800/50 rounded-lg p-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1 text-left">
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/products"
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-semibold inline-block"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        to="/"
                        className="bg-gray-700 text-white px-8 py-4 rounded-xl hover:bg-gray-600 transition font-semibold inline-block"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Thank You Message */}
                <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
                    <p className="text-lg mb-2">
                        ✨ Thank you for shopping with us!
                    </p>
                    <p className="text-gray-400">
                        You will receive an email confirmation at <span className="text-blue-400 font-semibold">{order.shipping.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
