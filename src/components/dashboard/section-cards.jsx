'use client';

import { useEffect, useState } from 'react';
import {
  IconTrendingDown,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SectionCards() {
  const [stats, setStats] = useState({
    totalReservasi: 0,
    reservasiAktif: 0,
    reservasiDikerjakan: 0,
    reservasiTuntas: 0,
    totalUser: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Gagal fetch stats:', err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {/* Total Reservasi */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Reservasi</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {stats.totalReservasi}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp /> All
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='font-medium'>Semua reservasi terdaftar</div>
        </CardFooter>
      </Card>

      {/* Reservasi Aktif */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Reservasi Aktif</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {stats.reservasiAktif}
          </CardTitle>
          <CardAction>
            <Badge
              variant='outline'
              className='text-yellow-600 border-yellow-600'
            >
              <IconTrendingUp /> Aktif
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='font-medium'>Masih dalam pengerjaan</div>
        </CardFooter>
      </Card>

      {/* Reservasi Dikerjakan */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Reservasi Dikerjakan</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {stats.reservasiDikerjakan}
          </CardTitle>
          <CardAction>
            <Badge
              variant='outline'
              className='text-orange-600 border-orange-600'
            >
              <IconTrendingDown /> Belum Lunas
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='font-medium'>Selesai tapi belum lunas</div>
        </CardFooter>
      </Card>

      {/* Reservasi Tuntas */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Reservasi Tuntas</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {stats.reservasiTuntas}
          </CardTitle>
          <CardAction>
            <Badge
              variant='outline'
              className='text-green-600 border-green-600'
            >
              <IconTrendingUp /> Lunas
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='font-medium'>Selesai & Siap Dikirim</div>
        </CardFooter>
      </Card>
    </div>
  );
}
