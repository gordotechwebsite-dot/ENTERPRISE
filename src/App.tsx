import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { useSite } from './context/useSite';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import PropertiesAdminPage from './pages/admin/PropertiesAdminPage';
import ContentPage from './pages/admin/ContentPage';
import ContactAdminPage from './pages/admin/ContactAdminPage';
import MessagesPage from './pages/admin/MessagesPage';
import WhatsAppBubble from './components/WhatsAppBubble';
import type { ReactNode } from 'react';

function RequireAuth({ children }: { children: ReactNode }) {
  const { isAdmin } = useSite();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/propiedades" element={<PropertiesPage />} />
            <Route path="/propiedad/:id" element={<PropertyDetailPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="propiedades" element={<PropertiesAdminPage />} />
            <Route path="contenido" element={<ContentPage />} />
            <Route path="contacto" element={<ContactAdminPage />} />
            <Route path="mensajes" element={<MessagesPage />} />
          </Route>
        </Routes>
        <WhatsAppBubble />
      </BrowserRouter>
    </SiteProvider>
  );
}
