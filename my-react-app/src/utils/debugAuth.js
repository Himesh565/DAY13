// Debug localStorage state
export const debugAuth = () => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');

    console.log('=== Auth Debug ===');
    console.log('Token exists:', !!token);
    console.log('CurrentUser exists:', !!currentUser);
    if (currentUser) {
        console.log('CurrentUser:', JSON.parse(currentUser));
    }
    console.log('================');

    return {
        hasToken: !!token,
        hasUser: !!currentUser,
        user: currentUser ? JSON.parse(currentUser) : null
    };
};

// Call this in browser console: window.debugAuth()
if (typeof window !== 'undefined') {
    window.debugAuth = debugAuth;
}
