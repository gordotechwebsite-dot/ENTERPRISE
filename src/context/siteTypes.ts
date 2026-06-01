import { createContext } from 'react';
import type { Property } from '../types';

export interface SiteContent {
  hero: { title: string; highlight: string; subtitle: string };
  categories: { title: string; description: string }[];
  whyUs: { title: string; subtitle: string; description: string };
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  hours: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  date: string;
  read: boolean;
}

interface SiteState {
  properties: Property[];
  content: SiteContent;
  contact: ContactInfo;
  messages: ContactMessage[];
  isAdmin: boolean;
}

interface SiteActions {
  login: (password: string) => boolean;
  logout: () => void;
  addProperty: (p: Property) => void;
  updateProperty: (id: string, p: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  updateContent: (c: Partial<SiteContent>) => void;
  updateContact: (c: Partial<ContactInfo>) => void;
  addMessage: (m: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

export type SiteCtx = SiteState & SiteActions;

export const SiteContext = createContext<SiteCtx | null>(null);
