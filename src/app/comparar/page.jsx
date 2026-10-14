'use client';
import Link from 'next/link';
import PublicShell from '@/components/layout/PublicShell';
import SectionTitle from '@/components/shared/SectionTitle';
import CompareTable from '@/components/vehicles/CompareTable';
import { MAX_COMPARE, useCompare } from '@/context/CompareContext';
import { useVehicles } from '@/hooks/useVehicles';

export default function CompararPage() {
  const { ids, toggle } = useCompare();
  const { vehicles, loading } = useVehicles();
  const elegidos = ids.map((id) => vehicles.find((v) => v.id === id)).filter(Boolean);

  return (
    <PublicShell>
      <section className="container-x py-12">
        <SectionTitle eyebrow="Lado a lado" title="Comparar" accent="vehículos" />
        {loading ? (
          <p className="py-16 text-center text-sm text-muted">Cargando…</p>
        ) : elegidos.length === MAX_COMPARE ? (
          <CompareTable vehicles={elegidos} onRemove={toggle} />
        ) : (
          <div className="card p-10 text-center">
            <p className="text-sm text-muted">
              Elegí {MAX_COMPARE} vehículos con el botón «Comparar» de cada tarjeta.
              {elegidos.length === 1 && ' Ya tenés 1 elegido, te falta otro.'}
            </p>
            <Link href="/vehiculos" className="btn btn-primary mt-5">
              Ir a los vehículos
            </Link>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
