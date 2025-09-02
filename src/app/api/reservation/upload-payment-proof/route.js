// src/app/api/reservation/upload-payment-proof/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ fileUrl });
  } catch (err) {
    console.error('Upload gagal:', err);
    return NextResponse.json({ error: 'Upload gagal' }, { status: 500 });
  }
}
