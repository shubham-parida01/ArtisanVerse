import Link from 'next/link';
import Image from 'next/image';
import type { Artisan } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  const avatar = PlaceHolderImages.find(img => img.id === artisan.avatarImageId);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/artisans/${artisan.id}`}>
          <div className="aspect-square relative">
            {avatar && (
              <Image
                src={avatar.imageUrl}
                alt={`Portrait of ${artisan.name}`}
                fill
                className="object-cover"
                data-ai-hint={avatar.imageHint}
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">
          <Link href={`/artisans/${artisan.id}`}>{artisan.name}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">{artisan.craft}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{artisan.region}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="secondary">{artisan.style}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/artisans/${artisan.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
