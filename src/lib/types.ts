
import type React from 'react';

export interface Artisan {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'artisan';
  craft: string;
  region: string;
  style: string;
  bio: string;
  avatarImageId: string;
  coverImageId: string;
  galleryImageIds: string[];
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  artisanId: string;
  categoryId: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  imageIds: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Should be hashed in a real app
    role: 'customer' | 'artisan';
}

export interface CustomerPurchase {
    orderId: string;
    customerId: string;
    productId: string;
    purchaseDate: string;
}
