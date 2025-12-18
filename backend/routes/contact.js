const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
    try {
        console.log('Contact form submission received:', req.body);

        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                message: 'Please provide name, email, and message'
            });
        }

        // Create new contact message
        const contactMessage = new Contact({
            name,
            email,
            subject: subject || 'No subject',
            message
        });

        await contactMessage.save();

        console.log('Contact message saved:', contactMessage._id);

        res.status(201).json({
            message: 'Message sent successfully! We\'ll get back to you soon.',
            contactId: contactMessage._id
        });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again.' });
    }
});

// Get all contact messages (admin route)
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: 'read' },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json(message);
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete contact message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
