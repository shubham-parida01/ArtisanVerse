'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, User, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';


const navLinks = [
  { href: '/artisans', label: 'Artisan Hub' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
];

function AuthNav() {
    const router = useRouter();
    const pathname = usePathname();
    const [session, setSession] = useState<string | null>(null);

    useEffect(() => {
        const cookie = Cookies.get('auth-session');
        setSession(cookie || null);
    }, [pathname]);

    const handleLogout = () => {
        Cookies.remove('auth-session', { path: '/' });
        setSession(null);
        router.push('/');
        router.refresh();
    };

    if (session) {
        const [role, id] = session.split(':');
        const isArtisan = role === 'artisan';
        const accountUrl = isArtisan ? '/dashboard-artisan' : '/dashboard-customer';

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Logged In</p>
                            <p className="text-xs leading-none text-muted-foreground">as {role}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={accountUrl}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Log In</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/login-customer">As a Customer</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/login-artisan">As an Artisan</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>Sign Up</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/signup-customer">As a Customer</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/signup-artisan">As an Artisan</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              ArtisanVerse
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="font-bold">ArtisanVerse</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)]">
                    <nav className="flex flex-col items-start gap-4 text-lg">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Quick search could go here */}
          </div>

          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <AuthNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
