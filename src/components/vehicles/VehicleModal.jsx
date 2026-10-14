'use client';
import { useEffect, useState } from 'react';
import { formatKm, formatPrecio, nombreVehiculo } from '@/lib/format';
import { waVehiculo } from '@/lib/whatsapp';
import { CarPlaceholder, CloseIcon, WhatsAppIcon } from '../shared/Icons';

// Detalle del vehículo con galería de fotos
export default function VehicleModal({ vehicle: v, onClose }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const fotos = v.fotos || [];
  const datos = [
    ['Año', v.anio],
    ['Kilómetros', formatKm(v.km)],
    ['Combustible', v.combustible],
    ['Transmisión', v.transmision],
    ['Tipo', v.tipo],
  ].filter(([, valor]) => valor);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={nombreVehiculo(v)}
    >
      <div
        className="card relative max-h-[92vh] w-full max-w-3xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-black/70 p-2"
        >
          <CloseIcon />
        </button>

        <div className="flex aspect-video items-center justify-center bg-panel-2">
          {fotos.length ? (
            <img src={fotos[index]} alt={nombreVehiculo(v)} className="size-full object-contain" />
          ) : (
            <CarPlaceholder />
          )}
        </div>
        {fotos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-3">
            {fotos.map((f, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`size-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${
                  i === index ? 'border-brand' : 'border-transparent opacity-60'
                }`}
              >
                <img src={f} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-5">
          <h2 className="text-2xl font-semibold">{nombreVehiculo(v)}</h2>
          {v.version && <p className="text-muted">{v.version}</p>}
          <p className="mt-2 text-2xl font-semibold text-brand">
            {v.estado === 'vendido' ? 'Vendido' : formatPrecio(v.precio, v.moneda)}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {datos.map(([k, valor]) => (
              <div key={k} className="rounded-lg bg-panel-2 p-3">
                <dt className="text-[11px] tracking-wide text-muted uppercase">{k}</dt>
                <dd className="text-sm capitalize">{valor}</dd>
              </div>
            ))}
          </dl>

          {v.descripcion && (
            <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-white/80">
              {v.descripcion}
            </p>
          )}

          {v.estado !== 'vendido' && (
            <a href={waVehiculo(v)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-5 w-full">
              <WhatsAppIcon /> Consultar por WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
