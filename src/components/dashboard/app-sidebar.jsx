'use client';

import * as React from 'react';
import {
  IconCalendar,
  IconDashboard,
  IconTool,
  IconUsers,
  IconSettings,
} from '@tabler/icons-react';

import { NavMain } from '@/components/dashboard/nav-main';
import { NavUser } from '@/components/dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Admin', // Ganti dengan nama admin
    email: 'admin@example.com', // Ganti dengan email admin
    avatar: '/avatars/placeholder.jpg', // Ganti dengan avatar admin
  },
  // Item navigasi utama yang disesuaikan
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Reservasi',
      url: '/dashboard/reservations',
      icon: IconCalendar,
    },
    {
      title: 'Pengguna',
      url: '/dashboard/users',
      icon: IconUsers,
    },
    {
      title: 'Alat',
      url: '/dashboard/tools',
      icon: IconTool,
    },
  ],
  navSecondary: [
    {
      title: 'Pengaturan',
      url: '/dashboard/settings',
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='/dashboard'>
                <IconTool className='!size-5' />
                <span className='text-base font-semibold'>Admin Panel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* NavDocuments dan NavClouds dihapus karena tidak relevan */}
        <NavMain items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
