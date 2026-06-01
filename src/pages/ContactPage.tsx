import { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useSite } from '../context/useSite';
import { FacebookIcon, InstagramIcon, AirbnbIcon } from '../components/SocialIcons';

export default function ContactPage() {
  const { contact, addMessage } = useSite();
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    addMessage({
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      interest: fd.get('interest') as string,
      message: fd.get('message') as string,
    });
    setSent(true);
  };

  const infoCards = [
    { icon: MapPin, title: 'Oficina principal', text: `${contact.address}\n${contact.city}` },
    { icon: Phone, title: 'Teléfono', text: contact.phone },
    { icon: Mail, title: 'Email', text: contact.email },
    { icon: Clock, title: 'Horario', text: contact.hours },
  ];

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Header */}
      <div className="bg-brand-950 py-16 text-center">
        <p className="text-[12px] font-semibold tracking-widest text-accent-400 uppercase">
          Contacto
        </p>
        <h1 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-tight text-white">
          Hablemos de tu próximo hogar
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-brand-400">
          Nuestros asesores están listos para ayudarte a encontrar la propiedad perfecta.
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-brand-50 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-[20px] font-bold text-brand-900">Mensaje enviado</h2>
                <p className="mt-2 text-[14px] text-brand-500">
                  Te contactaremos en menos de 1 hora.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold tracking-wider text-brand-500 uppercase">
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-brand-200 px-4 py-3 text-[14px] text-brand-900 outline-none focus:border-brand-400"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold tracking-wider text-brand-500 uppercase">
                      Teléfono
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-lg border border-brand-200 px-4 py-3 text-[14px] text-brand-900 outline-none focus:border-brand-400"
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-wider text-brand-500 uppercase">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-brand-200 px-4 py-3 text-[14px] text-brand-900 outline-none focus:border-brand-400"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-wider text-brand-500 uppercase">
                    Interesado en
                  </label>
                  <select name="interest" className="w-full rounded-lg border border-brand-200 bg-white px-4 py-3 text-[14px] text-brand-900 outline-none focus:border-brand-400">
                    <option>Comprar un inmueble</option>
                    <option>Renta mensual</option>
                    <option>Renta corta / vacacional</option>
                    <option>Vender mi propiedad</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-wider text-brand-500 uppercase">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-brand-200 px-4 py-3 text-[14px] text-brand-900 outline-none focus:border-brand-400"
                    placeholder="Cuéntanos qué estás buscando..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-900 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-800 sm:w-auto sm:px-8"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {infoCards.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-brand-100 bg-brand-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-brand-900">{item.title}</h3>
                  <p className="mt-0.5 whitespace-pre-line text-[13px] text-brand-500">{item.text}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="rounded-xl border border-brand-100 bg-brand-50 p-5">
              <h3 className="mb-3 text-[14px] font-semibold text-brand-900">Síguenos</h3>
              <div className="flex gap-3">
                {contact.facebook && (
                  <a
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm transition-colors hover:bg-[#1877F2] hover:text-white"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                )}
                {contact.instagram && (
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm transition-colors hover:bg-[#E4405F] hover:text-white"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                )}
                <a
                  href="https://airbnb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Airbnb"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm transition-colors hover:bg-[#FF5A5F] hover:text-white"
                >
                  <AirbnbIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
