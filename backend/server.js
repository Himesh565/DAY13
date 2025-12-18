const express = require('express');
// Forced restart for debugging (Attempt 2)
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: true, // Allow all origins for now to fix the blockage
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
        // Log body but hide password fields
        const safeBody = { ...req.body };
        if (safeBody.password) safeBody.password = '***';
        if (safeBody.currentPassword) safeBody.currentPassword = '***';
        if (safeBody.newPassword) safeBody.newPassword = '***';
        console.log('Body:', safeBody);
    }
    next();
});


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/contact', require('./routes/contact'));

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce Backend API is running! 🚀' });
});

// Start Server
// Start Server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
