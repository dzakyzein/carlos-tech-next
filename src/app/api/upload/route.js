// app/api/upload/route.js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Pastikan ada file yang diunggah
  const blob = await put(filename, request.body, { access: 'public' });

  // Kembalikan URL publik dari gambar
  return NextResponse.json(blob);
}
