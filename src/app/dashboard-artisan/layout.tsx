import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Mountain } from 'lucide-react';
import Link from 'next/link';
import { DashboardNav } from '@/components/layout/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <SidebarTrigger className="size-8" />
            <Link href="/" className="flex items-center gap-2">
                <Mountain className="size-6 text-primary" />
                <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">
                ArtisanVerse
                </span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-full">
            <div className="flex-grow">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
