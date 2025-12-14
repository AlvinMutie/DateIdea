/**
 * Frontend Configuration
 * Update API_ENDPOINT with your Render backend URL after deployment
 */

// Development (local)
// const API_ENDPOINT = 'http://localhost:3000/api/send-email';

// Production (update with your Render backend URL)
const API_ENDPOINT = 'https://your-backend.onrender.com/api/send-email';

// Make it available globally
if (typeof window !== 'undefined') {
    window.API_ENDPOINT = API_ENDPOINT;
}

