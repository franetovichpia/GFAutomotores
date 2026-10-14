'use client';
import { tipos } from '@/config/site';

export const ORDENES = [
  { value: 'recientes', label: 'Últimos ingresos' },
  { value: 'nuevos', label: 'Más nuevos (año)' },
  { value: 'antiguos', label: 'Más antiguos (año)' },
  { value: 'menos-km', label: 'Menos kilómetros' },
  { value: 'menor-precio', label: 'Menor precio' },
];

const comparadores = {
  recientes: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  nuevos: (a, b) => (b.anio || 0) - (a.anio || 0),
  antiguos: (a, b) => (a.anio || 9999) - (b.anio || 9999),
  'menos-km': (a, b) => (a.km ?? Infinity) - (b.km ?? Infinity),
  'menor-precio': (a, b) => (a.precio ?? Infinity) - (b.precio ?? Infinity),
};

export function aplicarFiltros(vehicles, { tipo, marca, orden }) {
  return vehicles
    .filter((v) => (!tipo || v.tipo === tipo) && (!marca || v.marca === marca))
    .sort(comparadores[orden] || comparadores.recientes);
}

export const marcasDe = (vehicles) => [...new Set(vehicles.map((v) => v.marca))].sort();

export default function VehicleFilters({ filtros, onChange, marcas, total }) {
  const set = (campo, valor) => onChange({ ...filtros, [campo]: valor });

  return (
    <div className="card mb-8 p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {[{ value: '', label: 'Todos' }, ...tipos].map((t) => (
          <button
            key={t.value}
            onClick={() => set('tipo', t.value)}
            aria-pressed={filtros.tipo === t.value}
            className={`btn btn-sm border ${
              filtros.tipo === t.value
                ? 'border-brand bg-brand text-white'
                : 'border-line text-white/80 hover:border-brand'
            }`}
          >
            {t.label === 'Todos' ? t.label : `${t.label}s`}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3 sm:items-end">
        <div>
          <label className="label" htmlFor="f-marca">Marca</label>
          <select id="f-marca" className="field" value={filtros.marca} onChange={(e) => set('marca', e.target.value)}>
            <option value="">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="f-orden">Ordenar por</label>
          <select id="f-orden" className="field" value={filtros.orden} onChange={(e) => set('orden', e.target.value)}>
            {ORDENES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-muted sm:pb-2.5 sm:text-right">
          {total} {total === 1 ? 'vehículo' : 'vehículos'}
        </p>
      </div>
    </div>
  );
}
