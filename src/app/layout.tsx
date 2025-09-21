
'use client'

import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/layout/footer';
import { usePathname } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith('/dashboard-artisan') || pathname.startsWith('/dashboard-customer');

  // Metadata cannot be used in a Client Component, so we define it here statically.
  // In a real-world app, you might handle this differently if titles need to be dynamic.
  const metadata: Metadata = {
    title: 'ArtisanVerse - Discover Authentic Artistry',
    description: 'A global marketplace for handcrafted goods, connecting artisans with conscious consumers.',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased flex flex-col', inter.variable, libreBaskerville.variable)}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              {!isDashboardPage && <Header />}
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              {!isDashboardPage && <Footer />}
              <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
