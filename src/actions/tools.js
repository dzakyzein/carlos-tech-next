// actions/tools.js
'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Server Action untuk membuat alat baru
export async function createTool(formData) {
  const title = formData.get('title');
  const type = formData.get('type');
  const description = formData.get('description');
  const imageUrl = formData.get('imageUrl');

  // Validasi sederhana
  if (!title || !type) {
    throw new Error('Title and type are required.');
  }

  await prisma.tool.create({
    data: {
      title,
      type,
      description,
      imageUrl,
    },
  });

  // Revalidasi cache halaman tools untuk menampilkan data terbaru
  revalidatePath('/dashboard/tools');
  // Redirect kembali ke halaman daftar tools
  redirect('/dashboard/tools');
}

// Server Action untuk mengupdate alat
export async function updateTool(formData) {
  const id = parseInt(formData.get('id'));
  const title = formData.get('title');
  const type = formData.get('type');
  const description = formData.get('description');
  const file = formData.get('image'); // ambil file baru

  // Ambil data lama dulu
  const existingTool = await prisma.tool.findUnique({
    where: { id },
  });

  let imageUrl = existingTool.imageUrl; // default gambar lama

  if (file && file.size > 0) {
    // Simpan file baru
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    await fs.writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  await prisma.tool.update({
    where: { id },
    data: {
      title,
      type,
      description,
      imageUrl,
    },
  });

  revalidatePath('/dashboard/tools');
  redirect('/dashboard/tools');
}

// Server Action untuk menghapus alat
export async function deleteTool(id) {
  await prisma.tool.delete({
    where: { id: parseInt(id) },
  });

  revalidatePath('/dashboard/tools');
}
