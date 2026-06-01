import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Handshake, TrendingUp, Clock } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

const marqueeText = 'Expertos en Inmuebles ';

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  const featured = properties.filter((p) => p.isFeatured);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-950/50 to-brand-950/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-28 pb-20 lg:px-10 lg:pt-0 lg:pb-0">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              Encuentra
              <br />
              tu <span className="text-accent-300">lugar</span>
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">
              Apartamentos en venta, rentas mensuales y estancias cortas en las mejores ubicaciones de Colombia.
            </p>
            <div className="mt-8">
              <SearchBar />
            </div>

          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="overflow-hidden border-b border-brand-100 bg-white py-4">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-6 text-[13px] font-semibold tracking-[0.2em] text-brand-300 uppercase">
              {marqueeText}
              <span className="mx-4 text-accent-300">&#x2022;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Comprar',
                desc: 'Apartamentos de lujo, familiares y de inversión en las mejores zonas.',
                link: '/propiedades?type=venta',
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
                count: properties.filter((p) => p.type === 'venta').length,
              },
              {
                title: 'Renta Mensual',
                desc: 'Arriendos con las mejores condiciones. Amoblados y sin amoblar.',
                link: '/propiedades?type=renta-mensual',
                img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
                count: properties.filter((p) => p.type === 'renta-mensual').length,
              },
              {
                title: 'Estancias Cortas',
                desc: 'Vacaciones, negocios o nómadas digitales. Experiencias de lujo.',
                link: '/propiedades?type=renta-corta',
                img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
                count: properties.filter((p) => p.type === 'renta-corta').length,
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[3/2]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[12px] font-semibold tracking-wider text-white/60 uppercase">
                    {cat.count} propiedades
                  </span>
                  <h3 className="mt-1 text-[22px] font-bold text-white">{cat.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/70">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES (horizontal scroll like eXp) ─── */}
      <section className="bg-brand-50 py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[13px] font-semibold tracking-wider text-accent-500 uppercase">
                {featured.length}+ propiedades en
              </p>
              <h2 className="mt-1 text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-brand-900">
                — Colombia
              </h2>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors hover:bg-brand-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors hover:bg-brand-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {featured.map((p) => (
              <div key={p.id} className="w-[300px] shrink-0 snap-start">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/propiedades"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-[14px] font-semibold text-brand-900 transition-colors hover:bg-brand-100"
            >
              Ver todas las propiedades
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-[12px] font-semibold tracking-widest text-accent-500 uppercase">
                Por qué Enterprise
              </p>
              <h2 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-brand-900">
                Más que una inmobiliaria,
                <br />
                tu aliado de confianza
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-brand-500">
                Con más de 10 años de experiencia en el mercado colombiano, te acompañamos en cada paso para encontrar la propiedad perfecta.
              </p>
              <Link
                to="/contacto"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Hablar con un asesor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Confianza', desc: 'Verificamos cada propiedad y propietario.' },
                { icon: Clock, title: 'Atención 24/7', desc: 'Asesores disponibles 7 días a la semana.' },
                { icon: Handshake, title: 'Acompañamiento', desc: 'Te guiamos desde la búsqueda hasta la firma.' },
                { icon: TrendingUp, title: 'Inversión', desc: 'Análisis de mercado para las mejores decisiones.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-100 bg-brand-50 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-[15px] font-semibold text-brand-900">{item.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-brand-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-brand-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=600&fit=crop)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-5 text-center lg:px-10">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight text-white">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-brand-300">
            Agenda una visita hoy y conoce tu próxima propiedad con uno de nuestros asesores.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/propiedades"
              className="w-full rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-brand-900 transition-colors hover:bg-brand-100 sm:w-auto"
            >
              Explorar propiedades
            </Link>
            <Link
              to="/contacto"
              className="w-full rounded-full border border-white/20 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Contactar asesor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
