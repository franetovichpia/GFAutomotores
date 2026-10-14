import { formatKm, formatPrecio, nombreVehiculo } from '@/lib/format';
import { waVehiculo } from '@/lib/whatsapp';
import { CarPlaceholder, WhatsAppIcon } from '../shared/Icons';

const filas = [
  ['Precio', (v) => formatPrecio(v.precio, v.moneda), (v) => v.precio, 'min'],
  ['Año', (v) => v.anio || '—', (v) => v.anio, 'max'],
  ['Kilómetros', (v) => formatKm(v.km), (v) => v.km, 'min'],
  ['Tipo', (v) => v.tipo],
  ['Versión', (v) => v.version || '—'],
  ['Combustible', (v) => v.combustible || '—'],
  ['Transmisión', (v) => v.transmision || '—'],
  ['Descripción', (v) => v.descripcion || '—'],
];

// Resalta el mejor valor de cada fila numérica (menor precio, menos km, más nuevo)
function mejor(vehicles, valor, criterio) {
  if (!criterio) return null;
  const nums = vehicles.map(valor);
  if (nums.some((n) => n == null) || nums[0] === nums[1]) return null;
  const objetivo = criterio === 'min' ? Math.min(...nums) : Math.max(...nums);
  return nums.indexOf(objetivo);
}

export default function CompareTable({ vehicles, onRemove }) {
  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-line">
        {vehicles.map((v) => (
          <div key={v.id} className="p-3 sm:p-5">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-panel-2">
              {v.fotos?.[0] ? (
                <img src={v.fotos[0]} alt={nombreVehiculo(v)} className="size-full object-cover" />
              ) : (
                <CarPlaceholder />
              )}
            </div>
            <h2 className="mt-3 text-base font-semibold sm:text-xl">{nombreVehiculo(v)}</h2>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a href={waVehiculo(v)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-wa">
                <WhatsAppIcon size={16} /> Consultar
              </a>
              <button onClick={() => onRemove(v.id)} className="btn btn-sm border border-line text-white/70">
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filas.map(([label, texto, valor, criterio]) => {
        const ganador = mejor(vehicles, valor, criterio);
        return (
          <div key={label} className="border-t border-line">
            <p className="bg-panel-2 px-3 py-1.5 text-[11px] tracking-wide text-muted uppercase sm:px-5">
              {label}
            </p>
            <div className="grid grid-cols-2 divide-x divide-line">
              {vehicles.map((v, i) => (
                <p
                  key={v.id}
                  className={`px-3 py-3 text-sm first-letter:uppercase sm:px-5 ${
                    ganador === i ? 'font-semibold text-brand' : ''
                  }`}
                >
                  {texto(v)}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
