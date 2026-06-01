import { useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Property } from '../types';
import { properties as defaultProperties } from '../data/properties';
import { SiteContext } from './siteTypes';
import type { SiteContent, ContactInfo, ContactMessage, SiteCtx } from './siteTypes';

/* ─── Defaults ─── */
const defaultContent: SiteContent = {
  hero: { title: 'Encuentra', highlight: 'tu hogar', subtitle: 'Apartamentos en venta, rentas mensuales y estancias cortas en Duitama, Tunja, Sogamoso y Paipa.' },
  categories: [
    { title: 'Comprar', description: 'Apartamentos de lujo, familiares y de inversión en las mejores zonas.' },
    { title: 'Renta Mensual', description: 'Arriendos con las mejores condiciones. Amoblados y sin amoblar.' },
    { title: 'Estancias Cortas', description: 'Vacaciones, negocios o nómadas digitales. Experiencias de lujo.' },
  ],
  whyUs: {
    title: 'Más que una inmobiliaria, tu aliado de confianza',
    subtitle: 'Por qué Enterprise',
    description: 'Conocemos Boyacá como nadie. Te acompañamos en cada paso para encontrar la propiedad perfecta en Duitama, Tunja, Sogamoso y Paipa.',
  },
};

const defaultContact: ContactInfo = {
  phone: '+57 300 123 4567',
  email: 'info@enterprise.com.co',
  address: 'Carrera 16 #18-45, Oficina 301',
  city: 'Duitama, Boyacá',
  hours: 'Lun - Vie: 8am - 6pm\nSáb: 9am - 2pm',
  whatsapp: '573001234567',
  instagram: 'https://instagram.com/enterprise.inmobiliaria',
  facebook: 'https://facebook.com/enterprise.inmobiliaria',
};

const ADMIN_PASSWORD = 'enterprise2024';

/* ─── Helpers ─── */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ─── Provider ─── */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => load('ent_properties', defaultProperties));
  const [content, setContent] = useState<SiteContent>(() => load('ent_content', defaultContent));
  const [contact, setContact] = useState<ContactInfo>(() => load('ent_contact', defaultContact));
  const [messages, setMessages] = useState<ContactMessage[]>(() => load('ent_messages', []));
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('ent_admin') === '1');

  useEffect(() => save('ent_properties', properties), [properties]);
  useEffect(() => save('ent_content', content), [content]);
  useEffect(() => save('ent_contact', contact), [contact]);
  useEffect(() => save('ent_messages', messages), [messages]);

  const login = useCallback((pw: string) => {
    if (pw === ADMIN_PASSWORD) { setIsAdmin(true); sessionStorage.setItem('ent_admin', '1'); return true; }
    return false;
  }, []);
  const logout = useCallback(() => { setIsAdmin(false); sessionStorage.removeItem('ent_admin'); }, []);

  const addProperty = useCallback((p: Property) => setProperties((prev) => [p, ...prev]), []);
  const updateProperty = useCallback((id: string, patch: Partial<Property>) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))), []);
  const deleteProperty = useCallback((id: string) => setProperties((prev) => prev.filter((p) => p.id !== id)), []);

  const updateContent = useCallback((c: Partial<SiteContent>) => setContent((prev) => ({ ...prev, ...c })), []);
  const updateContact = useCallback((c: Partial<ContactInfo>) => setContact((prev) => ({ ...prev, ...c })), []);

  const addMessage = useCallback((m: Omit<ContactMessage, 'id' | 'date' | 'read'>) =>
    setMessages((prev) => [{ ...m, id: crypto.randomUUID(), date: new Date().toISOString(), read: false }, ...prev]), []);
  const markMessageRead = useCallback((id: string) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m))), []);
  const deleteMessage = useCallback((id: string) => setMessages((prev) => prev.filter((m) => m.id !== id)), []);

  const value: SiteCtx = {
    properties, content, contact, messages, isAdmin,
    login, logout, addProperty, updateProperty, deleteProperty,
    updateContent, updateContact, addMessage, markMessageRead, deleteMessage,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
