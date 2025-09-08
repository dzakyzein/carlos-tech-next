'use client';

import * as React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'sonner';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

export default function ReservationsClient() {
  const [selectedReservation, setSelectedReservation] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [reservationsData, setReservationsData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 8,
    totalPages: 1,
    total: 0,
  });

  // 🔹 Fetch data ke API
  const fetchReservations = async (page = 1) => {
    try {
      const res = await fetch(`/api/reservation?page=${page}&limit=8`);
      if (!res.ok) throw new Error('Gagal fetch data');

      const result = await res.json();
      setReservationsData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Gagal fetch:', error);
      toast.error('Gagal memuat data reservasi');
    }
  };

  React.useEffect(() => {
    fetchReservations(pagination.page);
  }, [pagination.page]);

  // 🔹 Toggle Status
  const handleToggleStatus = async (reservation) => {
    const newStatus = reservation.status === 'LUNAS' ? 'BELUM_LUNAS' : 'LUNAS';

    // Optimistic
    setReservationsData((prev) =>
      prev.map((r) =>
        r.id === reservation.id ? { ...r, status: newStatus } : r
      )
    );

    try {
      const res = await fetch(`/api/reservation/${reservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Gagal update');

      toast.success(`Status berhasil diubah ke ${newStatus}`);
    } catch (error) {
      // rollback
      setReservationsData((prev) =>
        prev.map((r) =>
          r.id === reservation.id ? { ...r, status: reservation.status } : r
        )
      );
      toast.error('Gagal mengubah status pembayaran');
    }
  };

  // 🔹 Update Progress
  const handleUpdateProgress = async (reservation, newProgress) => {
    setReservationsData((prev) =>
      prev.map((r) =>
        r.id === reservation.id ? { ...r, progress: newProgress } : r
      )
    );

    try {
      const res = await fetch(`/api/reservation/${reservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress }),
      });
      if (!res.ok) throw new Error('Gagal update progress');

      toast.success(`Progress berhasil diubah ke ${newProgress}`);
    } catch (error) {
      setReservationsData((prev) =>
        prev.map((r) =>
          r.id === reservation.id ? { ...r, progress: reservation.progress } : r
        )
      );
      toast.error('Gagal mengubah progress');
    }
  };

  // 🔹 Modal
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
                <TableCell>{reservation.id}</TableCell>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='sm'>
                        {reservation.progress}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {['P25', 'P50', 'P75', 'P100'].map((p) => (
                        <DropdownMenuItem
                          key={p}
                          onClick={() => handleUpdateProgress(reservation, p)}
                        >
                          {p}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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

        {/* Pagination */}
        <div className='flex justify-evenly items-center mt-4'>
          <Button
            disabled={pagination.page === 1}
            onClick={() =>
              setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
            }
          >
            Prev
          </Button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            disabled={pagination.page === pagination.totalPages}
            onClick={() =>
              setPagination((p) => ({
                ...p,
                page: Math.min(p.totalPages, p.page + 1),
              }))
            }
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal Detail Reservasi */}
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
