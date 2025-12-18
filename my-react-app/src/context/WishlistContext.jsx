import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        // Load wishlist from localStorage on initial load
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
            const exists = prevItems.find((item) => item.id === product.id);

            if (exists) {
                toast.error(`${product.title} is already in wishlist`);
                return prevItems;
            } else {
                toast.success(`${product.title} added to wishlist!`);
                return [...prevItems, product];
            }
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prevItems) => {
            const item = prevItems.find((item) => item.id === productId);
            if (item) {
                toast.success(`${item.title} removed from wishlist`);
            }
            return prevItems.filter((item) => item.id !== productId);
        });
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlistItems([]);
        toast.success('Wishlist cleared');
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
