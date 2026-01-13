import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' ||
    path.startsWith('/(marketing)') ||
    path.startsWith('/(auth)') ||
    path === '/signin' ||
    path === '/signup' ||
    path.includes('/signup/');
  
  // Get token from cookies (in real app, get from Firebase auth)
  const token = request.cookies.get('auth-token')?.value || '';
  
  // Redirect logic
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  if (isPublicPath && token) {
    // If logged in and trying to access auth pages, redirect to dashboard
    if (path.startsWith('/(auth)')) {
      return NextResponse.redirect(new URL('/professional/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};