import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle, FiPackage, FiTruck, FiCreditCard, FiShoppingCart, FiRefreshCw } from 'react-icons/fi';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqCategories = [
        {
            category: "General Questions",
            icon: FiHelpCircle,
            color: "blue",
            faqs: [
                {
                    question: "What is Product Showcase?",
                    answer: "Product Showcase is your one-stop destination for discovering amazing products at unbeatable prices. We offer a wide range of quality products delivered right to your doorstep with excellent customer service."
                },
                {
                    question: "How do I create an account?",
                    answer: "Click on the 'Sign Up' button in the top right corner of the website. Fill in your name, email, phone number, and create a secure password. Once registered, you can start shopping immediately!"
                },
                {
                    question: "Is my personal information secure?",
                    answer: "Yes! We take your privacy seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your consent. Read our Privacy Policy for more details."
                },
                {
                    question: "How can I contact customer support?",
                    answer: "You can reach us through our Contact page, email us at support@productshowcase.com, or call us at +91 98765 43210. Our customer support team is available Monday to Friday, 9 AM to 6 PM IST."
                }
            ]
        },
        {
            category: "Orders & Shopping",
            icon: FiShoppingCart,
            color: "green",
            faqs: [
                {
                    question: "How do I place an order?",
                    answer: "Browse our products, click 'Add to Cart' on items you like, then go to your cart and click 'Proceed to Checkout'. Fill in your shipping information, select a payment method, and confirm your order."
                },
                {
                    question: "Can I modify or cancel my order?",
                    answer: "You can cancel your order within 1 hour of placing it by contacting our customer support. After that, the order enters processing and cannot be cancelled. However, you can return it once delivered according to our return policy."
                },
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept Credit/Debit Cards (Visa, Mastercard, American Express) and Cash on Delivery (COD) for your convenience."
                },
                {
                    question: "Do you save my card information?",
                    answer: "No, we do not store your complete card details. Payment information is processed securely through our payment gateway and we only save the last 4 digits for your order records."
                },
                {
                    question: "How do I apply a discount code?",
                    answer: "During checkout, you'll find a 'Discount Code' field. Enter your code and click 'Apply'. The discount will be reflected in your order total before you complete the payment."
                }
            ]
        },
        {
            category: "Shipping & Delivery",
            icon: FiTruck,
            color: "purple",
            faqs: [
                {
                    question: "What are the shipping charges?",
                    answer: "Great news! We offer FREE SHIPPING on all orders. No minimum purchase required. Your order will be delivered to your doorstep at no extra cost."
                },
                {
                    question: "How long does delivery take?",
                    answer: "Standard delivery takes 5-7 business days. You can track your order status in your Profile → Order History section. You'll receive email updates at each stage of delivery."
                },
                {
                    question: "Do you ship internationally?",
                    answer: "Currently, we only ship within India. We're working on expanding to international shipping soon. Stay tuned for updates!"
                },
                {
                    question: "Can I change my delivery address?",
                    answer: "You can update your delivery address within 1 hour of placing the order by contacting customer support. Once the order is dispatched, the address cannot be changed."
                },
                {
                    question: "What if I'm not home during delivery?",
                    answer: "Our delivery partner will attempt delivery 3 times. If all attempts fail, the package will be returned to us and you'll receive a full refund. We recommend providing a safe delivery location or alternate contact in delivery notes."
                }
            ]
        },
        {
            category: "Returns & Refunds",
            icon: FiRefreshCw,
            color: "orange",
            faqs: [
                {
                    question: "What is your return policy?",
                    answer: "We offer a 7-day return policy from the date of delivery. Products must be unused, in original packaging with all tags intact. Return shipping is free for defective or wrong items."
                },
                {
                    question: "How do I return a product?",
                    answer: "Go to Profile → Order History, select the order, and click 'Return Item'. Choose the reason for return and submit. Our team will arrange a pickup within 2-3 business days."
                },
                {
                    question: "When will I receive my refund?",
                    answer: "Once we receive and verify the returned product, refunds are processed within 5-7 business days. The amount will be credited to your original payment method."
                },
                {
                    question: "Are there any items that cannot be returned?",
                    answer: "Due to hygiene reasons, we cannot accept returns on personal care items, undergarments, and perishable goods. All other products are eligible for return within 7 days."
                }
            ]
        },
        {
            category: "Account & Profile",
            icon: FiPackage,
            color: "pink",
            faqs: [
                {
                    question: "How do I track my orders?",
                    answer: "Login to your account and go to Profile → Order History. You'll see all your orders with their current status. Click on any order to see detailed tracking information."
                },
                {
                    question: "Can I save multiple addresses?",
                    answer: "Yes! Your shipping addresses are automatically saved after each order. You can view and manage them in Profile → Saved Addresses. During checkout, you can quickly select from your saved addresses."
                },
                {
                    question: "How do I change my password?",
                    answer: "Go to Profile → Settings → Change Password. Enter your current password and your new password twice to confirm. Make sure your new password is at least 6 characters long."
                },
                {
                    question: "I forgot my password. What should I do?",
                    answer: "Click on 'Forgot Password?' on the login page. Enter your registered email address and we'll send you a password reset link. Check your spam folder if you don't see the email within a few minutes."
                }
            ]
        },
        {
            category: "Payment & Billing",
            icon: FiCreditCard,
            color: "teal",
            faqs: [
                {
                    question: "Is online payment secure?",
                    answer: "Absolutely! We use industry-standard SSL encryption for all transactions. Your payment information is processed through secure payment gateways and is never stored on our servers."
                },
                {
                    question: "What if my payment fails?",
                    answer: "If payment fails, the amount will be automatically refunded to your account within 3-5 business days. You can try placing the order again or choose a different payment method."
                },
                {
                    question: "Can I pay Cash on Delivery (COD)?",
                    answer: "Yes! We offer Cash on Delivery for all orders. Simply select 'Cash on Delivery' as your payment method during checkout and pay when your order arrives."
                },
                {
                    question: "Do you provide invoices?",
                    answer: "Yes, a detailed invoice is included with every order. You can also download your invoice from Profile → Order History → View Order Details → Download Invoice."
                }
            ]
        }
    ];

    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-400">
                        Find answers to common questions about our products, shipping, and services
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqCategories.map((category, categoryIndex) => {
                        const Icon = category.icon;
                        return (
                            <div key={categoryIndex} className="bg-custom-card rounded-2xl shadow-lg overflow-hidden border border-gray-700">
                                {/* Category Header */}
                                <div className={`bg-${category.color}-600/10 border-b border-${category.color}-600/30 p-6`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl bg-${category.color}-600/20`}>
                                            <Icon className={`text-${category.color}-500`} size={28} />
                                        </div>
                                        <h2 className="text-2xl font-bold">{category.category}</h2>
                                    </div>
                                </div>

                                {/* FAQs List */}
                                <div className="divide-y divide-gray-700">
                                    {category.faqs.map((faq, faqIndex) => {
                                        const globalIndex = `${categoryIndex}-${faqIndex}`;
                                        const isOpen = openIndex === globalIndex;

                                        return (
                                            <div key={faqIndex} className="transition-all">
                                                <button
                                                    onClick={() => toggleFAQ(globalIndex)}
                                                    className="w-full text-left p-6 hover:bg-gray-800/50 transition-colors flex justify-between items-center gap-4"
                                                >
                                                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                                    {isOpen ? (
                                                        <FiChevronUp className="flex-shrink-0 text-blue-500" size={24} />
                                                    ) : (
                                                        <FiChevronDown className="flex-shrink-0 text-gray-400" size={24} />
                                                    )}
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 pb-6 text-gray-300 leading-relaxed animate-fadeIn">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Still Have Questions? */}
                <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 text-center">
                    <FiHelpCircle className="mx-auto text-blue-500 mb-4" size={48} />
                    <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                    <p className="text-gray-300 mb-6">
                        Can't find the answer you're looking for? Our customer support team is here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold inline-block"
                        >
                            Contact Support
                        </a>
                        <a
                            href="mailto:support@productshowcase.com"
                            className="bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition font-semibold inline-block"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
