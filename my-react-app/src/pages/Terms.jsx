import React from 'react';
import { FiFileText, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="py-12 px-4 max-w-4xl mx-auto">
            <Link to="/register" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6 transition">
                <FiArrowLeft className="mr-2" /> Back to Sign Up
            </Link>

            <div className="bg-custom-card rounded-2xl p-8 shadow-xl border border-gray-700">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                        <FiFileText size={24} />
                    </div>
                    <h1 className="text-3xl font-bold">Terms and Conditions</h1>
                </div>

                <div className="space-y-6 text-gray-300">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                        <p>Welcome to Product Showcase. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. User Accounts</h2>
                        <p>To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Privacy</h2>
                        <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and share information about you.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Products and Purchases</h2>
                        <p>All products listed on the website are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at support@productshowcase.com.</p>
                    </section>

                    <p className="text-sm text-gray-500 mt-8 pt-6 border-t border-gray-700">
                        Last updated: December 17, 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
