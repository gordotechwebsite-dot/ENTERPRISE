import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { cities, typeLabels } from '../data/properties';
import { useSite } from '../context/useSite';
import type { PropertyType, FilterState } from '../types';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties } = useSite();
  const [showFilters, setShowFilters] = useState(false);

  const urlType = (searchParams.get('type') as PropertyType | 'all') || 'all';
  const urlCity = searchParams.get('city') || '';
  const urlBedrooms = searchParams.get('bedrooms') || '';
  const urlSearch = searchParams.get('search') || '';

  const [localFilters, setLocalFilters] = useState({ minPrice: '', maxPrice: '' });

  const filters: FilterState = useMemo(() => ({
    type: urlType,
    city: urlCity,
    bedrooms: urlBedrooms,
    search: urlSearch,
    minPrice: localFilters.minPrice,
    maxPrice: localFilters.maxPrice,
  }), [urlType, urlCity, urlBedrooms, urlSearch, localFilters]);

  const set = (key: keyof FilterState, val: string) => {
    if (key === 'minPrice' || key === 'maxPrice') {
      setLocalFilters((f) => ({ ...f, [key]: val }));
    } else {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (val && val !== 'all') { next.set(key, val); } else { next.delete(key); }
        return next;
      });
    }
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.type !== 'all' && p.type !== filters.type) return false;
      if (filters.city && filters.city !== 'Todas' && p.city !== filters.city) return false;
      if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const s = `${p.title} ${p.location} ${p.city} ${p.neighborhood} ${p.description}`.toLowerCase();
        if (!s.includes(q)) return false;
      }
      return true;
    });
  }, [filters, properties]);

  const clear = () => { setSearchParams({}); setLocalFilters({ minPrice: '', maxPrice: '' }); };
  const hasFilters = filters.type !== 'all' || filters.city || filters.bedrooms || filters.search;

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-100 bg-brand-50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-10">
          <div>
            <h1 className="text-[24px] font-bold tracking-tight text-brand-900">Propiedades</h1>
            <p className="mt-0.5 text-[13px] text-brand-500">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-[13px] font-medium text-brand-700 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-6 lg:px-10">
        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
              className="w-full rounded-lg border border-brand-200 bg-white py-2.5 pr-4 pl-10 text-[14px] text-brand-900 outline-none focus:border-brand-400"
            />
          </div>

          {/* Type pills */}
          <div className="flex gap-1.5 overflow-x-auto">
            {Object.entries(typeLabels).map(([k, v]) => (
              <button
                key={k}
                type="button"
                onClick={() => set('type', k)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  filters.type === k
                    ? 'bg-brand-900 text-white'
                    : 'border border-brand-200 bg-white text-brand-600 hover:bg-brand-50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={`${showFilters ? 'fixed inset-0 z-50 block bg-black/40' : 'hidden lg:block'} w-full shrink-0 lg:w-56`}
          >
            <div
              className={`${
                showFilters ? 'fixed top-0 right-0 bottom-0 w-72 overflow-y-auto bg-white p-5 shadow-xl' : ''
              } rounded-xl border border-brand-100 bg-white p-5 lg:static lg:w-auto lg:shadow-none`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-brand-900">Filtros</span>
                <div className="flex items-center gap-3">
                  {hasFilters && (
                    <button type="button" onClick={clear} className="text-[12px] font-medium text-accent-500">
                      Limpiar
                    </button>
                  )}
                  <button type="button" onClick={() => setShowFilters(false)} className="lg:hidden">
                    <X className="h-5 w-5 text-brand-400" />
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-5">
                {/* City */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-brand-500 uppercase">
                    Ciudad
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => set('city', e.target.value)}
                    className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-[13px] text-brand-900 outline-none focus:border-brand-400"
                  >
                    <option value="">Todas</option>
                    {cities.filter((c) => c !== 'Todas').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-wider text-brand-500 uppercase">
                    Habitaciones
                  </label>
                  <div className="flex gap-1.5">
                    {['', '1', '2', '3', '4', '5'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => set('bedrooms', n)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-medium ${
                          filters.bedrooms === n
                            ? 'bg-brand-900 text-white'
                            : 'border border-brand-200 bg-white text-brand-600'
                        }`}
                      >
                        {n || '∞'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {showFilters && (
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="mt-6 w-full rounded-lg bg-brand-900 py-2.5 text-[14px] font-semibold text-white lg:hidden"
                >
                  Ver {filtered.length} resultados
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <Search className="h-10 w-10 text-brand-200" />
                <p className="mt-4 text-[16px] font-semibold text-brand-900">Sin resultados</p>
                <p className="mt-1 text-[13px] text-brand-500">Ajusta los filtros de búsqueda</p>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-4 rounded-full bg-brand-900 px-5 py-2 text-[13px] font-semibold text-white"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
