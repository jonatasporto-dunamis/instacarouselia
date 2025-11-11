import { Presentation } from 'lucide-react';
import { AuthButton } from '@/components/app/auth-button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-3 p-4 border-b bg-card/50">
      <Link href="/" className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Presentation className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-foreground font-headline">
          Dunamis<span className="text-primary">Post</span>
        </h1>
      </Link>
      <AuthButton />
    </header>
  );
}
