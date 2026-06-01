import { useSite } from '../context/useSite';
import { WhatsAppIcon } from './SocialIcons';

export default function WhatsAppBubble() {
  const { contact } = useSite();

  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hola, estoy interesado en sus propiedades.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed right-5 bottom-14 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
