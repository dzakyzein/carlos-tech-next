import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // hanya admin yang boleh masuk dashboard
      return token?.role === 'admin';
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
