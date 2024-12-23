'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Briefcase,
  FileEdit,
  PieChart,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'All Applications',
    href: '/dashboard/applications',
    icon: Briefcase,
  },
  {
    name: 'Add Application',
    href: '/dashboard/applications/new',
    icon: FileEdit,
  },
  { name: 'Reports', href: '/dashboard/reports', icon: PieChart },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function PrimarySidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'relative flex flex-col border-r bg-background',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="text-xl font-semibold">Career</span>
            <span className="text-xl font-semibold text-primary">Dock</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-50 z-10 rounded-full border bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <item.icon
                  className={cn('h-5 w-5', isCollapsed ? 'mr-0' : 'mr-2')}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
