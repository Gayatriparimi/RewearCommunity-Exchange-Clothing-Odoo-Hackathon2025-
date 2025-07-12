import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Logo from '../logo';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-secondary">
      <div className="container grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-foreground/70">
            A community-driven platform for sustainable fashion.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
          <div>
            <h4 className="font-headline font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/browse" className="text-foreground/70 hover:text-primary">Browse</Link></li>
              <li><Link href="#how-it-works" className="text-foreground/70 hover:text-primary">How It Works</Link></li>
              <li><Link href="/login" className="text-foreground/70 hover:text-primary">Login</Link></li>
              <li><Link href="/signup" className="text-foreground/70 hover:text-primary">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold">Community</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-foreground/70 hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary">Events</Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-foreground/70 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-foreground/70 hover:text-primary">Contact</Link></li>
               <li><Link href="/admin" className="text-foreground/70 hover:text-primary">Admin</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex items-center justify-between py-4">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} ReWear. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-foreground/60 hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-foreground/60 hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-foreground/60 hover:text-primary"><Facebook className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
