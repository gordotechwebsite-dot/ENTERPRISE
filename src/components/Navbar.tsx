import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone } from 'lucide-react';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/propiedades?type=venta', label: 'Comprar' },
  { to: '/propiedades?type=renta-mensual', label: 'Rentar' },
  { to: '/propiedades?type=renta-corta', label: 'Estancias' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isHome ? 'bg-transparent' : 'bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Enterprise Inmobiliaria"
            className={`h-10 w-auto object-contain ${isHome ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-[14px] font-medium tracking-wide transition-colors ${
                isHome ? 'text-white/80 hover:text-white' : 'text-brand-600 hover:text-brand-900'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/propiedades"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              isHome
                ? 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                : 'bg-brand-100 text-brand-800 hover:bg-brand-200'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            Buscar
          </Link>
          <a
            href="tel:+573001234567"
            className={`flex items-center gap-2 text-[13px] font-medium ${
              isHome ? 'text-white/70' : 'text-brand-500'
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            300 123 4567
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`lg:hidden ${isHome ? 'text-white' : 'text-brand-900'}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-brand-200/50 bg-white px-5 pb-6 pt-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-[15px] font-medium text-brand-700"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/propiedades"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-brand-900 px-5 py-3 text-center text-[14px] font-semibold text-white"
          >
            Buscar propiedades
          </Link>
        </div>
      )}
    </nav>
  );
}
