'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import { db, isSupabase } from '@/lib/db';
import LoginForm from './LoginForm';

const tabs = [
  { href: '/admin', label: 'Métricas' },
  { href: '/admin/vehiculos', label: 'Vehículos' },
  { href: '/admin/permutas', label: 'Permutas' },
];

// Protege todo /admin: si no hay sesión muestra el login
export default function AdminShell({ children }) {
  const pathname = usePathname();
  const [logged, setLogged] = useState(null); // null = verificando

  useEffect(() => {
    db.isLoggedIn().then(setLogged).catch(() => setLogged(false));
  }, []);

  if (logged === null) return <p className="p-10 text-center text-sm text-muted">Cargando…</p>;
  if (!logged) return <LoginForm onLogin={() => setLogged(true)} />;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-panel">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="font-semibold">
            <span className="text-brand">Panel</span> {site.nombre}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-white/70 hover:text-brand">Ver sitio</Link>
            <button
              className="cursor-pointer text-white/70 hover:text-brand"
              onClick={async () => {
                await db.signOut();
                setLogged(false);
              }}
            >
              Salir
            </button>
          </div>
        </div>
        <nav className="container-x flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`border-b-2 px-4 py-3 text-sm whitespace-nowrap ${
                pathname === t.href ? 'border-brand text-white' : 'border-transparent text-muted hover:text-white'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>

      {!isSupabase && (
        <p className="bg-amber-500/15 px-4 py-2 text-center text-xs text-amber-200">
          Modo demo: los datos se guardan solo en este navegador. Configurá Supabase (ver README) para
          usar la base de datos real.
        </p>
      )}

      <main className="container-x py-8">{children}</main>
    </div>
  );
}
