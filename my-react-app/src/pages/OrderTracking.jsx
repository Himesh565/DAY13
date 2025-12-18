import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function OrderTracking() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const orderData = await orderAPI.getById(orderId);
            setOrder(orderData);
        } catch (error) {
            console.error('Error fetching order:', error);
            toast.error('Failed to load order details');
            navigate('/profile');
        } finally {
            setLoading(false);
        }
    };

    const getOrderStatus = (order) => {
        const orderDate = new Date(order.createdAt);
        const now = new Date();
        const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) return { text: 'Order Confirmed', color: 'green', progress: 25 };
        if (daysDiff <= 2) return { text: 'Processing', color: 'yellow', progress: 50 };
        if (daysDiff <= 5) return { text: 'Out for Delivery', color: 'blue', progress: 75 };
        return { text: 'Delivered', color: 'green', progress: 100 };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) return null;

    const status = getOrderStatus(order);
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
                >
                    <FiArrowLeft size={20} />
                    Back to Profile
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
                            <p className="text-white/90">Order ID: #{order._id.slice(-8)}</p>
                            <p className="text-white/80 text-sm mt-1">Placed on {orderDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-white/80 mb-1">Total Amount</p>
                            <p className="text-4xl font-bold">₹{order.total}</p>
                        </div>
                    </div>
                </div>

                {/* Order Status Timeline */}
                <div className="bg-custom-card rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Order Status</h2>

                    {/* Status Badge */}
                    <div className="mb-6">
                        <span className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${status.color === 'green' ? 'bg-green-500/20 text-green-400' :
                                status.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {status.text}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${status.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-400">{status.progress}% Complete</p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                        <TimelineItem
                            icon={FiCheckCircle}
                            title="Order Confirmed"
                            completed={true}
                        />
                        <TimelineItem
                            icon={FiClock}
                            title="Processing"
                            completed={status.progress >= 50}
                        />
                        <TimelineItem
                            icon={FiTruck}
                            title="Out for Delivery"
                            completed={status.progress >= 75}
                        />
                        <TimelineItem
                            icon={FiPackage}
                            title="Delivered"
                            completed={status.progress === 100}
                        />
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-custom-card rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FiMapPin className="text-purple-500" size={24} />
                        <h2 className="text-2xl font-bold">Shipping Address</h2>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <p className="font-semibold mb-2">{order.shippingAddress?.fullName || 'N/A'}</p>
                        <p className="text-gray-400 text-sm">{order.shippingAddress?.address || 'N/A'}</p>
                        <p className="text-gray-400 text-sm">
                            {order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} {order.shippingAddress?.zipCode || ''}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Phone: {order.shippingAddress?.phone || 'N/A'}</p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-custom-card rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Order Items ({order.items.length})</h2>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 bg-gray-800/50 rounded-lg p-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-400">Price: ₹{item.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Timeline Item Component
function TimelineItem({ icon: Icon, title, completed }) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${completed
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                <Icon size={24} />
            </div>
            <div className="flex-1">
                <p className={`font-semibold ${completed ? 'text-white' : 'text-gray-400'}`}>
                    {title}
                </p>
            </div>
            {completed && (
                <FiCheckCircle className="text-green-400" size={24} />
            )}
        </div>
    );
}
