import React from 'react';
import { FiShield, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Privacy() {
    return (
        <div className="py-12 px-4 max-w-4xl mx-auto">
            <Link to="/register" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6 transition">
                <FiArrowLeft className="mr-2" /> Back to Sign Up
            </Link>

            <div className="bg-custom-card rounded-2xl p-8 shadow-xl border border-gray-700">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center text-green-500">
                        <FiShield size={24} />
                    </div>
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                </div>

                <div className="space-y-6 text-gray-300">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase, or communicate with us. This may include your name, email address, phone number, and shipping address.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions, manage your account, and send you related information, such as confirmations and invoices.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal information. You can manage your account settings at any time by logging into your profile.</p>
                    </section>

                    <p className="text-sm text-gray-500 mt-8 pt-6 border-t border-gray-700">
                        Last updated: December 17, 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
