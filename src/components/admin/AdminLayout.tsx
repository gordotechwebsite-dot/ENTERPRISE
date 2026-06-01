import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, FileText, Phone, MessageSquare, LogOut, ArrowLeft } from 'lucide-react';
import { useSite } from '../../context/useSite';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/propiedades', icon: Building2, label: 'Propiedades' },
  { to: '/admin/contenido', icon: FileText, label: 'Contenido' },
  { to: '/admin/contacto', icon: Phone, label: 'Contacto' },
  { to: '/admin/mensajes', icon: MessageSquare, label: 'Mensajes' },
];

export default function AdminLayout() {
  const { logout, messages } = useSite();
  const nav = useNavigate();
  const unread = messages.filter((m) => !m.read).length;

  function handleLogout() {
    logout();
    nav('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-brand-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-brand-200 bg-white max-lg:hidden">
        <div className="flex h-16 items-center gap-2.5 border-b border-brand-200 px-5">
          <img src="/logo-sm.png" alt="Enterprise" className="h-8 w-auto object-contain" />
          <span className="text-[13px] font-semibold text-brand-500">Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${isActive ? 'bg-brand-900 text-white' : 'text-brand-600 hover:bg-brand-100 hover:text-brand-900'}`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
              {label === 'Mensajes' && unread > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-brand-200 p-3">
          <a
            href="/"
            className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-brand-500 transition-colors hover:bg-brand-100 hover:text-brand-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-brand-200 bg-white px-4 lg:hidden">
        <img src="/logo-sm.png" alt="Enterprise Admin" className="h-7 w-auto object-contain" />
        <div className="flex gap-1">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex h-9 w-9 items-center justify-center rounded-lg text-brand-500 ${isActive ? 'bg-brand-900 text-white' : 'hover:bg-brand-100'}`
              }
              title={label}
            >
              <Icon className="h-4 w-4" />
              {label === 'Mensajes' && unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
          <button onClick={handleLogout} className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50" title="Salir">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 lg:pl-60">
        <div className="mx-auto max-w-5xl px-4 py-6 max-lg:pt-20 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
