import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold uppercase tracking-wider text-primary">Our Story</p>
          <h1 className="mt-2 text-4xl font-headline font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Connecting Cultures, Craft by Craft
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
            ArtisanVerse was born from a simple idea: that every handmade object has a soul and a story worth sharing.
          </p>
        </div>

        {aboutImage && (
          <div className="mt-12">
            <div className="relative h-96 overflow-hidden rounded-xl shadow-lg">
              <Image
                src={aboutImage.imageUrl}
                alt="A group of diverse artisans"
                layout="fill"
                objectFit="cover"
                data-ai-hint={aboutImage.imageHint}
              />
            </div>
          </div>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-x-16">
          <div>
            <h2 className="text-3xl font-headline font-extrabold">Our Mission & Vision</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our mission is to build a sustainable and empowering ecosystem for artisans worldwide. We envision a world where traditional crafts are not just preserved, but celebrated and integrated into modern life. We strive to provide a platform where artisans can achieve financial independence, share their cultural heritage, and connect directly with a global community that values their work.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-headline font-extrabold">Why Support Artisans?</h2>
            <ul className="mt-4 space-y-4 text-lg text-muted-foreground">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary font-bold">✓</span>
                <span className="ml-3"><strong>Preserve Culture:</strong> Each purchase helps sustain ancient techniques and cultural traditions.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary font-bold">✓</span>
                <span className="ml-3"><strong>Empower Communities:</strong> Your support provides a fair and stable income for artisans and their families.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary font-bold">✓</span>
                <span className="ml-3"><strong>Choose Sustainability:</strong> Handcrafted goods promote conscious consumption and often use sustainable, local materials.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary font-bold">✓</span>
                <span className="ml-3"><strong>Own Something Unique:</strong> You acquire a one-of-a-kind piece infused with the maker's story and passion.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
            <h2 className="text-3xl font-headline font-extrabold">Join Our Movement</h2>
            <p className="mt-4 max-w-md mx-auto text-lg text-muted-foreground">
                Whether you're a maker or a patron, you have a place in our story.
            </p>
            <div className="mt-6 flex justify-center gap-4">
                <Button size="lg" asChild>
                    <Link href="/marketplace">Shop the Collection</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/join">Become an Artisan</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
