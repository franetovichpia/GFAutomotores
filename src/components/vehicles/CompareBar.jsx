'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAX_COMPARE, useCompare } from '@/context/CompareContext';

// Barra fija que aparece cuando hay vehículos elegidos para comparar
export default function CompareBar() {
  const { ids, clear } = useCompare();
  const pathname = usePathname();
  if (!ids.length || pathname === '/comparar') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-brand/50 bg-panel/95 backdrop-blur">
      <div className="container-x flex items-center justify-between gap-3 py-3 pr-20">
        <p className="text-sm">
          <span className="font-semibold text-brand">{ids.length}</span> de {MAX_COMPARE} para comparar
        </p>
        <div className="flex gap-2">
          <button onClick={clear} className="btn btn-sm border border-line text-white/70">
            Limpiar
          </button>
          <Link
            href="/comparar"
            className={`btn btn-sm btn-primary ${ids.length < MAX_COMPARE ? 'pointer-events-none opacity-50' : ''}`}
            aria-disabled={ids.length < MAX_COMPARE}
          >
            Comparar
          </Link>
        </div>
      </div>
    </div>
  );
}
