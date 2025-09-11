// app/dashboard/tools/new/page.jsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createTool } from '@/actions/tools';

export default function NewToolPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const file = formData.get('image');

    /// Langkah 1: Unggah gambar ke Vercel Blob
    let imageUrl = '';
    if (file && file.size > 0) {
      try {
        const uploadForm = new FormData();
        uploadForm.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadForm,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        imageUrl = data.url;
      } catch (error) {
        console.error('Failed to upload image:', error);
        setIsSubmitting(false);
        return;
      }
    }

    // Langkah 2: Kirim data formulir dan URL ke Server Action Prisma
    const toolData = new FormData();
    toolData.append('title', formData.get('title'));
    toolData.append('type', formData.get('type'));
    toolData.append('description', formData.get('description'));
    toolData.append('imageUrl', imageUrl);

    await createTool(toolData);
    setIsSubmitting(false);
    event.target.reset(); // reset form
    window.location.href = '/dashboard/tools'; // redirect balik ke list
  };

  return (
    <div className='container p-5 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Tambah Alat Baru</h1>
      <div className='max-w-lg mx-auto'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Judul</Label>
            <Input id='title' name='title' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='type'>Tipe</Label>
            <Input id='type' name='type' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Deskripsi</Label>
            <Textarea id='description' name='description' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='image'>Gambar (Unggah File)</Label>
            <Input id='image' name='image' type='file' accept='image/*' />
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
            <Button asChild variant='outline' disabled={isSubmitting}>
              <Link href='/dashboard/tools'>Batal</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
