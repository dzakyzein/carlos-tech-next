// app/dashboard/layout.jsx

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SiteHeader } from '@/components/dashboard/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/dashboard/theme-provider';

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider
        style={{
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        }}
      >
        <AppSidebar variant='inset' />
        <SidebarInset>
          <SiteHeader />
          <div className='flex flex-1 flex-col'>
            {/* Konten halaman akan dirender di sini */}
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
