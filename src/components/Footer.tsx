import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-400">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[14px] font-black text-brand-900">
                E
              </div>
              <span className="text-[16px] font-bold tracking-tight text-white">
                Enterprise
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-brand-500">
              Expertos en inmuebles con más de 10 años en el mercado colombiano.
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-brand-400 transition-colors hover:bg-accent-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="mb-4 text-[12px] font-semibold tracking-widest text-brand-300 uppercase">
              Propiedades
            </h4>
            <div className="space-y-2.5 text-[13px]">
              <Link to="/propiedades?type=venta" className="block hover:text-white">Comprar</Link>
              <Link to="/propiedades?type=renta-mensual" className="block hover:text-white">Renta Mensual</Link>
              <Link to="/propiedades?type=renta-corta" className="block hover:text-white">Renta Corta</Link>
              <Link to="/propiedades" className="block hover:text-white">Todas</Link>
            </div>
          </div>

          {/* Cities */}
          <div>
            <h4 className="mb-4 text-[12px] font-semibold tracking-widest text-brand-300 uppercase">
              Ciudades
            </h4>
            <div className="space-y-2.5 text-[13px]">
              {['Bogotá', 'Medellín', 'Cartagena', 'Cali'].map((c) => (
                <Link key={c} to={`/propiedades?city=${c}`} className="block hover:text-white">
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[12px] font-semibold tracking-widest text-brand-300 uppercase">
              Contacto
            </h4>
            <div className="space-y-3 text-[13px]">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                Calle 93 #11-28, Of. 501, Bogotá
              </div>
              <a href="tel:+573001234567" className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                +57 300 123 4567
              </a>
              <a href="mailto:info@enterprise.com.co" className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                info@enterprise.com.co
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/8 pt-6 text-center text-[12px] text-brand-600">
          &copy; {new Date().getFullYear()} Enterprise Inmobiliaria. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
