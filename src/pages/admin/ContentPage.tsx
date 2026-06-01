import { useState, type FormEvent } from 'react';
import { Save, Check } from 'lucide-react';
import { useSite } from '../../context/useSite';

export default function ContentPage() {
  const { content, updateContent } = useSite();
  const [saved, setSaved] = useState(false);

  const [hero, setHero] = useState({ ...content.hero });
  const [categories, setCategories] = useState(content.categories.map((c) => ({ ...c })));
  const [whyUs, setWhyUs] = useState({ ...content.whyUs });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateContent({ hero, categories, whyUs });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputCls = 'w-full rounded-lg border border-brand-200 px-3 py-2.5 text-[13px] text-brand-900 outline-none transition-colors focus:border-accent-400 focus:ring-2 focus:ring-accent-100';
  const labelCls = 'mb-1.5 block text-[12px] font-semibold tracking-wide text-brand-600 uppercase';

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-brand-900">Contenido</h1>
          <p className="mt-1 text-[13px] text-brand-500">Edita los textos de la página principal</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[13px] font-medium text-emerald-600">
            <Check className="h-4 w-4" /> Guardado
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Hero */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Sección Hero</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Título principal</label>
              <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Texto destacado</label>
              <input value={hero.highlight} onChange={(e) => setHero({ ...hero, highlight: e.target.value })} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Subtítulo</label>
              <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Categorías</h2>
          <div className="space-y-5">
            {categories.map((cat, i) => (
              <div key={i} className="rounded-lg border border-brand-100 bg-brand-50/50 p-4">
                <p className="mb-3 text-[12px] font-semibold text-brand-500">Categoría {i + 1}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Título</label>
                    <input
                      value={cat.title}
                      onChange={(e) => { const c = [...categories]; c[i] = { ...c[i], title: e.target.value }; setCategories(c); }}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Descripción</label>
                    <input
                      value={cat.description}
                      onChange={(e) => { const c = [...categories]; c[i] = { ...c[i], description: e.target.value }; setCategories(c); }}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Por qué Enterprise</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Subtítulo</label>
              <input value={whyUs.subtitle} onChange={(e) => setWhyUs({ ...whyUs, subtitle: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Título</label>
              <input value={whyUs.title} onChange={(e) => setWhyUs({ ...whyUs, title: e.target.value })} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Descripción</label>
              <textarea value={whyUs.description} onChange={(e) => setWhyUs({ ...whyUs, description: e.target.value })} rows={3} className={inputCls} />
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
