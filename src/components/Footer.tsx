import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSite } from '../context/useSite';
import { FacebookIcon, InstagramIcon, AirbnbIcon } from './SocialIcons';

export default function Footer() {
  const { contact } = useSite();

  return (
    <footer className="bg-brand-950 text-brand-400">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Enterprise Inmobiliaria"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-brand-500">
              Expertos en inmuebles en Boyacá. Duitama, Tunja, Sogamoso y Paipa.
            </p>
            <div className="mt-5 flex gap-3">
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-80"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-opacity hover:opacity-80"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
              <a
                href="https://airbnb.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Airbnb"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5A5F] text-white transition-opacity hover:opacity-80"
              >
                <AirbnbIcon className="h-5 w-5" />
              </a>
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
                {contact.address}, {contact.city}
              </div>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                {contact.email}
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
