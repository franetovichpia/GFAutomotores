'use client';
import { useCompare } from '@/context/CompareContext';
import { formatKm, formatPrecio, nombreVehiculo } from '@/lib/format';
import { waVehiculo } from '@/lib/whatsapp';
import { CarPlaceholder, CompareIcon, WhatsAppIcon } from '../shared/Icons';

export default function VehicleCard({ vehicle: v, onOpen }) {
  const { ids, toggle } = useCompare();
  const comparing = ids.includes(v.id);
  const vendido = v.estado === 'vendido';

  return (
    <article className="card group flex flex-col overflow-hidden transition hover:border-brand/60">
      <button
        type="button"
        onClick={() => onOpen?.(v)}
        className="relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden bg-panel-2"
        aria-label={`Ver detalle de ${nombreVehiculo(v)}`}
      >
        {v.fotos?.[0] ? (
          <img
            src={v.fotos[0]}
            alt={nombreVehiculo(v)}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <CarPlaceholder />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[11px] tracking-wide uppercase">
          {v.tipo}
        </span>
        {v.estado !== 'disponible' && (
          <span className="absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
            {v.estado}
          </span>
        )}
        {v.fotos?.length > 1 && (
          <span className="absolute right-3 bottom-3 rounded bg-black/70 px-2 py-0.5 text-[11px]">
            {v.fotos.length} fotos
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg leading-tight font-semibold">{nombreVehiculo(v)}</h3>
        {v.version && <p className="text-sm text-muted">{v.version}</p>}

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/75">
          {v.anio && <li>{v.anio}</li>}
          <li>{formatKm(v.km)}</li>
          {v.combustible && <li>{v.combustible}</li>}
          {v.transmision && <li>{v.transmision}</li>}
        </ul>

        <p className="mt-3 text-xl font-semibold text-brand">
          {vendido ? 'Vendido' : formatPrecio(v.precio, v.moneda)}
        </p>

        <div className="mt-auto flex gap-2 pt-4">
          {!vendido && (
            <a href={waVehiculo(v)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-wa flex-1">
              <WhatsAppIcon size={16} /> Consultar
            </a>
          )}
          <button
            type="button"
            onClick={() => toggle(v.id)}
            aria-pressed={comparing}
            className={`btn btn-sm flex-1 border ${
              comparing ? 'border-brand bg-brand text-white' : 'border-line text-white/80 hover:border-brand'
            }`}
          >
            <CompareIcon /> {comparing ? 'Comparando' : 'Comparar'}
          </button>
        </div>
      </div>
    </article>
  );
}
