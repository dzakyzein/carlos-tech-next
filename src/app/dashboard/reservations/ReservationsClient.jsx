'use client';

import * as React from 'react';
import Link from 'next/link';
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

export default function ReservationsClient({ reservations }) {
  const [selectedReservation, setSelectedReservation] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [reservationsData, setReservationsData] = React.useState(reservations);

  const handleToggleStatus = async (reservation) => {
    const newStatus = reservation.status === 'LUNAS' ? 'BELUM_LUNAS' : 'LUNAS';

    // Optimistic UI update
    setReservationsData((prev) =>
      prev.map((r) =>
        r.id === reservation.id ? { ...r, status: newStatus } : r
      )
    );

    try {
      await fetch(`/api/reservation/${reservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Gagal update status:', error);
    }
  };

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className='container p-5 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Daftar Reservasi</h1>
      <div className='flex justify-end mb-4'>
        <Button asChild>
          <Link href='/dashboard/reservation/new'>Tambah Reservasi Baru</Link>
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Status Pembayaran</TableHead>
              <TableHead>Progres</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className='text-right'>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservationsData.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className='font-medium'>{reservation.id}</TableCell>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.type}</TableCell>
                <TableCell>
                  <Badge
                    onClick={() => handleToggleStatus(reservation)}
                    className='cursor-pointer'
                    variant={
                      reservation.status === 'LUNAS'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {reservation.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline'>{reservation.progress}</Badge>
                </TableCell>
                <TableCell>{reservation.amount}</TableCell>
                <TableCell>
                  {format(new Date(reservation.createdAt), 'dd MMMM yyyy')}
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    onClick={() => handleOpenModal(reservation)}
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

      {/* Modal Popup Detail Reservasi */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedReservation && (
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>
                Detail Reservasi #{selectedReservation.id}
              </DialogTitle>
              <DialogDescription>
                Informasi lengkap mengenai reservasi ini.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Nama</Label>
                <div className='col-span-3 font-semibold'>
                  {selectedReservation.name}
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Telepon</Label>
                <div className='col-span-3'>{selectedReservation.phone}</div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Alamat</Label>
                <div className='col-span-3'>{selectedReservation.address}</div>
              </div>
              {selectedReservation.note && (
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>Catatan</Label>
                  <div className='col-span-3 italic'>
                    {selectedReservation.note}
                  </div>
                </div>
              )}
              {selectedReservation.paymentProof && (
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>Bukti Pembayaran</Label>
                  <div className='col-span-3 italic'>
                    <Link
                      href={selectedReservation.paymentProof}
                      target='_blank'
                      className='text-blue-500 hover:underline'
                    >
                      Lihat Bukti
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
