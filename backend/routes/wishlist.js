const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Middleware to verify token
const auth = (req, res, next) => {
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

// Get user's wishlist
router.get('/', auth, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.userId }).populate('products.productId');

        if (!wishlist) {
            // Create empty wishlist if doesn't exist
            wishlist = new Wishlist({ userId: req.userId, products: [] });
            await wishlist.save();
        }

        res.json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to wishlist
router.post('/', auth, async (req, res) => {
    try {
        const { productId } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ userId: req.userId });

        if (!wishlist) {
            // Create new wishlist
            wishlist = new Wishlist({
                userId: req.userId,
                products: [{ productId }]
            });
        } else {
            // Check if item already in wishlist
            const itemExists = wishlist.products.some(
                item => item.productId.toString() === productId
            );

            if (itemExists) {
                return res.status(400).json({ message: 'Item already in wishlist' });
            }

            // Add new item
            wishlist.products.push({ productId });
        }

        await wishlist.save();
        await wishlist.populate('products.productId');

        res.json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from wishlist
router.delete('/:productId', auth, async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ userId: req.userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(
            item => item.productId.toString() !== productId
        );

        await wishlist.save();
        await wishlist.populate('products.productId');

        res.json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear wishlist
router.delete('/', auth, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = [];
        await wishlist.save();

        res.json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
