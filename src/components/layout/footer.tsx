import Link from 'next/link';
import { Mountain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
                <Mountain className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">ArtisanVerse</span>
            </Link>
            <p className="text-base">
              Discover authentic artistry from around the world.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Explore</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/marketplace" className="text-base  hover:text-primary transition-colors">Marketplace</Link></li>
                  <li><Link href="/artisans" className="text-base  hover:text-primary transition-colors">Artisans</Link></li>
                  <li><Link href="/community" className="text-base  hover:text-primary transition-colors">Community</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">About</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/about" className="text-base  hover:text-primary transition-colors">Our Story</Link></li>
                  <li><Link href="/support" className="text-base  hover:text-primary transition-colors">Support</Link></li>
                  <li><Link href="/join" className="text-base  hover:text-primary transition-colors">Join as Artisan</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base  hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-base  hover:text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-base text-center">&copy; {new Date().getFullYear()} ArtisanVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
