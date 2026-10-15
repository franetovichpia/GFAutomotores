'use client';
import Link from 'next/link';
import PublicShell from '@/components/layout/PublicShell';
import SoldVehicles from '@/components/home/SoldVehicles';
import { useVehicles } from '@/hooks/useVehicles';

// Todos los vehículos vendidos, del más reciente al más antiguo
export default function VendidosPage() {
  const { vehicles, loading } = useVehicles();
  const vendidos = vehicles.filter((v) => v.estado === 'vendido');

  return (
    <PublicShell>
      {loading ? (
        <p className="py-24 text-center text-sm text-muted">Cargando…</p>
      ) : vendidos.length ? (
        <SoldVehicles vehicles={vendidos} />
      ) : (
        <p className="py-24 text-center text-sm text-muted">Todavía no hay vehículos vendidos para mostrar.</p>
      )}
      <div className="pb-16 text-center">
        <Link href="/vehiculos" className="btn btn-primary">
          Ver vehículos disponibles
        </Link>
      </div>
    </PublicShell>
  );
}