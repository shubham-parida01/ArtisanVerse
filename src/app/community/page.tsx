import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default function CommunityPage() {
  const blogImage = PlaceHolderImages.find(img => img.id === 'community-blog');

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Community Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Connect, learn, and share. Welcome to the heart of ArtisanVerse.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Blog & Articles</CardTitle>
            <CardDescription>Stories of craft, culture, and creativity.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {blogImage && (
              <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                <Image src={blogImage.imageUrl} alt="Blog" layout="fill" objectFit="cover" data-ai-hint={blogImage.imageHint} />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Dive into articles about craft traditions, artisan spotlights, and the cultural significance of handmade goods.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button variant="outline" className="w-full">
              Read the Blog <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Events & Workshops</CardTitle>
            <CardDescription>Join live sessions with our artisans.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div className="border p-4 rounded-md">
                <p className="font-semibold">Live Pottery Demo with Elena Vance</p>
                <p className="text-sm text-muted-foreground">Next Tuesday, 4:00 PM EST</p>
              </div>
              <div className="border p-4 rounded-md">
                <p className="font-semibold">Weaving Workshop with Aisha Begum</p>
                <p className="text-sm text-muted-foreground">In 2 weeks, sign-ups open soon!</p>
              </div>
            </div>
          </CardContent>
          <div className="p-6 pt-0">
            <Button variant="outline" className="w-full">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Customer Stories</CardTitle>
            <CardDescription>See our crafts in their new homes.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
              "The vase I bought is the centerpiece of my living room. I love knowing the story behind it. Thank you, Elena!"
            </blockquote>
            <p className="text-right mt-2 font-semibold">- Sarah J.</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button variant="outline" className="w-full">
              Share Your Story <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
