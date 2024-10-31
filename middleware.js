// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    // Retrieve login status and admin details from cookies
    const isLoggedIn = req.cookies.get('Login');
    const adminDetails = req.cookies.get('adminDetail');

    // Redirect unauthenticated users trying to access protected routes
    if (!isLoggedIn && req.nextUrl.pathname.startsWith('/Dashboard')) {
        return NextResponse.redirect(new URL('/auth/admin', req.url)); // Redirect to login
    }

    // Optional: Process adminDetails if needed
    if (adminDetails) {
        try {
            JSON.parse(adminDetails); // Only parse if you need to use the details here
        } catch (error) {
            console.error('Error parsing user details:', error);
        }
    }

    // Continue if user is authenticated
    return NextResponse.next();
}

// Apply middleware to /Dashboard and all its sub-paths
export const config = {
    matcher: ['/Dashboard/:path*'],
};
