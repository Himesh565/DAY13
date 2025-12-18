const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    {
        title: "Aurora Wireless Headphones",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
        price: 129,
        originalPrice: 179,
        discount: 28,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        rating: 4.5,
        reviews: 328,
        inStock: true,
        stock: 45,
        featured: true,
        isNew: false,
        specs: ["Bluetooth 5.3", "Active Noise Cancelling", "30hr Battery", "USB-C Charging"]
    },
    {
        title: "Mechanical Gaming Keyboard",
        description: "RGB mechanical keyboard with Cherry MX switches and customizable backlighting.",
        price: 89,
        originalPrice: 129,
        discount: 31,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        rating: 4.7,
        reviews: 542,
        inStock: true,
        stock: 32,
        featured: true,
        isNew: false,
        specs: ["Cherry MX Blue", "RGB Lighting", "Programmable Keys", "USB Passthrough"]
    },
    {
        title: "Smart Fitness Watch",
        description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
        price: 199,
        originalPrice: 299,
        discount: 33,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        rating: 4.4,
        reviews: 891,
        inStock: true,
        stock: 28,
        featured: false,
        isNew: true,
        specs: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"]
    },
    {
        title: "Professional Desk Lamp",
        description: "LED desk lamp with adjustable brightness and color temperature control.",
        price: 45,
        originalPrice: 65,
        discount: 31,
        category: "Home",
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        rating: 4.6,
        reviews: 234,
        inStock: true,
        stock: 67,
        featured: false,
        isNew: false,
        specs: ["LED Technology", "Touch Control", "Adjustable Brightness", "USB Charging Port"]
    },
    {
        title: "Ergonomic Office Chair",
        description: "Premium office chair with lumbar support and adjustable armrests.",
        price: 299,
        originalPrice: null,
        discount: 0,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
        rating: 4.8,
        reviews: 456,
        inStock: true,
        stock: 15,
        featured: true,
        isNew: false,
        specs: ["Lumbar Support", "Adjustable Height", "Breathable Mesh", "360° Swivel"]
    },
    // Add more products (total 22)
    {
        title: "Portable Bluetooth Speaker",
        description: "Waterproof wireless speaker with 360-degree sound and 24-hour battery.",
        price: 79,
        originalPrice: 99,
        discount: 20,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        rating: 4.3,
        reviews: 678,
        inStock: true,
        stock: 52,
        featured: false,
        isNew: true,
        specs: ["360° Sound", "IPX7 Waterproof", "24hr Battery", "USB-C Fast Charging"]
    },
    {
        title: "Premium Coffee Maker",
        description: "Programmable coffee maker with thermal carafe and auto-brew timer.",
        price: 129,
        originalPrice: 189,
        discount: 32,
        category: "Home",
        imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
        rating: 4.5,
        reviews: 345,
        inStock: true,
        stock: 23,
        featured: false,
        isNew: false,
        specs: ["Programmable", "Thermal Carafe", "Auto Brew", "Pause & Serve"]
    },
    {
        title: "Wireless Gaming Mouse",
        description: "Ultra-lightweight gaming mouse with 16000 DPI and customizable buttons.",
        price: 69,
        originalPrice: 99,
        discount: 30,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        rating: 4.6,
        reviews: 892,
        inStock: true,
        stock: 41,
        featured: true,
        isNew: false,
        specs: ["16000 DPI", "RGB Lighting", "6 Programmable Buttons", "70hr Battery"]
    },
    {
        title: "Yoga Mat Premium",
        description: "Non-slip yoga mat with extra cushioning and carrying strap.",
        price: 39,
        originalPrice: 59,
        discount: 34,
        category: "Sports",
        imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
        rating: 4.7,
        reviews: 567,
        inStock: true,
        stock: 89,
        featured: false,
        isNew: true,
        specs: ["Non-Slip Surface", "Extra Thick", "Eco-Friendly", "Carrying Strap"]
    },
    {
        title: "Standing Desk",
        description: "Electric height-adjustable standing desk with memory presets.",
        price: 449,
        originalPrice: 599,
        discount: 25,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c",
        rating: 4.9,
        reviews: 234,
        inStock: true,
        stock: 12,
        featured: true,
        isNew: false,
        specs: ["Electric Motor", "Memory Presets", "Collision Detection", "Cable Management"]
    },
    {
        title: "4K Webcam",
        description: "Professional 4K webcam with auto-focus and built-in microphone.",
        price: 119,
        originalPrice: 159,
        discount: 25,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da",
        rating: 4.4,
        reviews: 423,
        inStock: true,
        stock: 34,
        featured: false,
        isNew: false,
        specs: ["4K Resolution", "Auto-Focus", "Built-in Mic", "USB Plug & Play"]
    },
    {
        title: "Designer Backpack",
        description: "Premium laptop backpack with USB charging port and water-resistant fabric.",
        price: 79,
        originalPrice: 119,
        discount: 34,
        category: "Fashion",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        rating: 4.5,
        reviews: 789,
        inStock: true,
        stock: 56,
        featured: false,
        isNew: true,
        specs: ["USB Charging Port", "Water Resistant", "Laptop Compartment", "Anti-theft Pocket"]
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products added to database!`);

        mongoose.connection.close();
        console.log('✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedProducts();
