// app/dashboard/tools/ToolsClient.jsx
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { toast } from 'sonner';

// Impor Server Actions
import { updateTool, deleteTool } from '@/actions/tools';

export default function ToolsClient({ tools }) {
  const [selectedTool, setSelectedTool] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleOpenDetailModal = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTool(null);
  };

  const handleOpenEditModal = (tool) => {
    setSelectedTool(tool);
    setIsEditModalOpen(true);
  };

  const handleDeleteTool = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus alat ini?')) {
      await deleteTool(id);
      toast.success('Alat berhasil dihapus');
    }
  };

  return (
    <div className='container p-5 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Daftar Alat</h1>
      <div className='flex justify-end mb-4'>
        <Button asChild>
          <Link href='/dashboard/tools/new'>Tambah Alat Baru</Link>
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Gambar</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className='text-right'>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell>{tool.id}</TableCell>
                <TableCell>
                  {tool.imageUrl && (
                    <Image
                      src={tool.imageUrl}
                      alt={tool.title}
                      width={60}
                      height={60}
                      className='rounded-md object-cover'
                    />
                  )}
                </TableCell>
                <TableCell>{tool.title}</TableCell>
                <TableCell>
                  <Badge variant='outline'>{tool.type}</Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(tool.createdAt), 'dd MMMM yyyy')}
                </TableCell>
                <TableCell className='text-right space-x-2'>
                  <Button
                    onClick={() => handleOpenDetailModal(tool)}
                    variant='ghost'
                    size='sm'
                  >
                    Lihat
                  </Button>
                  <Button
                    onClick={() => handleOpenEditModal(tool)}
                    variant='ghost'
                    size='sm'
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteTool(tool.id)}
                    variant='ghost'
                    size='sm'
                    className='text-red-500 hover:bg-red-50 hover:text-red-500'
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Popup Detail Alat */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* Konten modal ini sama seperti sebelumnya */}
        {selectedTool && (
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Detail Alat #{selectedTool.id}</DialogTitle>
              <DialogDescription>
                Informasi lengkap mengenai alat ini.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              {selectedTool.imageUrl && (
                <div className='flex justify-center'>
                  <Image
                    src={selectedTool.imageUrl}
                    alt={selectedTool.title}
                    width={200}
                    height={200}
                    className='rounded-md object-cover'
                  />
                </div>
              )}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Judul</Label>
                <div className='col-span-3 font-semibold'>
                  {selectedTool.title}
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Tipe</Label>
                <div className='col-span-3'>
                  <Badge variant='outline'>{selectedTool.type}</Badge>
                </div>
              </div>
              {selectedTool.description && (
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>Deskripsi</Label>
                  <div className='col-span-3'>{selectedTool.description}</div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Modal Popup Edit Alat */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {selectedTool && (
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit Alat #{selectedTool.id}</DialogTitle>
              <DialogDescription>
                Perbarui informasi alat ini.
              </DialogDescription>
            </DialogHeader>
            <form action={updateTool} className='space-y-4'>
              <Input type='hidden' name='id' defaultValue={selectedTool.id} />
              <div className='space-y-2'>
                <Label htmlFor='edit-title'>Judul</Label>
                <Input
                  id='edit-title'
                  name='title'
                  defaultValue={selectedTool.title}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-type'>Tipe</Label>
                <Input
                  id='edit-type'
                  name='type'
                  defaultValue={selectedTool.type}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-description'>Deskripsi</Label>
                <Textarea
                  id='edit-description'
                  name='description'
                  defaultValue={selectedTool.description}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-image'>Ganti Gambar (opsional)</Label>
                <Input
                  id='edit-image'
                  name='image'
                  type='file'
                  accept='image/*'
                />
                {selectedTool.imageUrl && (
                  <Image
                    src={selectedTool.imageUrl}
                    alt={selectedTool.title}
                    width={120}
                    height={120}
                    className='mt-2 rounded-md object-cover'
                  />
                )}
              </div>

              <div className='flex gap-2'>
                <Button type='submit'>Perbarui</Button>
                <Button
                  type='button'
                  onClick={handleCloseModal}
                  variant='outline'
                >
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
