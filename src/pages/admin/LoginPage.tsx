import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import { useSite } from '../../context/useSite';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useSite();
  const nav = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(password)) {
      nav('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Enterprise Inmobiliaria" className="mx-auto mb-4 h-14 w-auto object-contain" />
          <h1 className="text-[22px] font-bold text-brand-900">Panel de Administración</h1>
          <p className="mt-1 text-[13px] text-brand-500">Ingresa tu contraseña para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-brand-200 bg-white p-6 shadow-sm">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-[13px] text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Contraseña incorrecta
            </div>
          )}
          <label className="mb-1.5 block text-[12px] font-semibold tracking-wide text-brand-600 uppercase">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="w-full rounded-lg border border-brand-200 py-2.5 pr-4 pl-10 text-[14px] text-brand-900 outline-none transition-colors focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
              placeholder="••••••••"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-brand-900 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-brand-400">
          <a href="/" className="hover:text-brand-600">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}
