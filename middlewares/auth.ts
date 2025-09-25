import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Daftar route yang perlu proteksi (tidak perlu login)
    const publicRoutes = ['/login', '/register', '/api/login', '/api/logout', '/api/register'];
    
    // Cek apakah route saat ini adalah public route
    const isPublicRoute = publicRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    );

    // Jika bukan public route, cek apakah user sudah login
    if (!isPublicRoute) {
        const authToken = request.cookies.get('auth_token');
        
        // Jika tidak ada token, redirect ke login
        if (!authToken || authToken.value === '') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Konfigurasi matcher untuk middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};
