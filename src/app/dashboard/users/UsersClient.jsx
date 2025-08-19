// app/dashboard/users/UsersClient.jsx
'use client';

import * as React from 'react';
import { format } from 'date-fns';
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
import Link from 'next/link';

export default function UsersClient({ users }) {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className='container p-5 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Daftar Pengguna</h1>
      <div className='flex justify-end mb-4'>
        <Button asChild>
          <Link href='/dashboard/users/new'>Tambah Pengguna Baru</Link>
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className='text-right'>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === 'admin' ? 'secondary' : 'outline'}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'dd MMMM yyyy')}
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    onClick={() => handleOpenModal(user)}
                    variant='ghost'
                    size='sm'
                  >
                    Lihat Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Popup Detail Pengguna */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedUser && (
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Detail Pengguna #{selectedUser.id}</DialogTitle>
              <DialogDescription>
                Informasi lengkap mengenai pengguna ini.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Nama</Label>
                <div className='col-span-3 font-semibold'>
                  {selectedUser.name}
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Email</Label>
                <div className='col-span-3'>{selectedUser.email}</div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Role</Label>
                <div className='col-span-3'>
                  <Badge
                    variant={
                      selectedUser.role === 'admin' ? 'secondary' : 'outline'
                    }
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
