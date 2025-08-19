'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: session } = useSession();
  const router = useRouter();

  // Ini sudah benar, tapi kita akan tambahkan logic di handleSubmit
  useEffect(() => {
    if (session?.user) {
      // Logic redirect dari `useEffect` ini untuk menangani reload page
      if (session.user.role === 'admin') {
        router.push('/dashboard');
      } else if (session.user.role === 'customer') {
        router.push('/');
      }
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else if (res?.ok) {
        // --- INI PERBAIKANNYA ---
        // Panggil refresh session (hanya jika diperlukan) dan redirect
        // next-auth versi baru akan otomatis memperbarui session
        // Jadi, langsung saja redirect
        router.push('/');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-30'>
      <div className='flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl'>
        {/* Left Side */}
        <div
          className='hidden lg:block lg:w-1/2 bg-cover'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>

        {/* Right Side */}
        <div className='w-full p-8 lg:w-1/2'>
          <h2 className='text-2xl font-semibold text-gray-700 text-center'>
            Brand
          </h2>
          <p className='text-xl text-gray-600 text-center'>Welcome back!</p>

          {/* Google Login */}
          <button
            onClick={() => signIn('google')}
            className='flex items-center justify-center mt-4 bg-white border rounded-lg shadow-md hover:bg-gray-100 w-full'
          >
            <GoogleIcon />
            <span className='px-4 py-3 w-5/6 text-center text-gray-600 font-bold'>
              Sign in with Google
            </span>
          </button>

          {/* Separator */}
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <span className='text-xs text-center text-gray-500 uppercase'>
              or login with email
            </span>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='mt-4'>
            {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email Address
            </label>
            <input
              className='bg-gray-200 text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Password
                </label>
                <Link href='/forgot-password' className='text-xs text-gray-500'>
                  Forgot Password?
                </Link>
              </div>
              <input
                className='bg-gray-200 text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='mt-6 bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 disabled:opacity-50'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up */}
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 md:w-1/4'></span>
            <Link href='/register' className='text-xs text-gray-500 uppercase'>
              or sign up
            </Link>
            <span className='border-b w-1/5 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <div className='px-4 py-3'>
      <svg className='h-6 w-6' viewBox='0 0 40 40'>
        <path
          d='M36.34 16.74H35V16.67H20V23.33H29.42C28.05 27.21 24.35 30 20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C22.55 10 24.87 10.96 26.63 12.53L31.35 7.82C28.37 5.04 24.39 3.33 20 3.33C10.8 3.33 3.33 10.8 3.33 20C3.33 29.2 10.8 36.67 20 36.67C29.2 36.67 36.67 29.2 36.67 20C36.67 18.88 36.55 17.79 36.34 16.74Z'
          fill='#FFC107'
        />
        <path
          d='M5.25 12.24L10.73 16.26C12.21 12.59 15.8 10 20 10C22.55 10 24.87 10.96 26.63 12.53L31.35 7.82C28.37 5.04 24.39 3.33 20 3.33C13.6 3.33 8.05 6.95 5.25 12.24Z'
          fill='#FF3D00'
        />
        <path
          d='M20 36.67C24.31 36.67 28.22 35.02 31.17 32.34L26.02 27.98C24.34 29.24 22.26 30 20 30C15.67 30 11.98 27.24 10.6 23.38L5.16 27.57C7.92 32.96 13.52 36.67 20 36.67Z'
          fill='#4CAF50'
        />
        <path
          d='M36.34 16.74H35V16.67H20V23.33H29.42C28.76 25.2 27.56 26.81 26.01 27.98L31.17 32.34C30.81 32.67 36.67 28.33 36.67 20C36.67 18.88 36.55 17.79 36.34 16.74Z'
          fill='#1976D2'
        />
      </svg>
    </div>
  );
}
