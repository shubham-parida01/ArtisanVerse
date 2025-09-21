import { notFound } from 'next/navigation';
import Image from 'next/image';
import { artisans } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MapPin, Heart } from 'lucide-react';
import { ProductCard } from '@/components/shared/product-card';

export default function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = artisans.find(a => a.id === params.id);

  if (!artisan) {
    notFound();
  }

  const avatar = PlaceHolderImages.find(img => img.id === artisan.avatarImageId);
  const cover = PlaceHolderImages.find(img => img.id === artisan.coverImageId);

  return (
    <div>
      <div className="relative h-64 md:h-80 w-full">
        {cover && (
          <Image
            src={cover.imageUrl}
            alt={`Cover image for ${artisan.name}'s workshop`}
            fill
            className="object-cover"
            data-ai-hint={cover.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-24">
        <div className="relative bg-card rounded-xl shadow-xl p-6 md:flex md:items-start md:space-x-8">
          <div className="md:w-1/4 flex flex-col items-center">
            <Avatar className="h-40 w-40 border-4 border-card -mt-24 mb-4">
              {avatar && <AvatarImage src={avatar.imageUrl} alt={artisan.name} />}
              <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold font-headline text-center">{artisan.name}</h1>
            <p className="text-muted-foreground mt-1">{artisan.craft}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{artisan.region}</span>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">{artisan.style}</Badge>
            </div>
            <Button className="mt-6 w-full flex items-center gap-2">
              <Heart className="h-4 w-4" /> Follow
            </Button>
          </div>

          <div className="md:w-3/4 mt-8 md:mt-0">
            <Tabs defaultValue="bio" className="w-full">
              <TabsList>
                <TabsTrigger value="bio">Bio</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              <TabsContent value="bio" className="mt-4">
                <Card>
                    <div className="p-6 prose prose-lg max-w-none text-card-foreground">
                        <p>{artisan.bio}</p>
                    </div>
                </Card>
              </TabsContent>
              <TabsContent value="gallery" className="mt-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artisan.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
