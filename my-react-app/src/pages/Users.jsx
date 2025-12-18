import React, { useEffect, useState } from 'react';
import { FiUsers, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/auth/users');
            setUsers(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">{error}</p>
                    <button
                        onClick={fetchUsers}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FiUsers className="text-blue-500" size={32} />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            All Users
                        </h1>
                    </div>
                    <p className="text-gray-400">
                        Total Users: <span className="text-white font-semibold">{users.length}</span>
                    </p>
                </div>

                {/* Users Grid */}
                {users.length === 0 ? (
                    <div className="bg-custom-card rounded-xl p-12 text-center border border-gray-700">
                        <FiUsers className="mx-auto mb-4 text-gray-500" size={64} />
                        <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
                        <p className="text-gray-400">No registered users yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="bg-custom-card rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                            >
                                {/* User Avatar */}
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-xl font-semibold">{user.name}</h3>
                                        <p className="text-sm text-gray-400">User ID: {user._id.slice(-8)}</p>
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <FiMail className="text-blue-400" size={18} />
                                        <span className="text-sm truncate">{user.email}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-300">
                                        <FiPhone className="text-green-400" size={18} />
                                        <span className="text-sm">{user.phone}</span>
                                    </div>


                                </div>

                                {/* Addresses Count */}
                                {user.addresses && user.addresses.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-sm text-gray-400">
                                            📍 {user.addresses.length} saved address{user.addresses.length !== 1 ? 'es' : ''}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
