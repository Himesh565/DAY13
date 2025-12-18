import axios from 'axios';

// Base API URL - uses environment variable or defaults to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            window.dispatchEvent(new Event('auth-change'));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            window.dispatchEvent(new Event('auth-change'));
        }
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/auth/profile', userData);
        return response.data;
    },

    changePassword: async (currentPassword, newPassword) => {
        const response = await api.post('/auth/change-password', {
            currentPassword,
            newPassword
        });
        return response.data;
    },

    deleteAccount: async () => {
        const response = await api.delete('/auth/delete-account');
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.dispatchEvent(new Event('auth-change'));
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.dispatchEvent(new Event('auth-change'));
    }

};

// Product APIs
export const productAPI = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getByCategory: async (category) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    },

    create: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    }
};

// Order APIs
export const orderAPI = {
    create: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/orders/${id}`);
        return response.data;
    }
};

// Cart APIs
export const cartAPI = {
    get: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    add: async (productId, quantity = 1) => {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    update: async (productId, quantity) => {
        const response = await api.put(`/cart/${productId}`, { quantity });
        return response.data;
    },

    remove: async (productId) => {
        const response = await api.delete(`/cart/${productId}`);
        return response.data;
    }
};

// Wishlist APIs
export const wishlistAPI = {
    get: async () => {
        const response = await api.get('/wishlist');
        return response.data;
    },

    add: async (productId) => {
        const response = await api.post('/wishlist', { productId });
        return response.data;
    },

    remove: async (productId) => {
        const response = await api.delete(`/wishlist/${productId}`);
        return response.data;
    },

    clear: async () => {
        const response = await api.delete('/wishlist');
        return response.data;
    }
};

// Contact APIs
export const contactAPI = {
    submit: async (contactData) => {
        const response = await api.post('/contact', contactData);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/contact');
        return response.data;
    }
};

export default api;
