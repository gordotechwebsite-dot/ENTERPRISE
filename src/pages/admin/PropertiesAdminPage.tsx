import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { useSite } from '../../context/useSite';
import { typeLabels, cities } from '../../data/properties';
import PropertyForm from '../../components/admin/PropertyForm';
import type { Property } from '../../types';

const badgeColor: Record<string, string> = {
  venta: 'bg-emerald-50 text-emerald-700',
  'renta-mensual': 'bg-sky-50 text-sky-700',
  'renta-corta': 'bg-violet-50 text-violet-700',
};

export default function PropertiesAdminPage() {
  const { properties, deleteProperty } = useSite();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCity, setFilterCity] = useState('Todas');
  const [editing, setEditing] = useState<Property | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = properties.filter((p) => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (filterCity !== 'Todas' && p.city !== filterCity) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (creating || editing) {
    return (
      <PropertyForm
        property={editing ?? undefined}
        onClose={() => { setCreating(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-brand-900">Propiedades</h1>
          <p className="mt-1 text-[13px] text-brand-500">{properties.length} propiedades en total</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" />
          Nueva propiedad
        </button>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-brand-200 py-2 pr-4 pl-9 text-[13px] outline-none focus:border-accent-400"
            placeholder="Buscar propiedad..."
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-brand-200 px-3 py-2 text-[13px] outline-none focus:border-accent-400"
        >
          <option value="all">Todos los tipos</option>
          {Object.entries(typeLabels).filter(([k]) => k !== 'all').map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="rounded-lg border border-brand-200 px-3 py-2 text-[13px] outline-none focus:border-accent-400"
        >
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-brand-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-brand-100 bg-brand-50/60">
                <th className="px-4 py-3 font-semibold text-brand-600">Propiedad</th>
                <th className="px-4 py-3 font-semibold text-brand-600">Tipo</th>
                <th className="px-4 py-3 font-semibold text-brand-600">Ciudad</th>
                <th className="px-4 py-3 font-semibold text-brand-600">Precio</th>
                <th className="px-4 py-3 font-semibold text-brand-600">Estado</th>
                <th className="px-4 py-3 text-right font-semibold text-brand-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-brand-100 last:border-0 hover:bg-brand-50/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="h-10 w-14 rounded-md object-cover" />
                      <div>
                        <div className="font-medium text-brand-900">{p.title}</div>
                        <div className="text-[11px] text-brand-500">{p.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeColor[p.type]}`}>
                      {typeLabels[p.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-600">{p.city}</td>
                  <td className="px-4 py-3 font-medium text-brand-900">{p.priceLabel}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {p.isFeatured && <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600">Destacada</span>}
                      {p.isNew && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">Nueva</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditing(p)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-400 transition-colors hover:bg-brand-100 hover:text-brand-700"
                        title="Editar"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleting(p.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Eliminar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-brand-400">
                    No se encontraron propiedades
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete modal */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-brand-900">Eliminar propiedad</h3>
              <button onClick={() => setDeleting(null)} className="text-brand-400 hover:text-brand-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-5 text-[13px] text-brand-500">¿Estás seguro? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleting(null)} className="flex-1 rounded-lg border border-brand-200 py-2 text-[13px] font-medium text-brand-600 hover:bg-brand-50">
                Cancelar
              </button>
              <button
                onClick={() => { deleteProperty(deleting); setDeleting(null); }}
                className="flex-1 rounded-lg bg-red-500 py-2 text-[13px] font-semibold text-white hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
