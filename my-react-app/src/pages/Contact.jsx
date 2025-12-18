import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            const response = await contactAPI.submit({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            });

            toast.success(response.message || 'Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                <p className="text-custom-muted text-lg max-w-2xl mx-auto">
                    Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-custom-card p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                placeholder="What is this about?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition resize-none"
                                placeholder="Your message..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiSend size={18} />
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="bg-custom-card p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-600/10 p-3 rounded-lg">
                                    <FiMail className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <a href="mailto:support@productshowcase.com" className="text-custom-muted hover:text-blue-500 transition">
                                        support@productshowcase.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-green-600/10 p-3 rounded-lg">
                                    <FiPhone className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Phone</h3>
                                    <a href="tel:+918128677032" className="text-custom-muted hover:text-green-500 transition">
                                        +91 81286 77032
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-purple-600/10 p-3 rounded-lg">
                                    <FiMapPin className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Address</h3>
                                    <p className="text-custom-muted">
                                        Product Showcase<br />
                                        Gujarat, India<br />
                                        Pincode: 380001
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-custom-card p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Business Hours</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-custom-muted">Monday - Friday</span>
                                <span className="font-semibold">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-custom-muted">Saturday</span>
                                <span className="font-semibold">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-custom-muted">Sunday</span>
                                <span className="font-semibold">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
