import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Sudah login, tapi bukan admin → tendang ke halaman utama
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Admin → lanjutkan akses normal
    return NextResponse.next();
  },
  {
    callbacks: {
      // authorized hanya menentukan "boleh masuk ke fungsi middleware di atas atau tidak"
      // kalau belum login sama sekali, ini false → otomatis redirect ke /login (default withAuth)
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
