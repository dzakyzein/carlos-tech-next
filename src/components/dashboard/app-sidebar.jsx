// components/dashboard/AppSidebar.jsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  IconCalendar,
  IconDashboard,
  IconTool,
  IconUsers,
  IconSettings,
} from '@tabler/icons-react';

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
import { usePathname } from 'next/navigation';

const navMain = [
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
];

const navSecondary = [
  {
    title: 'Pengaturan',
    url: '/dashboard/settings',
    icon: IconSettings,
  },
];

const user = {
  name: 'Admin',
  email: 'admin@example.com',
  avatar: '/avatars/placeholder.jpg',
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <Link href='/dashboard'>
                <IconTool className='!size-5' />
                <span className='text-base font-semibold'>Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Navigasi Utama */}
        <SidebarMenu>
          {navMain.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                className={
                  pathname === item.url
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                }
              >
                <Link href={item.url}>
                  <item.icon className='h-4 w-4' />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Navigasi Sekunder */}
        <SidebarMenu className='mt-auto'>
          {navSecondary.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                className={
                  pathname === item.url
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                }
              >
                <Link href={item.url}>
                  <item.icon className='h-4 w-4' />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
