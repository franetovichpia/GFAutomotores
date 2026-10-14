'use client';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PublicShell from '@/components/layout/PublicShell';
import SectionTitle from '@/components/shared/SectionTitle';
import VehicleGrid from '@/components/vehicles/VehicleGrid';
import VehicleFilters, { aplicarFiltros, marcasDe } from '@/components/vehicles/VehicleFilters';
import { useVehicles } from '@/hooks/useVehicles';

function Stock() {
  const params = useSearchParams();
  const { vehicles, loading, error } = useVehicles();
  const [filtros, setFiltros] = useState({
    tipo: params.get('tipo') || '',
    marca: params.get('marca') || '',
    orden: params.get('orden') || 'recientes',
  });

  const enStock = useMemo(() => vehicles.filter((v) => v.estado !== 'vendido'), [vehicles]);
  const lista = useMemo(() => aplicarFiltros([...enStock], filtros), [enStock, filtros]);

  return (
    <section className="container-x py-12">
      <SectionTitle eyebrow="Stock" title="Vehículos" accent="disponibles" />
      <VehicleFilters filtros={filtros} onChange={setFiltros} marcas={marcasDe(enStock)} total={lista.length} />
      {error && <p className="card mb-4 border-brand p-4 text-sm">No se pudo cargar el stock: {error}</p>}
      {loading ? (
        <p className="py-16 text-center text-sm text-muted">Cargando vehículos…</p>
      ) : (
        <VehicleGrid vehicles={lista} empty="No encontramos vehículos con esos filtros." />
      )}
    </section>
  );
}

export default function VehiculosPage() {
  return (
    <PublicShell>
      <Suspense>
        <Stock />
      </Suspense>
    </PublicShell>
  );
}
