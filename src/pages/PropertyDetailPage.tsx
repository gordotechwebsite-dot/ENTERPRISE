import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Star, Heart, Share2, Phone, Mail, Award } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { useSite } from '../context/useSite';

const typeLabel: Record<string, string> = {
  venta: 'Venta',
  'renta-mensual': 'Renta Mensual',
  'renta-corta': 'Renta Corta',
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { properties, contact } = useSite();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="text-[24px] font-bold text-brand-900">Propiedad no encontrada</h1>
          <Link to="/propiedades" className="mt-4 inline-block text-[14px] font-medium text-accent-500 hover:underline">
            Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  const similar = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Top bar */}
      <div className="border-b border-brand-100">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 lg:px-10">
          <Link to="/propiedades" className="flex items-center gap-2 text-[13px] font-medium text-brand-600 hover:text-brand-900">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={async () => {
                const url = window.location.href;
                const text = `Vi esto en Enterprise Inmobiliaria: ${property.title}`;
                if (navigator.share) {
                  try { await navigator.share({ title: property.title, text, url }); } catch { /* cancelled */ }
                } else {
                  await navigator.clipboard.writeText(`${text}\n${url}`);
                  alert('Link copiado al portapapeles');
                }
              }}
              className="flex items-center gap-1.5 rounded-full border border-brand-200 px-3 py-1.5 text-[12px] font-medium text-brand-700"
            >
              <Share2 className="h-3.5 w-3.5" /> Compartir
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-full border border-brand-200 px-3 py-1.5 text-[12px] font-medium text-brand-700">
              <Heart className="h-3.5 w-3.5" /> Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-10">
        <div className="grid gap-2 overflow-hidden rounded-2xl lg:grid-cols-2 lg:grid-rows-2" style={{ maxHeight: '500px' }}>
          <div className="lg:row-span-2">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>
          {property.images.slice(1, 3).map((img, i) => (
            <div key={i}>
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1400px] px-5 pb-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-brand-100 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
                {typeLabel[property.type]}
              </span>
              {property.isNew && (
                <span className="rounded-md bg-accent-100 px-2.5 py-1 text-[11px] font-semibold text-accent-700">
                  Nuevo
                </span>
              )}
              {property.isSuperhost && (
                <span className="flex items-center gap-1 rounded-md bg-accent-100 px-2.5 py-1 text-[11px] font-semibold text-accent-700">
                  <Award className="h-3 w-3" /> Superhost
                </span>
              )}
            </div>

            <h1 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight tracking-tight text-brand-900">
              {property.title}
            </h1>

            <div className="mt-2 flex items-center gap-4 text-[14px] text-brand-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {property.location}
              </span>
              {property.rating != null && (
                <span className="flex items-center gap-1 text-brand-900">
                  <Star className="h-3.5 w-3.5 fill-brand-900" /> {property.rating}
                  <span className="text-brand-400">({property.reviewCount})</span>
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-6 border-y border-brand-100 py-5">
              {[
                { icon: Bed, val: property.bedrooms, label: 'Habitaciones' },
                { icon: Bath, val: property.bathrooms, label: 'Baños' },
                { icon: Maximize, val: `${property.area} m²`, label: 'Área' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[16px] font-bold text-brand-900">{s.val}</div>
                    <div className="text-[12px] text-brand-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-[16px] font-semibold text-brand-900">Descripción</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-brand-600">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-[16px] font-semibold text-brand-900">Características</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[12px] font-medium text-brand-700"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact card */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-brand-100 bg-white p-6 shadow-lg shadow-brand-900/5">
              <div className="text-[28px] font-bold tracking-tight text-brand-900">
                {property.priceLabel}
              </div>
              {property.host && (
                <p className="mt-1 text-[13px] text-brand-500">
                  Anfitrión: <span className="font-medium text-brand-700">{property.host}</span>
                </p>
              )}

              <div className="mt-5 space-y-2.5">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-900 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  <Phone className="h-4 w-4" /> Llamar ahora
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=Hola, me interesa la propiedad: ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-200 bg-white py-3 text-[14px] font-semibold text-brand-900 transition-colors hover:bg-brand-50"
                >
                  WhatsApp
                </a>
                <Link
                  to="/contacto"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-200 bg-white py-3 text-[14px] font-semibold text-brand-900 transition-colors hover:bg-brand-50"
                >
                  <Mail className="h-4 w-4" /> Agendar visita
                </Link>
              </div>

              <p className="mt-4 text-center text-[11px] text-brand-400">
                Respuesta típica: menos de 1 hora
              </p>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-[20px] font-bold tracking-tight text-brand-900">Propiedades similares</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
