// Check if user is authenticated
function checkAuth() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('No user logged in'));
            }
        });
    });
}

// Check if user is admin
function isAdmin(user) {
    return user.email === 'teamelectrack@gmail.com';
}

// Protect routes based on authentication and admin status
async function protectRoute(requireAdmin = false) {
    try {
        const user = await checkAuth();
        
        // If admin access is required, check if user is admin
        if (requireAdmin && !isAdmin(user)) {
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    } catch (error) {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
        return false;
    }
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', async () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Skip auth check for login and signup pages
    if (currentPage === 'login.html' || currentPage === 'signup.html' || currentPage === 'forgot.html' || currentPage === 'set-password.html') {
        return;
    }
    
    // Check if admin access is required
    const requireAdmin = currentPage === 'admin.html';
    
    // Protect the route
    await protectRoute(requireAdmin);
}); 