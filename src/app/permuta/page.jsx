'use client';
import PublicShell from '@/components/layout/PublicShell';
import SectionTitle from '@/components/shared/SectionTitle';
import TradeInForm from '@/components/tradein/TradeInForm';
import { useVehicles } from '@/hooks/useVehicles';

export default function PermutaPage() {
  const { vehicles } = useVehicles();

  return (
    <PublicShell>
      <section className="container-x max-w-3xl py-12">
        <SectionTitle eyebrow="Permuta o parte de pago" title="Cotizá" accent="tu vehículo">
          Cargá los datos y las fotos de tu vehículo. Lo tasamos y te contactamos con una propuesta.
        </SectionTitle>
        <TradeInForm vehiculosEnStock={vehicles.filter((v) => v.estado === 'disponible')} />
      </section>
    </PublicShell>
  );
}
