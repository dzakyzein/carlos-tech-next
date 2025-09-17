// app/dashboard/page.jsx

'use client';

import { useEffect, useState } from 'react';

import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { DataTable } from '@/components/dashboard/data-table';
import { SectionCards } from '@/components/dashboard/section-cards';

import data from './data.json';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className='p-6'>Loading...</div>;

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards stats={stats} />
          <div className='px-4 lg:px-6'>
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
