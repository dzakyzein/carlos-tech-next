'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Something went wrong');
      }

      router.push('/login'); // setelah register sukses → redirect login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-30'>
      <div className='flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl'>
        {/* Left Side (Image) */}
        <div
          className='hidden lg:block lg:w-1/2 bg-cover'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>

        {/* Right Side (Form) */}
        <div className='w-full p-8 lg:w-1/2'>
          <h2 className='text-2xl font-semibold text-gray-700 text-center'>
            Brand
          </h2>
          <p className='text-xl text-gray-600 text-center'>Create an account</p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className='mt-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Full Name
              </label>
              <input
                name='name'
                value={form.name}
                onChange={handleChange}
                className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
                type='text'
                required
              />
            </div>

            {/* Email */}
            <div className='mt-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Email Address
              </label>
              <input
                name='email'
                value={form.email}
                onChange={handleChange}
                className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
                type='email'
                required
              />
            </div>

            {/* Password */}
            <div className='mt-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input
                name='password'
                value={form.password}
                onChange={handleChange}
                className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
                type='password'
                required
              />
            </div>

            {/* Error */}
            {error && (
              <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
            )}

            {/* Submit */}
            <div className='mt-8'>
              <button
                type='submit'
                disabled={loading}
                className='bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 disabled:opacity-50'
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 md:w-1/4'></span>
            <a href='/login' className='text-xs text-gray-500 uppercase'>
              Already have an account? Login
            </a>
            <span className='border-b w-1/5 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  );
}
