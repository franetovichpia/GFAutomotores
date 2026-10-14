import Link from 'next/link';
import SectionTitle from '../shared/SectionTitle';
import VehicleGrid from '../vehicles/VehicleGrid';

export default function StockPreview({ vehicles }) {
  // Primero los destacados, después los últimos ingresos
  const lista = [...vehicles].sort((a, b) => Number(b.destacado) - Number(a.destacado)).slice(0, 6);

  return (
    <section className="container-x py-16">
      <SectionTitle eyebrow="Disponibles hoy" title="Vehículos" accent="en stock" />
      <VehicleGrid vehicles={lista} empty="Pronto vamos a publicar nuevos ingresos." />
      {vehicles.length > lista.length && (
        <div className="mt-8 text-center">
          <Link href="/vehiculos" className="btn btn-outline">
            Ver los {vehicles.length} vehículos
          </Link>
        </div>
      )}
    </section>
  );
}
