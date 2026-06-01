import { Building2, MessageSquare, Eye, TrendingUp } from 'lucide-react';
import { useSite } from '../../context/useSite';
import { typeLabels } from '../../data/properties';

export default function DashboardPage() {
  const { properties, messages } = useSite();
  const unread = messages.filter((m) => !m.read).length;

  const byType = properties.reduce<Record<string, number>>((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { icon: Building2, label: 'Propiedades', value: properties.length, color: 'bg-blue-50 text-blue-600' },
    { icon: MessageSquare, label: 'Mensajes', value: messages.length, sub: unread > 0 ? `${unread} sin leer` : undefined, color: 'bg-amber-50 text-amber-600' },
    { icon: Eye, label: 'Destacadas', value: properties.filter((p) => p.isFeatured).length, color: 'bg-emerald-50 text-emerald-600' },
    { icon: TrendingUp, label: 'Nuevas', value: properties.filter((p) => p.isNew).length, color: 'bg-violet-50 text-violet-600' },
  ];

  return (
    <div>
      <h1 className="text-[24px] font-bold text-brand-900">Dashboard</h1>
      <p className="mt-1 text-[13px] text-brand-500">Resumen general del sitio</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="rounded-xl border border-brand-200 bg-white p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-[26px] font-bold leading-tight text-brand-900">{value}</div>
            <div className="mt-0.5 text-[12px] font-medium text-brand-500">{label}</div>
            {sub && <div className="mt-1 text-[11px] font-medium text-amber-500">{sub}</div>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* By type */}
        <div className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Propiedades por tipo</h2>
          <div className="space-y-3">
            {Object.entries(byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-[13px] text-brand-600">{typeLabels[type] || type}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-brand-100">
                    <div
                      className="h-full rounded-full bg-accent-400"
                      style={{ width: `${(count / properties.length) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-[13px] font-semibold text-brand-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-brand-900">Mensajes recientes</h2>
          {messages.length === 0 ? (
            <p className="text-[13px] text-brand-400">No hay mensajes todavía</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 5).map((m) => (
                <div key={m.id} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${m.read ? 'bg-brand-300' : 'bg-amber-400'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[13px] font-medium text-brand-900">{m.name}</span>
                      <span className="shrink-0 text-[11px] text-brand-400">
                        {new Date(m.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="truncate text-[12px] text-brand-500">{m.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
