const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await user.save();

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        console.log('=== Profile request received ===');

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.log('No token provided in profile request');
            return res.status(401).json({ message: 'No auth token' });
        }

        console.log('Token found, verifying...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified, user ID:', decoded.userId);

        const user = await User.findById(decoded.userId).select('-password');
        console.log('User found:', user ? user.email : 'NOT FOUND');

        if (!user) {
            console.log('User not found in database');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Sending user profile data');
        res.json(user);
    } catch (error) {
        console.error('Error in profile route:', error);
        console.error('Error message:', error.message);
        res.status(401).json({ message: 'Invalid token: ' + error.message });
    }
});


// Update user profile
router.put('/profile', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No auth token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fields to update
        const { name, phone, address } = req.body;
        const updateFields = {};
        if (name) updateFields.name = name;
        if (phone) updateFields.phone = phone;

        // Handle address update (append to addresses array)
        if (address) {
            const user = await User.findById(decoded.userId);
            if (user) {
                // Check if address already exists to avoid duplicates (simple check)
                const addressExists = user.addresses.some(a =>
                    a.address === address.address &&
                    a.zipCode === address.zipCode
                );

                if (!addressExists) {
                    user.addresses.push(address);
                    await user.save();
                    return res.json(user);
                }
            }
        }

        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { $set: updateFields },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users (admin route)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Change password
router.post('/change-password', async (req, res) => {
    try {
        console.log('Password change request received');

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No auth token' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified for user:', decoded.userId);
        } catch (err) {
            console.log('Token verification failed:', err.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const { currentPassword, newPassword } = req.body;
        console.log('Passwords received:', {
            hasCurrentPassword: !!currentPassword,
            hasNewPassword: !!newPassword,
            newPasswordLength: newPassword?.length
        });

        // Validate input
        if (!currentPassword || !newPassword) {
            console.log('Missing password fields');
            return res.status(400).json({ message: 'Please provide both current and new password' });
        }

        // Trim whitespace
        const trimmedCurrentPassword = currentPassword.trim();
        const trimmedNewPassword = newPassword.trim();

        if (trimmedNewPassword.length < 6) {
            console.log('New password too short:', trimmedNewPassword.length);
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Get user with password
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.log('User not found:', decoded.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user.email);

        // Verify current password
        const isMatch = await bcrypt.compare(trimmedCurrentPassword, user.password);
        if (!isMatch) {
            console.log('Current password incorrect for user:', user.email);
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        console.log('Current password verified');

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(trimmedNewPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        console.log('Password updated successfully for user:', user.email);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error in change-password route:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


// Delete account
router.delete('/delete-account', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No auth token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Delete user
        const user = await User.findByIdAndDelete(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

