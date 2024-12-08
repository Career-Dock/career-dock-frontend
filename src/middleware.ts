import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect `/dashboard` and its subpaths
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the user is logged in by verifying a token stored in cookies
    const token = req.cookies.get('refreshToken');
    // If accessing `/dashboard` or its subpaths without a token, redirect to `/login`
    if (pathname.startsWith('/dashboard') && !token?.value) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow the request to proceed for all other routes
    return NextResponse.next();
}

// Specify the routes the middleware should apply to
export const config = {
    matcher: ['/dashboard/:path*'], // Protects `/dashboard` and all its subpaths
};
