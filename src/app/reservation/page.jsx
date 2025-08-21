// app/reservation/page.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus diisi.' }),
  phone: z.string().min(10, { message: 'Nomor HP harus valid.' }),
  address: z.string().min(5, { message: 'Alamat harus diisi.' }),
  type: z.enum(
    ['alat berat', 'gigi rasio motor', 'gigi rasio mobil', 'sparepart pabrik'],
    {
      required_error: 'Jenis mesin harus dipilih.',
    }
  ),
  amount: z.coerce.number().min(1, { message: 'Jumlah harus lebih dari 0.' }),
  note: z.string().optional(),
});

export default function ReservationPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Handle redirect to login page
    },
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      type: '',
      amount: 1,
      note: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message || 'Failed to create reservation.'
        );
      }

      toast.success('Pemesanan Berhasil! 🎉', {
        description: 'Pemesanan Anda telah tercatat dan akan segera diproses.',
      });

      router.push('/profile');
    } catch (error) {
      toast.error('Gagal Membuat Pesanan', {
        description:
          error.message ||
          'Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.',
      });
      console.error(error);
    }
  };

  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-[var(--color-secondarylp)]'>
      <div className='max-w-2xl w-full'>
        <h1 className='text-3xl font-bold mb-2 text-center text-[var(--color-primarylp)]'>
          Buat Pesanan Baru
        </h1>
        <p className='text-gray-600 mb-6 text-center'>
          Silakan lengkapi formulir di bawah ini untuk memesan layanan kami.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 bg-white p-8 rounded-lg shadow-md'
        >
          <div className='flex flex-col'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-[var(--color-primarylp)] mb-1'
            >
              Nama Lengkap
            </label>
            <input
              id='name'
              type='text'
              {...register('name')}
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] hover:border-[var(--color-primarylp)] transition-colors'
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-[var(--color-primarylp)] mb-1'
            >
              Nomor Telepon
            </label>
            <input
              id='phone'
              type='tel'
              {...register('phone')}
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] hover:border-[var(--color-primarylp)] transition-colors'
            />
            {errors.phone && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-[var(--color-primarylp)] mb-1'
            >
              Alamat Lengkap
            </label>
            <textarea
              id='address'
              {...register('address')}
              rows='3'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] hover:border-[var(--color-primarylp)] transition-colors'
            ></textarea>
            {errors.address && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.address.message}
              </p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-[var(--color-primarylp)] mb-1'
            >
              Jenis Mesin
            </label>
            <select
              id='type'
              {...register('type')}
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] hover:border-[var(--color-primarylp)] transition-colors'
            >
              <option value=''>Pilih jenis mesin</option>
              <option value='alat berat'>Alat Berat</option>
              <option value='gigi rasio motor'>Gigi Rasio Motor</option>
              <option value='gigi rasio mobil'>Gigi Rasio Mobil</option>
              <option value='sparepart pabrik'>Sparepart Pabrik</option>
            </select>
            {errors.type && (
              <p className='mt-1 text-sm text-red-600'>{errors.type.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='amount'
              className='block text-sm font-medium text-[var(--color-primarylp)] mb-1'
            >
              Jumlah Unit
            </label>
            <input
              id='amount'
              type='number'
              {...register('amount', { valueAsNumber: true })}
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] hover:border-[var(--color-primarylp)] transition-colors'
            />
            <p className='mt-1 text-sm text-gray-500'>
              Jumlah unit mesin yang akan diservis.
            </p>
            {errors.amount && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='note'
              className='block text-sm font-medium text-[var(--color-primarylp)] mb-1'
            >
              Catatan Tambahan (opsional)
            </label>
            <textarea
              id='note'
              {...register('note')}
              rows='3'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] hover:border-[var(--color-primarylp)] transition-colors'
              placeholder='Contoh: Mesin sering macet, mohon diperiksa bagian...'
            ></textarea>
            {errors.note && (
              <p className='mt-1 text-sm text-red-600'>{errors.note.message}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full py-2 px-4 bg-[var(--color-primarylp)] text-[var(--color-secondarylp)] font-semibold rounded-md hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentlp)] focus:ring-offset-2 transition-colors duration-200'
          >
            Buat Pesanan
          </button>
        </form>
      </div>
    </div>
  );
}
