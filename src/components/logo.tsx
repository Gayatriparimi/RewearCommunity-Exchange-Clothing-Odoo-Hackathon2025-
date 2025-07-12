import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Leaf className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline text-foreground">
        ReWear
      </span>
    </Link>
  );
}
