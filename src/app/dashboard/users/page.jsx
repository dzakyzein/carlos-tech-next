// app/dashboard/users/page.jsx
import { PrismaClient } from '@prisma/client';
import UsersClient from './UsersClient';

const prisma = new PrismaClient();

// Fungsi untuk mengambil data dari server
async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return users;
}

export default async function UsersPage() {
  // Ambil data pengguna
  const users = await getUsers();

  // Oper data ke Client Component
  return <UsersClient users={users} />;
}
