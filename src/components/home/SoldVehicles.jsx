import Link from 'next/link';
import { nombreVehiculo } from '@/lib/format';
import { CarPlaceholder } from '../shared/Icons';
import SectionTitle from '../shared/SectionTitle';

const porFechaDeVenta = (a, b) => new Date(b.sold_at) - new Date(a.sold_at);

function SoldCard({ vehicle: v }) {
  return (
    <figure className="card overflow-hidden">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-panel-2">
        {v.fotos?.[0] ? (
          <img src={v.fotos[0]} alt={nombreVehiculo(v)} loading="lazy" className="size-full object-cover grayscale-[40%]" />
        ) : (
          <CarPlaceholder />
        )}
        <span className="absolute top-2 left-2 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
          Vendido
        </span>
      </div>
      <figcaption className="p-3 text-sm">
        {nombreVehiculo(v)} {v.anio && <span className="text-muted">· {v.anio}</span>}
      </figcaption>
    </figure>
  );
}

// limite: cuántos mostrar (en la portada 8). Sin límite muestra todos (página /vendidos).
export default function SoldVehicles({ vehicles, limite }) {
  if (!vehicles.length) return null;
  const ordenados = [...vehicles].sort(porFechaDeVenta);
  const lista = limite ? ordenados.slice(0, limite) : ordenados;
  const hayMas = ordenados.length > lista.length;

  return (
    <section className="container-x py-16">
      <SectionTitle eyebrow="Ya tienen dueño" title="Vehículos" accent="vendidos" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {lista.map((v) => (
          <SoldCard key={v.id} vehicle={v} />
        ))}
      </div>
      {hayMas && (
        <div className="mt-8 text-center">
          <Link href="/vendidos" className="btn btn-outline">
            Ver más vendidos ({ordenados.length})
          </Link>
        </div>
      )}
    </section>
  );
}