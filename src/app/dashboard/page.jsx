'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // jangan redirect pas masih loading
    if (!session) {
      router.push('/login'); // kalau belum login
    } else if (session.user.role !== 'admin') {
      router.push('/'); // kalau bukan admin
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || session.user.role !== 'admin') {
    return null; // biar nggak sempat render isi dashboard
  }

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold'>Welcome to Admin Dashboard 🚀</h1>
      <p>
        Hai {session.user.name}, role kamu adalah <b>{session.user.role}</b>
      </p>
    </div>
  );
}
