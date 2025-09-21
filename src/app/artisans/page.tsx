import { artisans } from '@/lib/data';
import { ArtisanCard } from '@/components/shared/artisan-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ArtisansPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Artisan Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Meet the talented individuals behind the crafts. Explore their stories, styles, and creations.
        </p>
      </div>

      <div className="mb-8 sticky top-14 z-40 bg-background/80 backdrop-blur-sm py-4 -my-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, craft, region, or style..."
            className="w-full pl-10 py-6"
          />
        </div>
        {/* Advanced filters could be added here */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
}
