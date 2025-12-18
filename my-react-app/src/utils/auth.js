// Simple utility to clear old localStorage data that conflicts with backend
export const clearOldLocalStorage = () => {
    // Keep only token and currentUser from backend
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');

    // Clear everything else that might conflict
    const keysToKeep = ['token', 'currentUser'];
    const allKeys = Object.keys(localStorage);

    allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    });

    console.log('✅ Cleared old localStorage data');
};

// Check if user is logged in
export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};
