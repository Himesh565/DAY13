import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiMapPin, FiSettings, FiEdit2, FiSave, FiMail, FiPhone, FiCalendar, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { authAPI, orderAPI } from '../services/api';
import { getCurrentUser } from '../utils/auth';

export default function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('info');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Get user data from backend
    const [userData, setUserData] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: ''
    });

    // Order history - fetch from backend
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    // Saved addresses from checkout
    const [savedAddresses, setSavedAddresses] = useState([]);

    // Password change state
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Fetch user data from backend on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                // Check if token exists
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Please login first');
                    navigate('/login');
                    return;
                }

                // Fetch full user data from backend
                const fullUserData = await authAPI.getProfile();
                setUserData(fullUserData);
                setEditForm({
                    name: fullUserData.name,
                    email: fullUserData.email,
                    phone: fullUserData.phone
                });

                // Set addresses if available
                if (fullUserData.addresses && fullUserData.addresses.length > 0) {
                    setSavedAddresses(fullUserData.addresses.map((addr, index) => ({
                        id: index + 1,
                        ...addr
                    })));
                }

                // Fetch user's orders
                setLoadingOrders(true);
                try {
                    const userOrders = await orderAPI.getMyOrders();
                    setOrders(userOrders);
                } catch (err) {
                    console.error('Error fetching orders:', err);
                }
                setLoadingOrders(false);
            } catch (error) {
                console.error('===== Error fetching user data =====');
                console.error('Full error:', error);
                console.error('Error message:', error.message);
                console.error('Error response:', error.response);
                console.error('Error response data:', error.response?.data);
                console.error('Error response status:', error.response?.status);
                console.error('====================================');

                const errorMsg = error.response?.data?.message || error.message || 'Failed to load profile';
                toast.error(errorMsg);

                if (error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            setUserData(editForm);
            toast.success('Profile updated successfully!');
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) {
            return;
        }

        try {
            await orderAPI.delete(orderId);
            setOrders(orders.filter(order => order._id !== orderId));
            toast.success('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        console.log('Password change form submitted');

        // Trim passwords
        const currentPass = passwordForm.currentPassword?.trim() || '';
        const newPass = passwordForm.newPassword?.trim() || '';
        const confirmPass = passwordForm.confirmPassword?.trim() || '';

        // Validation
        if (!currentPass || !newPass || !confirmPass) {
            toast.error('Please fill in all password fields');
            return;
        }

        if (newPass.length < 6) {
            toast.error('New password must be at least 6 characters');
            return;
        }

        if (newPass !== confirmPass) {
            toast.error('New passwords do not match');
            return;
        }

        // Check if new password is same as current
        if (currentPass === newPass) {
            toast.error('New password must be different from current password');
            return;
        }

        try {
            setPasswordLoading(true);
            console.log('Calling password change API...');

            const result = await authAPI.changePassword(currentPass, newPass);
            console.log('Password change success:', result);

            toast.success('Password updated successfully!');

            // Clear form
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error changing password:', error);
            console.error('Error response:', error.response);

            let errorMessage = 'Failed to update password';

            if (error.response) {
                // Server responded with a status code
                errorMessage = error.response.data?.message || `Server Error (${error.response.status})`;
                if (error.response.status === 404) errorMessage = 'User not found. Please log in again.';
                if (error.response.status === 401) errorMessage = 'Session expired. Please log in again.';
            } else if (error.request) {
                // Request made but no response received
                errorMessage = 'No response from server. Please check your connection.';
            } else {
                // Something else happened
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setPasswordLoading(false);
        }
    };


    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you absolutely sure you want to delete your account? This action cannot be undone.'
        );

        if (!confirmed) return;

        // Double confirmation
        const doubleConfirm = window.confirm(
            'This is your last chance. Are you 100% sure you want to permanently delete your account?'
        );

        if (!doubleConfirm) return;

        try {
            await authAPI.deleteAccount();
            toast.success('Account deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error(error.response?.data?.message || 'Failed to delete account');
        }
    };

    const tabs = [
        { id: 'info', label: 'Personal Info', icon: FiUser },
        { id: 'orders', label: 'Order History', icon: FiPackage },
        { id: 'addresses', label: 'Saved Addresses', icon: FiMapPin },
        { id: 'settings', label: 'Settings', icon: FiSettings },
    ];

    const getOrderStatus = (order) => {
        const orderDate = new Date(order.createdAt);
        const now = new Date();
        const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) return { text: 'Order Confirmed', color: 'green' };
        if (daysDiff <= 2) return { text: 'Processing', color: 'yellow' };
        if (daysDiff <= 5) return { text: 'Out for Delivery', color: 'blue' };
        return { text: 'Delivered', color: 'green' };
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Show error if no user data
    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Failed to load profile</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                            <p className="text-white/90 flex items-center gap-2">
                                <FiMail size={16} /> {userData.email}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
                                <p className="text-sm text-white/80">Total Orders</p>
                                <p className="text-3xl font-bold">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-custom-card rounded-2xl shadow-lg overflow-hidden">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-700">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-gray-800 text-gray-400'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="hidden md:inline">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {/* Personal Info Tab */}
                        {activeTab === 'info' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Personal Information</h2>
                                    <button
                                        onClick={handleEditToggle}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {isEditing ? <><FiSave size={18} /> Save</> : <><FiEdit2 size={18} /> Edit</>}
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-800/50 rounded-lg">{userData.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-800/50 rounded-lg">{userData.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-800/50 rounded-lg">{userData.phone}</p>
                                        )}
                                    </div>


                                </div>

                                {/* Stats Cards */}
                                <div className="grid md:grid-cols-3 gap-6 mt-8">
                                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-600/30 rounded-xl p-6">
                                        <FiPackage className="text-blue-500 mb-3" size={32} />
                                        <p className="text-sm text-gray-400 mb-1">Total Orders</p>
                                        <p className="text-3xl font-bold">{orders.length}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-600/30 rounded-xl p-6">
                                        <FiTruck className="text-green-500 mb-3" size={32} />
                                        <p className="text-sm text-gray-400 mb-1">Delivered</p>
                                        <p className="text-3xl font-bold">
                                            {orders.filter(order => {
                                                const daysDiff = Math.floor((new Date() - new Date(order.date)) / (1000 * 60 * 60 * 24));
                                                return daysDiff > 5;
                                            }).length}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-600/30 rounded-xl p-6">
                                        <FiMapPin className="text-purple-500 mb-3" size={32} />
                                        <p className="text-sm text-gray-400 mb-1">Addresses</p>
                                        <p className="text-3xl font-bold">{savedAddresses.length}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order History Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Order History</h2>

                                {orders.length === 0 ? (
                                    <div className="text-center py-16">
                                        <FiPackage className="mx-auto text-6xl text-gray-400 mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                                        <p className="text-gray-400 mb-6">Start shopping to see your orders here!</p>
                                        <Link
                                            to="/products"
                                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Browse Products
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => {
                                            const status = getOrderStatus(order);
                                            return (
                                                <div key={order._id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <p className="text-sm text-gray-400">Order ID</p>
                                                            <p className="text-xl font-bold text-blue-500">{order._id.slice(-8)}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-400">Order Date</p>
                                                            <p className="font-semibold">
                                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center mb-4">
                                                        <div>
                                                            <p className="text-sm text-gray-400 mb-1">Status</p>
                                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${status.color === 'green' ? 'bg-green-500/20 text-green-400' :
                                                                status.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                                                    'bg-yellow-500/20 text-yellow-400'
                                                                }`}>
                                                                {status.text}
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-400 mb-1">Total</p>
                                                            <p className="text-2xl font-bold text-green-500">₹{order.total}</p>
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-gray-700 pt-4">
                                                        <p className="text-sm text-gray-400 mb-2">{order.items.length} item(s)</p>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {order.items.slice(0, 3).map((item, idx) => (
                                                                <img
                                                                    key={idx}
                                                                    src={item.imageUrl}
                                                                    alt={item.title}
                                                                    className="w-16 h-16 object-cover rounded"
                                                                />
                                                            ))}
                                                            {order.items.length > 3 && (
                                                                <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-sm font-semibold">
                                                                    +{order.items.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex gap-3">
                                                        <button
                                                            onClick={() => navigate(`/order-tracking/${order._id}`)}
                                                            className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition text-center"
                                                        >
                                                            Track Order
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteOrder(order._id)}
                                                            className="px-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Saved Addresses Tab */}
                        {activeTab === 'addresses' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Saved Addresses</h2>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                        + Add New Address
                                    </button>
                                </div>

                                {savedAddresses.length === 0 ? (
                                    <div className="text-center py-16">
                                        <FiMapPin className="mx-auto text-6xl text-gray-400 mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">No saved addresses</h3>
                                        <p className="text-gray-400 mb-6">Add an address for faster checkout!</p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {savedAddresses.map((address) => (
                                            <div key={address.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 relative">
                                                {address.isDefault && (
                                                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                        Default
                                                    </span>
                                                )}
                                                <p className="font-bold text-lg mb-2">{address.fullName}</p>
                                                <p className="text-gray-400 text-sm mb-1">{address.address}</p>
                                                <p className="text-gray-400 text-sm mb-3">
                                                    {address.city}, {address.state} {address.zipCode}
                                                </p>
                                                <p className="text-gray-400 text-sm mb-1">{address.phone}</p>
                                                <p className="text-gray-400 text-sm">{address.email}</p>

                                                <div className="flex gap-2 mt-4">
                                                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                                        Edit
                                                    </button>
                                                    <button className="px-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                                <div className="space-y-6">
                                    {/* Password Change */}
                                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                                        <form onSubmit={handlePasswordChange} className="space-y-4">
                                            <input
                                                type="password"
                                                placeholder="Current Password"
                                                value={passwordForm.currentPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            />
                                            <input
                                                type="password"
                                                placeholder="New Password (min 6 characters)"
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm New Password"
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            />
                                            <button
                                                type="submit"
                                                disabled={passwordLoading}
                                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {passwordLoading ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </form>
                                    </div>



                                    {/* Danger Zone */}
                                    <div className="bg-red-600/10 rounded-xl p-6 border border-red-600/30">
                                        <h3 className="text-lg font-semibold mb-2 text-red-500">Danger Zone</h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
