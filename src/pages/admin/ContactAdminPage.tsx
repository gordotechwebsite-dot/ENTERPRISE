import { useState, type FormEvent } from 'react';
import { Save, Check } from 'lucide-react';
import { useSite } from '../../context/useSite';

export default function ContactAdminPage() {
  const { contact, updateContact } = useSite();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ ...contact });

  function set(key: keyof typeof form, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputCls = 'w-full rounded-lg border border-brand-200 px-3 py-2.5 text-[13px] text-brand-900 outline-none transition-colors focus:border-accent-400 focus:ring-2 focus:ring-accent-100';
  const labelCls = 'mb-1.5 block text-[12px] font-semibold tracking-wide text-brand-600 uppercase';

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-brand-900">Contacto</h1>
          <p className="mt-1 text-[13px] text-brand-500">Administra la información de contacto del sitio</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[13px] font-medium text-emerald-600">
            <Check className="h-4 w-4" /> Guardado
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Información principal</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Teléfono</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>WhatsApp (solo números)</label>
              <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className={inputCls} placeholder="573001234567" />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ciudad</label>
              <input value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Dirección</label>
              <input value={form.address} onChange={(e) => set('address', e.target.value)} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Horario de atención</label>
              <textarea value={form.hours} onChange={(e) => set('hours', e.target.value)} rows={2} className={inputCls} />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Redes sociales</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Instagram (URL)</label>
              <input value={form.instagram} onChange={(e) => set('instagram', e.target.value)} className={inputCls} placeholder="https://instagram.com/enterprise" />
            </div>
            <div>
              <label className={labelCls}>Facebook (URL)</label>
              <input value={form.facebook} onChange={(e) => set('facebook', e.target.value)} className={inputCls} placeholder="https://facebook.com/enterprise" />
            </div>
          </div>
        </section>

        <button type="submit" className="flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-800">
          <Save className="h-4 w-4" />
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
