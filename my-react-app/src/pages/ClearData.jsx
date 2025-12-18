import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ClearData() {
    const navigate = useNavigate();
    const [cleared, setCleared] = React.useState(false);

    const handleClearData = () => {
        // Keep only token and currentUser
        const token = localStorage.getItem('token');
        const currentUser = localStorage.getItem('currentUser');

        // Clear everything
        localStorage.clear();

        // Restore backend auth data
        if (token) localStorage.setItem('token', token);
        if (currentUser) localStorage.setItem('currentUser', currentUser);

        setCleared(true);
        toast.success('Old data cleared! You can now login fresh.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-custom-card p-8 rounded-2xl border border-gray-700">
                <div className="text-center">
                    {!cleared ? (
                        <>
                            <FiTrash2 className="mx-auto text-6xl text-yellow-500 mb-4" />
                            <h1 className="text-2xl font-bold mb-4">Clear Old Data</h1>
                            <p className="text-gray-400 mb-6">
                                આ button click કરો તો જૂની localStorage data clear થશે અને નવી backend data સાચી રીતે કામ કરશે.
                            </p>
                            <p className="text-sm text-yellow-500 mb-6">
                                ⚠️ આ એક જ વાર કરવાનું છે!
                            </p>
                            <button
                                onClick={handleClearData}
                                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold mb-3"
                            >
                                Clear Old Data
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
                            <h1 className="text-2xl font-bold mb-4">Data Cleared!</h1>
                            <p className="text-gray-400 mb-6">
                                જૂની data clear થઈ ગઈ! હવે login કરો.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Go to Login
                            </button>
                        </>
                    )}
                </div>

                {!cleared && (
                    <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500 rounded-lg">
                        <p className="text-sm text-blue-400">
                            <strong>શું થશે:</strong><br />
                            • જૂની localStorage data clear થશે<br />
                            • તમારું JWT token રહેશે<br />
                            • Backend સાથે fresh connection થશે
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
