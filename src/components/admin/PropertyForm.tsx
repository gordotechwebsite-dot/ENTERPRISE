import { useState, type FormEvent } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useSite } from '../../context/useSite';
import { cities } from '../../data/properties';
import type { Property, PropertyType } from '../../types';

interface Props {
  property?: Property;
  onClose: () => void;
}

const typeOptions: { value: PropertyType; label: string }[] = [
  { value: 'venta', label: 'Venta' },
  { value: 'renta-mensual', label: 'Renta Mensual' },
  { value: 'renta-corta', label: 'Renta Corta' },
];

const cityOptions = cities.filter((c) => c !== 'Todas');

export default function PropertyForm({ property, onClose }: Props) {
  const { addProperty, updateProperty } = useSite();
  const isEdit = !!property;

  const [form, setForm] = useState({
    title: property?.title ?? '',
    description: property?.description ?? '',
    type: property?.type ?? ('venta' as PropertyType),
    price: property?.price?.toString() ?? '',
    priceLabel: property?.priceLabel ?? '',
    city: property?.city ?? cityOptions[0],
    neighborhood: property?.neighborhood ?? '',
    bedrooms: property?.bedrooms?.toString() ?? '2',
    bathrooms: property?.bathrooms?.toString() ?? '2',
    area: property?.area?.toString() ?? '',
    images: property?.images ?? [''],
    features: property?.features ?? [''],
    isFeatured: property?.isFeatured ?? false,
    isNew: property?.isNew ?? true,
    host: property?.host ?? '',
    rating: property?.rating?.toString() ?? '',
    reviewCount: property?.reviewCount?.toString() ?? '',
    isSuperhost: property?.isSuperhost ?? false,
  });

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanImages = form.images.filter(Boolean);
    const cleanFeatures = form.features.filter(Boolean);
    const data: Property = {
      id: property?.id ?? `prop-${Date.now()}`,
      title: form.title,
      description: form.description,
      type: form.type,
      price: Number(form.price) || 0,
      priceLabel: form.priceLabel,
      city: form.city,
      neighborhood: form.neighborhood,
      location: `${form.neighborhood}, ${form.city}`,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      area: Number(form.area) || 0,
      images: cleanImages.length > 0 ? cleanImages : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop'],
      features: cleanFeatures,
      isFeatured: form.isFeatured,
      isNew: form.isNew,
      ...(form.host ? { host: form.host } : {}),
      ...(form.rating ? { rating: Number(form.rating) } : {}),
      ...(form.reviewCount ? { reviewCount: Number(form.reviewCount) } : {}),
      ...(form.isSuperhost ? { isSuperhost: true } : {}),
    };

    if (isEdit) {
      updateProperty(property.id, data);
    } else {
      addProperty(data);
    }
    onClose();
  }

  const inputCls = 'w-full rounded-lg border border-brand-200 px-3 py-2.5 text-[13px] text-brand-900 outline-none transition-colors focus:border-accent-400 focus:ring-2 focus:ring-accent-100';
  const labelCls = 'mb-1.5 block text-[12px] font-semibold tracking-wide text-brand-600 uppercase';

  return (
    <div>
      <button onClick={onClose} className="mb-5 flex items-center gap-2 text-[13px] font-medium text-brand-500 hover:text-brand-900">
        <ArrowLeft className="h-4 w-4" />
        Volver a propiedades
      </button>

      <h1 className="text-[24px] font-bold text-brand-900">{isEdit ? 'Editar propiedad' : 'Nueva propiedad'}</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Basic info */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Información básica</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls}>Título</label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} required />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Descripción</label>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Tipo</label>
              <select value={form.type} onChange={(e) => set('type', e.target.value as PropertyType)} className={inputCls}>
                {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Ciudad</label>
              <select value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls}>
                {cityOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Barrio</label>
              <input value={form.neighborhood} onChange={(e) => set('neighborhood', e.target.value)} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Área (m²)</label>
              <input type="number" value={form.area} onChange={(e) => set('area', e.target.value)} className={inputCls} required />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Precio</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Precio (número)</label>
              <input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Etiqueta de precio</label>
              <input value={form.priceLabel} onChange={(e) => set('priceLabel', e.target.value)} className={inputCls} placeholder="$1,200,000,000 COP" required />
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Especificaciones</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Habitaciones</label>
              <input type="number" min="0" value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Baños</label>
              <input type="number" min="0" value={form.bathrooms} onChange={(e) => set('bathrooms', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Área (m²)</label>
              <input type="number" value={form.area} onChange={(e) => set('area', e.target.value)} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Imágenes (URLs)</h2>
          <div className="space-y-2">
            {form.images.map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={url}
                  onChange={(e) => { const imgs = [...form.images]; imgs[i] = e.target.value; set('images', imgs); }}
                  className={inputCls}
                  placeholder="https://images.unsplash.com/..."
                />
                {form.images.length > 1 && (
                  <button type="button" onClick={() => set('images', form.images.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => set('images', [...form.images, ''])} className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-accent-500 hover:text-accent-700">
            <Plus className="h-3.5 w-3.5" /> Agregar imagen
          </button>
        </section>

        {/* Features */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Características</h2>
          <div className="space-y-2">
            {form.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={feat}
                  onChange={(e) => { const feats = [...form.features]; feats[i] = e.target.value; set('features', feats); }}
                  className={inputCls}
                  placeholder="Ej: Piscina, WiFi, Portería 24h"
                />
                {form.features.length > 1 && (
                  <button type="button" onClick={() => set('features', form.features.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => set('features', [...form.features, ''])} className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-accent-500 hover:text-accent-700">
            <Plus className="h-3.5 w-3.5" /> Agregar característica
          </button>
        </section>

        {/* Host (for rentals) */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Anfitrión (opcional, para rentas)</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Nombre del anfitrión</label>
              <input value={form.host} onChange={(e) => set('host', e.target.value)} className={inputCls} placeholder="Carolina M." />
            </div>
            <div>
              <label className={labelCls}>Rating</label>
              <input type="number" step="0.01" min="0" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} className={inputCls} placeholder="4.9" />
            </div>
            <div>
              <label className={labelCls}>Reseñas</label>
              <input type="number" value={form.reviewCount} onChange={(e) => set('reviewCount', e.target.value)} className={inputCls} placeholder="42" />
            </div>
          </div>
        </section>

        {/* Flags */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Estado</h2>
          <div className="flex flex-wrap gap-6">
            {([['isFeatured', 'Destacada'], ['isNew', 'Nueva'], ['isSuperhost', 'Superhost']] as const).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-[13px] text-brand-700">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => set(key, e.target.checked)}
                  className="h-4 w-4 rounded border-brand-300 text-accent-500 focus:ring-accent-300"
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border border-brand-200 px-6 py-2.5 text-[13px] font-medium text-brand-600 hover:bg-brand-50">
            Cancelar
          </button>
          <button type="submit" className="rounded-lg bg-brand-900 px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-800">
            {isEdit ? 'Guardar cambios' : 'Crear propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
}
