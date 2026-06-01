import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '../types';

const typeBadge: Record<string, { bg: string; label: string }> = {
  venta: { bg: 'bg-emerald-600', label: 'Venta' },
  'renta-mensual': { bg: 'bg-sky-600', label: 'Mensual' },
  'renta-corta': { bg: 'bg-violet-600', label: 'Corta' },
};

export default function PropertyCard({ property }: { property: Property }) {
  const [img, setImg] = useState(0);
  const [liked, setLiked] = useState(false);

  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImg((p) => (p + dir + property.images.length) % property.images.length);
  };

  return (
    <Link to={`/propiedad/${property.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-100">
        <img
          src={property.images[img]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Like */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-10"
        >
          <Heart
            className={`h-5 w-5 drop-shadow ${liked ? 'fill-red-500 text-red-500' : 'fill-black/25 text-white'}`}
          />
        </button>

        {/* Badge */}
        <span className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white ${typeBadge[property.type].bg}`}>
          {typeBadge[property.type].label}
        </span>

        {property.isNew && (
          <span className="absolute top-3 left-[72px] rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-900 backdrop-blur-sm">
            Nuevo
          </span>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-[18px] font-bold drop-shadow">{property.priceLabel}</span>
        </div>

        {/* Carousel nav */}
        {property.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => go(-1, e)}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-1 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4 text-brand-900" />
            </button>
            <button
              type="button"
              onClick={(e) => go(1, e)}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-1 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4 text-brand-900" />
            </button>
            <div className="absolute bottom-3 right-3 flex gap-1">
              {property.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === img ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug text-brand-900">
            {property.title}
          </h3>
          {property.rating != null && (
            <span className="flex shrink-0 items-center gap-1 text-[13px] text-brand-700">
              <Star className="h-3 w-3 fill-brand-900 text-brand-900" />
              {property.rating}
            </span>
          )}
        </div>

        <p className="text-[13px] text-brand-500">{property.location}</p>

        <div className="flex items-center gap-4 text-[13px] text-brand-400">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" /> {property.bedrooms} Hab
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {property.bathrooms} Ba
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {property.area} m²
          </span>
        </div>
      </div>
    </Link>
  );
}
