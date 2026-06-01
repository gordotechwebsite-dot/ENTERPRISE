import { useState } from 'react';
import { Mail, MailOpen, Trash2, X, Phone, Clock } from 'lucide-react';
import { useSite } from '../../context/useSite';
import type { ContactMessage } from '../../context/siteTypes';

export default function MessagesPage() {
  const { messages, markMessageRead, deleteMessage } = useSite();
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const unread = messages.filter((m) => !m.read).length;

  function handleSelect(m: ContactMessage) {
    setSelected(m);
    if (!m.read) markMessageRead(m.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-brand-900">Mensajes</h1>
          <p className="mt-1 text-[13px] text-brand-500">
            {messages.length} mensajes{unread > 0 ? ` · ${unread} sin leer` : ''}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="mt-12 text-center">
          <Mail className="mx-auto h-12 w-12 text-brand-200" />
          <p className="mt-3 text-[15px] font-medium text-brand-400">No hay mensajes todavía</p>
          <p className="mt-1 text-[13px] text-brand-300">Los mensajes del formulario de contacto aparecerán aquí</p>
        </div>
      ) : (
        <div className="mt-5 space-y-2">
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => handleSelect(m)}
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-brand-50 ${
                m.read ? 'border-brand-200 bg-white' : 'border-accent-200 bg-accent-50/30'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {m.read ? (
                  <MailOpen className="h-5 w-5 text-brand-300" />
                ) : (
                  <Mail className="h-5 w-5 text-accent-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[14px] ${m.read ? 'font-medium text-brand-700' : 'font-semibold text-brand-900'}`}>
                    {m.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-brand-400">
                    {new Date(m.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!m.read && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-accent-500" />}
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-[12px] text-brand-500">
                  <span>{m.email}</span>
                  {m.phone && <span>· {m.phone}</span>}
                </div>
                <p className="mt-1 truncate text-[13px] text-brand-600">{m.message}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setDeleting(m.id); }}
                className="shrink-0 rounded-lg p-2 text-brand-300 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-brand-900">{selected.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-brand-500">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{selected.email}</span>
                  {selected.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{selected.phone}</span>}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(selected.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-brand-400 hover:text-brand-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            {selected.interest && (
              <div className="mb-3">
                <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-[11px] font-semibold text-brand-600">
                  {selected.interest}
                </span>
              </div>
            )}
            <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-brand-700">{selected.message}</p>
            <div className="mt-5 flex gap-2">
              <a
                href={`mailto:${selected.email}`}
                className="flex items-center gap-2 rounded-lg bg-brand-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-800"
              >
                <Mail className="h-4 w-4" /> Responder
              </a>
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 rounded-lg border border-brand-200 px-4 py-2 text-[13px] font-medium text-brand-700 hover:bg-brand-50"
                >
                  <Phone className="h-4 w-4" /> Llamar
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6">
            <h3 className="text-[16px] font-bold text-brand-900">Eliminar mensaje</h3>
            <p className="mt-2 mb-5 text-[13px] text-brand-500">¿Estás seguro? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleting(null)} className="flex-1 rounded-lg border border-brand-200 py-2 text-[13px] font-medium text-brand-600 hover:bg-brand-50">
                Cancelar
              </button>
              <button
                onClick={() => { deleteMessage(deleting); setDeleting(null); if (selected?.id === deleting) setSelected(null); }}
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
