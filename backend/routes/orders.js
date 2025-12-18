const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Middleware to verify token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No auth token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Create order
router.post('/', auth, async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
            userId: req.userId
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        // Log to file (Absolute path)
        try {
            // Use absolute path to avoid cwd issues
            const logPath = 'd:/internship/DAY 13/backend/error.log';
            const errorLog = `[${new Date().toISOString()}] Error creating order: ${error.message}\nStack: ${error.stack}\nBody: ${JSON.stringify(req.body)}\n\n`;
            fs.appendFileSync(logPath, errorLog);
        } catch (fileErr) {
            console.error("File write failed", fileErr);
        }

        console.error("Error creating order:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message, errors: error.errors });
        }

        // Return detailed error
        const errorDetails = {};
        Object.getOwnPropertyNames(error).forEach(key => {
            errorDetails[key] = error[key];
        });

        // Also capture message explicitly
        res.status(500).json({ message: error.message || 'Server error', details: errorDetails });
    }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId })
            .populate('items.productId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.userId
        }).populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete order
router.delete('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId // Ensure user can only delete their own orders
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
