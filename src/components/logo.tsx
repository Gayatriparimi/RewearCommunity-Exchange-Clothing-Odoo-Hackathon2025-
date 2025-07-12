import { Leaf } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = "/", className }: LogoProps) {
  const logoContent = (
    <>
      <Leaf className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline text-foreground">
        ReWear
      </span>
    </>
  );

  return (
    <Link href={href} className={`flex items-center gap-2 ${className}`}>
      {logoContent}
    </Link>
  );
}
