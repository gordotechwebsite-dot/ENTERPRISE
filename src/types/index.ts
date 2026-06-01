export type PropertyType = 'venta' | 'renta-mensual' | 'renta-corta';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  priceLabel: string;
  city: string;
  neighborhood: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  rating?: number;
  reviewCount?: number;
  host?: string;
  isSuperhost?: boolean;
}

export interface FilterState {
  type: PropertyType | 'all';
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  city: string;
  search: string;
}
