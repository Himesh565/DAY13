import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiDollarSign, FiTruck, FiCheckCircle, FiLock, FiMapPin } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { orderAPI, authAPI } from '../services/api';

export default function Checkout() {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [formData, setFormData] = useState({
        // Shipping Info
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',

        // Payment Info
        paymentMethod: 'card',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});

    // Fetch saved addresses on component mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                console.log('Fetching user profile for saved addresses...');
                const userProfile = await authAPI.getProfile();
                console.log('User profile received:', userProfile);

                if (userProfile.addresses && userProfile.addresses.length > 0) {
                    console.log(`Found ${userProfile.addresses.length} saved addresses`);
                    setSavedAddresses(userProfile.addresses);
                } else {
                    console.log('No saved addresses found');
                }
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
                console.error('Error details:', error.response?.data);
            }
        };
        fetchAddresses();
    }, []);

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSelectAddress = (addressIndex) => {
        if (addressIndex === '') {
            // "New Address" selected - clear form
            setSelectedAddressId('');
            setFormData({
                ...formData,
                fullName: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
            });
        } else {
            // Saved address selected - populate form
            const address = savedAddresses[addressIndex];
            setSelectedAddressId(addressIndex);
            setFormData({
                ...formData,
                fullName: address.fullName || '',
                phone: address.phone || '',
                address: address.address || '',
                city: address.city || '',
                state: address.state || '',
                zipCode: address.zipCode || '',
            });
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        if (formData.paymentMethod === 'cod') return true;

        const newErrors = {};
        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
            else if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Invalid card number';
            if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
            if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
            else if (formData.cvv.length < 3) newErrors.cvv = 'Invalid CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && !validateStep1()) {
            toast.error('Please fill in all required fields');
            return;
        }
        if (currentStep === 2 && !validateStep2()) {
            toast.error('Please provide valid payment information');
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handlePlaceOrder = async () => {
        try {
            // 1. Create Order via API
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item._id || item.id,
                    quantity: item.quantity,
                    price: item.price,
                    title: item.title,
                    imageUrl: item.imageUrl
                })),
                subtotal: getCartTotal().toFixed(2),
                tax: (getCartTotal() * 0.1).toFixed(2),
                total: (getCartTotal() * 1.1).toFixed(2),
                shippingAddress: {
                    fullName: formData.fullName,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    zipCode: formData.zipCode,
                    phone: formData.phone
                },
                paymentMethod: formData.paymentMethod,
                paymentDetails: {
                    cardNumber: formData.cardNumber,
                    cardName: formData.cardName
                }
            };

            await orderAPI.create(orderData);

            // 2. Update User Profile with Address (if needed)
            // We construct the address object matching the User schema
            const addressData = {
                fullName: formData.fullName,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                phone: formData.phone,
                isDefault: true // Make it default for now
            };

            try {
                // This will push the address if it doesn't exist
                await authAPI.updateProfile({
                    phone: formData.phone, // Update phone if changed
                    address: addressData
                });
            } catch (err) {
                console.warn("Failed to save address to profile", err);
                // Don't block order success if profile update fails
            }

            toast.success('Order placed successfully!');
            clearCart();
            // Store order data with necessary fields for success page
            localStorage.setItem('lastOrder', JSON.stringify({
                ...orderData,
                id: 'ORD-' + Date.now(),
                date: new Date().toISOString(),
                shipping: {
                    ...orderData.shippingAddress,
                    email: formData.email
                }
            }));
            navigate('/order-success');
        } catch (error) {
            console.error("Order placement failed:", error);
            // Show explicit error from backend if available
            const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to place order';
            toast.error(`Order Error: ${errorMsg}`);
        }
    };

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const shipping = 0; // Free shipping
    const total = subtotal + tax + shipping;

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center">
                        {[1, 2, 3].map((step) => (
                            <React.Fragment key={step}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-400'
                                            }`}
                                    >
                                        {currentStep > step ? <FiCheckCircle size={24} /> : step}
                                    </div>
                                    <span className={`text-sm mt-2 ${currentStep >= step ? 'text-white' : 'text-gray-500'}`}>
                                        {step === 1 && 'Shipping'}
                                        {step === 2 && 'Payment'}
                                        {step === 3 && 'Review'}
                                    </span>
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-24 h-1 mx-4 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-700'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-custom-card p-8 rounded-2xl shadow-lg">
                            {/* Step 1: Shipping Information */}
                            {currentStep === 1 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <FiTruck className="text-blue-500" size={28} />
                                        <h2 className="text-2xl font-bold">Shipping Information</h2>
                                    </div>

                                    {/* Saved Address Selector */}
                                    {savedAddresses.length > 0 ? (
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold mb-2">
                                                <FiMapPin className="inline mr-2" />
                                                Select Saved Address
                                            </label>
                                            <select
                                                value={selectedAddressId}
                                                onChange={(e) => handleSelectAddress(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition"
                                            >
                                                <option value="">+ Enter New Address</option>
                                                {savedAddresses.map((addr, index) => (
                                                    <option key={index} value={index}>
                                                        {addr.fullName} - {addr.city}, {addr.state} ({addr.zipCode})
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedAddressId !== '' && (
                                                <p className="text-sm text-green-500 mt-2">
                                                    ✓ Address auto-filled from your saved addresses
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                            <p className="text-sm text-blue-400 flex items-center gap-2">
                                                <FiMapPin />
                                                <span>Your address will be saved after this order for faster checkout next time!</span>
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.fullName ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="John Doe"
                                            />
                                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="+91 98765 43210"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold mb-2">
                                                Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.address ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="123 Main Street"
                                            />
                                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="Ahmedabad"
                                            />
                                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                State <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.state ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="Gujarat"
                                            />
                                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                ZIP Code <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.zipCode ? 'border-red-500' : 'border-gray-700'
                                                    } focus:border-blue-500 focus:outline-none transition`}
                                                placeholder="380001"
                                            />
                                            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value="India"
                                                readOnly
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition cursor-not-allowed text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Method */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <FiLock className="text-green-500" size={28} />
                                        <h2 className="text-2xl font-bold">Payment Method</h2>
                                    </div>

                                    {/* Payment Method Selection */}
                                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                                        <button
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                            className={`p-6 rounded-xl border-2 transition ${formData.paymentMethod === 'card'
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-gray-700 hover:border-gray-600'
                                                }`}
                                        >
                                            <FiCreditCard size={32} className="mx-auto mb-3" />
                                            <p className="font-semibold">Credit/Debit Card</p>
                                            <div className="flex justify-center gap-2 mt-2">
                                                <FaCcVisa size={24} />
                                                <FaCcMastercard size={24} />
                                                <FaCcAmex size={24} />
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                                            className={`p-6 rounded-xl border-2 transition ${formData.paymentMethod === 'cod'
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-gray-700 hover:border-gray-600'
                                                }`}
                                        >
                                            <FiDollarSign size={32} className="mx-auto mb-3" />
                                            <p className="font-semibold">Cash on Delivery</p>
                                        </button>
                                    </div>

                                    {/* Card Details Form */}
                                    {formData.paymentMethod === 'card' && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">
                                                    Card Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-700'
                                                        } focus:border-blue-500 focus:outline-none transition`}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                />
                                                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2">
                                                    Cardholder Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.cardName ? 'border-red-500' : 'border-gray-700'
                                                        } focus:border-blue-500 focus:outline-none transition`}
                                                    placeholder="JOHN DOE"
                                                />
                                                {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Expiry Date <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-700'
                                                            } focus:border-blue-500 focus:outline-none transition`}
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                    />
                                                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        CVV <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.cvv ? 'border-red-500' : 'border-gray-700'
                                                            } focus:border-blue-500 focus:outline-none transition`}
                                                        placeholder="123"
                                                        maxLength="4"
                                                    />
                                                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}


                                    {formData.paymentMethod === 'cod' && (
                                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                                            <FiDollarSign size={48} className="mx-auto mb-4 text-green-500" />
                                            <p className="text-lg font-semibold mb-2">Cash on Delivery</p>
                                            <p className="text-sm text-gray-400">
                                                Pay with cash when your order is delivered to your doorstep.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Review Order */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <FiCheckCircle className="text-purple-500" size={28} />
                                        <h2 className="text-2xl font-bold">Review Your Order</h2>
                                    </div>

                                    {/* Shipping Details */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            <p className="font-semibold">{formData.fullName}</p>
                                            <p className="text-sm text-gray-400">{formData.email}</p>
                                            <p className="text-sm text-gray-400">{formData.phone}</p>
                                            <p className="text-sm text-gray-400 mt-2">
                                                {formData.address}<br />
                                                {formData.city}, {formData.state} {formData.zipCode}<br />
                                                {formData.country}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            {formData.paymentMethod === 'card' && (
                                                <div className="flex items-center gap-3">
                                                    <FiCreditCard size={24} />
                                                    <div>
                                                        <p className="font-semibold">Credit/Debit Card</p>
                                                        <p className="text-sm text-gray-400">
                                                            {formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {formData.paymentMethod === 'cod' && (
                                                <div className="flex items-center gap-3">
                                                    <FiDollarSign size={24} />
                                                    <p className="font-semibold">Cash on Delivery</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                                        <div className="space-y-3">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex gap-4 bg-gray-800/50 rounded-lg p-3">
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold">{item.title}</p>
                                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 mt-8">
                                {currentStep > 1 && (
                                    <button
                                        onClick={handleBack}
                                        className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                                    >
                                        Back
                                    </button>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                                    >
                                        Continue
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                                    >
                                        Place Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-custom-card p-6 rounded-2xl shadow-lg sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Subtotal ({cartItems.length} items)</span>
                                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Shipping</span>
                                    <span className="font-semibold text-green-500">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Tax (10%)</span>
                                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                                </div>
                                <hr className="border-gray-700" />
                                <div className="flex justify-between text-lg">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold text-blue-500">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-sm text-center">
                                <p className="text-green-500 font-semibold">✓ Free Shipping on All Orders</p>
                            </div>

                            <div className="mt-4 text-xs text-gray-500 text-center">
                                <FiLock className="inline mr-1" />
                                Secure SSL Encrypted Payment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
