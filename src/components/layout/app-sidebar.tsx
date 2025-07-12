import Link from 'next/link';
import {
  Home,
  Package,
  PlusCircle,
  Bell,
  User,
  Settings,
  Heart,
  MessageSquare,
  Search,
} from 'lucide-react';
import Logo from '@/components/logo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '../ui/button';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/browse', icon: Search, label: 'Browse' },
  { href: '/add-item', icon: PlusCircle, label: 'Add Item' },
  { href: '/dashboard/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
];

export default function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link href="/dashboard" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">ReWear</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <Button variant="ghost" size="icon" className="rounded-lg" aria-label={item.label}>
                    <item.icon className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Profile">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>Profile</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
