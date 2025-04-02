import Link from 'next/link';
import { UserButton } from '../components/auth/user-button';
import { ModeToggle } from './mode-toggle';
import { FileType2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-background py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <FileType2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Convertify</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link href="/formats" className="text-sm font-medium transition-colors hover:text-primary">
            Supported Formats
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
