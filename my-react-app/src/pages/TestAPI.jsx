import React, { useState } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function TestAPI() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const testBackendConnection = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/');
            const data = await response.json();
            setResult({ success: true, message: 'Backend Connected!', data });
            toast.success('Backend is running!');
        } catch (error) {
            setResult({ success: false, message: error.message });
            toast.error('Backend connection failed!');
        }
        setLoading(false);
    };

    const testRegister = async () => {
        setLoading(true);
        try {
            const data = await authAPI.register({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                phone: '1234567890',
                password: 'password123'
            });
            setResult({ success: true, message: 'Registration successful!', data });
            toast.success('Registration works!');
        } catch (error) {
            setResult({ success: false, message: error.message, error: error.response?.data });
            toast.error('Registration failed!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>

                <div className="space-y-4">
                    <button
                        onClick={testBackendConnection}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Testing...' : 'Test Backend Connection'}
                    </button>

                    <button
                        onClick={testRegister}
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? 'Testing...' : 'Test Register API'}
                    </button>
                </div>

                {result && (
                    <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`}>
                        <h3 className="font-bold mb-2">{result.success ? '✅ Success' : '❌ Error'}</h3>
                        <p className="mb-2">{result.message}</p>
                        <pre className="bg-black/50 p-3 rounded text-sm overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}

                <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-bold mb-2">Instructions:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Make sure backend is running: <code className="bg-black px-2 py-1 rounded">cd backend && node server.js</code></li>
                        <li>Click "Test Backend Connection" to verify backend is accessible</li>
                        <li>Click "Test Register API" to verify registration works</li>
                        <li>Check the results below</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
