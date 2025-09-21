import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ArrowRight } from 'lucide-react';
import { artisans, products, categories } from '@/lib/data';
import { ArtisanCard } from '@/components/shared/artisan-card';
import { ProductCard } from '@/components/shared/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
            <Image
            src={heroImage.imageUrl}
            alt="Artisan's workshop"
            fill
            className="object-cover opacity-70"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background" />
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground dark:text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            Discover Authentic Artistry
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-foreground/90 dark:text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] dark:[text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">
            A curated marketplace connecting you with the stories and creations of talented artisans from around the globe.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <form action="/marketplace" method="GET" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                name="query"
                placeholder="Search for crafts, artisans, or regions..."
                className="w-full rounded-full bg-white/90 py-6 pl-12 pr-4 text-black placeholder:text-black/60"
              />
            </form>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline">Shop by Category</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {categories.map((category) => (
              <Link href={`/marketplace?category=${category.id}`} key={category.id}>
                <Card className="flex flex-col items-center justify-center p-6 aspect-square transition-all duration-300 hover:bg-card hover:shadow-lg hover:-translate-y-1">
                  <category.icon className="h-12 w-12 text-primary" />
                  <p className="mt-4 font-semibold text-center">{category.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight font-headline text-muted-foreground">Featured Artisans</h2>
            <Button variant="link" asChild>
              <Link href="/artisans" className="text-primary">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {artisans.slice(0, 4).map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Trending Crafts</h2>
            <Button variant="link" asChild>
              <Link href="/marketplace">Shop All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Are You an Artisan?</h2>
            <p className="mt-4 max-w-2xl mx-auto">
                Join our community to share your craft, tell your story, and reach a global audience of passionate supporters.
            </p>
            <Button variant="secondary" size="lg" className="mt-8" asChild>
                <Link href="/join">Join as an Artisan</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
