import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // Pastikan Anda menginstal: npm install bcryptjs

const handler = NextAuth({
  providers: [
    // Tambahkan CredentialsProvider untuk login email/password
    CredentialsProvider({
      // Nama provider, untuk dipanggil dari klien: signIn('credentials', ...)
      name: 'Credentials',
      // Definisi kredensial yang akan dikirim (opsional)
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // Fungsi utama untuk otentikasi
      async authorize(credentials, req) {
        // Cari pengguna di database menggunakan Prisma
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Jika user tidak ditemukan, atau password tidak cocok, kembalikan null
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          // Anda dapat throw new Error() jika ingin memberikan pesan error spesifik
          return null;
        }

        // Jika user ditemukan dan password cocok, kembalikan objek user
        // Objek ini akan tersedia di callback 'jwt' dan 'session'
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Pastikan role ada di model Prisma
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Callback 'jwt' yang diperbarui untuk menangani Credentials Provider
    async jwt({ token, user, account, profile }) {
      // Jika login menggunakan Credentials Provider, 'user' akan ada
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // Jika login menggunakan Google Provider, 'account' dan 'profile' akan ada
      if (account && profile) {
        let dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              role: 'customer',
            },
          });
        }

        const adminEmails = ['admin@gmail.com'];
        if (adminEmails.includes(profile.email)) {
          await prisma.user.update({
            where: { email: profile.email },
            data: { role: 'admin' },
          });
          dbUser.role = 'admin';
        }

        token.id = dbUser.id;
        token.role = dbUser.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async signIn({ user }) {
      return true;
    },

    async redirect({ baseUrl, url }) {
      if (url === '/login') {
        return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
