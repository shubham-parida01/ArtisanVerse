import type { Artisan, Product, Category, CustomerPurchase } from './types';
import { Paintbrush, Hammer, Gem } from 'lucide-react';
import { PotteryIcon, TextilesIcon } from '@/components/icons';
import artisansData from './data/artisans.json';
import productsData from './data/products.json';

export const categories: Category[] = [
  { id: 'textiles', name: 'Textiles', icon: TextilesIcon },
  { id: 'pottery', name: 'Pottery', icon: PotteryIcon },
  { id: 'jewelry', name: 'Jewelry', icon: Gem },
  { id: 'paintings', name: 'Paintings', icon: Paintbrush },
  { id: 'woodwork', name: 'Woodwork', icon: Hammer },
];

export const products: Product[] = productsData;


// Base profiles without auth data
const artisanProfiles: Omit<Artisan, 'email' | 'password' | 'role' | 'name'>[] = [
  {
    id: 'art-1',
    craft: 'Pottery',
    region: 'Tuscany, Italy',
    style: 'Organic & Ethereal',
    bio: "From her sun-drenched studio in the rolling hills of Tuscany, Elena Vance breathes life into clay. With a background in classical sculpture, her work blends timeless forms with an organic, ethereal quality. Each piece is a quiet conversation between her hands and the earth, inspired by the natural landscapes and ancient history that surround her. Elena's signature glazes, developed through years of experimentation, reflect the colors of the Mediterranean sky and sea, making every creation a unique piece of functional art.",
    avatarImageId: 'artisan-elena',
    coverImageId: 'cover-pottery',
    galleryImageIds: ['product-ceramic-vase', 'product-glass-sculpture', 'gallery-1', 'gallery-6'],
    products: products.filter(p => p.artisanId === 'art-1'),
  },
  {
    id: 'art-2',
    craft: 'Woodwork',
    region: 'Oregon, USA',
    style: 'Modern & Rustic',
    bio: "Samuel Jones finds his inspiration in the dense forests of the Pacific Northwest. A third-generation woodworker, he combines traditional joinery techniques with a modern design sensibility. His workshop, nestled among towering Douglas firs, is a sanctuary where he transforms sustainably harvested and reclaimed wood into pieces that are both beautiful and enduring. Samuel believes in honoring the life of the tree, allowing the natural grain, knots, and imperfections of the wood to become central features of his rustic yet refined work.",
    avatarImageId: 'artisan-samuel',
    coverImageId: 'cover-woodwork',
    galleryImageIds: ['product-wooden-bowl', 'product-leather-journal', 'gallery-2', 'gallery-5'],
    products: products.filter(p => p.artisanId === 'art-2'),
  },
  {
    id: 'art-3',
    craft: 'Textiles',
    region: 'Jaipur, India',
    style: 'Vibrant & Traditional',
    bio: "In the vibrant city of Jaipur, Aisha Begum sits at her loom, weaving stories into thread. Her craft is a legacy, a skill passed down from her grandmother, rich with the history and artistry of Rajasthani textiles. Aisha uses natural dyes made from local plants and minerals, creating a dazzling palette that is both eco-conscious and deeply traditional. Her designs, while rooted in heritage, possess a contemporary flair, making her hand-woven scarves, tapestries, and fabrics cherished by a global audience.",
    avatarImageId: 'artisan-aisha',
    coverImageId: 'cover-textiles',
    galleryImageIds: ['product-woven-scarf', 'gallery-3'],
    products: products.filter(p => p.artisanId === 'art-3'),
  },
  {
    id: 'art-4',
    craft: 'Jewelry',
    region: 'Oaxaca, Mexico',
    style: 'Minimalist & Celestial',
    bio: "Marco Diaz's jewelry is a quiet reflection of the vast desert sky over Oaxaca. A self-taught metalsmith, he works primarily with sterling silver and locally sourced stones, creating pieces that are both minimalist and meaningful. His designs are inspired by celestial phenomena—lunar cycles, constellations, and the quiet shimmer of starlight. Marco's process is slow and deliberate, hammering, shaping, and polishing each piece by hand to create jewelry that feels personal, timeless, and connected to the cosmos.",
    avatarImageId: 'artisan-marco',
    coverImageId: 'cover-jewelry',
    galleryImageIds: ['product-silver-necklace', 'gallery-4'],
    products: products.filter(p => p.artisanId === 'art-4'),
  },
];

// Merge authentication data with profile data to create the final, complete artisan records
export const artisans: Artisan[] = artisansData.artisans.map(authArtisan => {
  const profile = artisanProfiles.find(p => p.id === authArtisan.id);
  
  // Combine data, preferring the more detailed profile data but falling back to auth data
  const combined: Artisan = {
    // Start with default/fallback values
    craft: '',
    region: '',
    style: '',
    bio: '',
    avatarImageId: '',
    coverImageId: '',
    galleryImageIds: [],
    products: [],
    // Spread the base profile data (if it exists)
    ...profile,
    // Spread the auth data, which includes id, name, email, password, role,
    // and any saved fields like craft, bio, etc. This overwrites profile data
    // with the latest saved information from artisans.json.
    ...authArtisan,
    // Ensure products are correctly linked, even for new artisans not in artisanProfiles
    products: products.filter(p => p.artisanId === authArtisan.id),
  };

  return combined;
});


export const salesData = [
    { month: 'January', revenue: 605 },
    { month: 'February', revenue: 580 },
    { month: 'March', revenue: 890 },
    { month: 'April', revenue: 710 },
    { month: 'May', revenue: 950 },
    { month: 'June', revenue: 1100 },
];

export const trafficData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        date: date,
        views: 500 + Math.floor(Math.random() * 500) + (i * 20),
    };
});


export const customerPurchases: CustomerPurchase[] = [
    {
        orderId: 'AV3840',
        customerId: 'user-1',
        productId: 'prod-1',
        purchaseDate: '2023-10-26',
    },
    {
        orderId: 'AV3821',
        customerId: 'user-1',
        productId: 'prod-4',
        purchaseDate: '2023-09-15',
    }
]
