'use client';
import { useState } from 'react';
import { diasEntre, formatKm, formatPrecio, nombreVehiculo } from '@/lib/format';
import { TrashIcon } from '../shared/Icons';

const colorEstado = {
  disponible: 'bg-emerald-500/15 text-emerald-300',
  reservado: 'bg-amber-500/15 text-amber-300',
  vendido: 'bg-brand/20 text-red-300',
};

// Listado del admin con selección múltiple para eliminar varios a la vez
export default function VehicleTable({ vehicles, onEdit, onDelete, onSold }) {
  const [selected, setSelected] = useState([]);
  const all = vehicles.length > 0 && selected.length === vehicles.length;
  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const eliminar = async () => {
    if (!confirm(`¿Eliminar ${selected.length} vehículo(s) y sus fotos? No se puede deshacer.`)) return;
    await onDelete(selected);
    setSelected([]);
  };

  if (!vehicles.length) {
    return <p className="card p-10 text-center text-sm text-muted">Todavía no hay vehículos cargados.</p>;
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line p-3 text-xs">
        <label className="flex cursor-pointer items-center gap-2 text-muted">
          <input
            type="checkbox"
            className="size-4 accent-brand"
            checked={all}
            onChange={() => setSelected(all ? [] : vehicles.map((v) => v.id))}
          />
          Seleccionar todos
        </label>
        <button
          disabled={!selected.length}
          onClick={eliminar}
          className="btn btn-sm border border-brand text-brand hover:bg-brand hover:text-white"
        >
          <TrashIcon /> Eliminar ({selected.length})
        </button>
      </div>

      <ul className="divide-y divide-line">
        {vehicles.map((v) => (
          <li key={v.id} className="flex flex-wrap items-center gap-3 p-3">
            <input
              type="checkbox"
              aria-label={`Seleccionar ${nombreVehiculo(v)}`}
              className="size-4 accent-brand"
              checked={selected.includes(v.id)}
              onChange={() => toggle(v.id)}
            />
            <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-panel-2">
              {v.fotos?.[0] && <img src={v.fotos[0]} alt="" className="size-full object-cover" />}
            </div>
            <div className="min-w-40 flex-1">
              <p className="font-medium">
                {nombreVehiculo(v)} <span className="text-muted">{v.anio}</span>
              </p>
              <p className="text-xs text-muted">
                {formatKm(v.km)} · {formatPrecio(v.precio, v.moneda)} · {v.fotos?.length || 0} fotos ·{' '}
                {v.estado === 'vendido'
                  ? `vendido en ${diasEntre(v.created_at, v.sold_at)} días`
                  : `${diasEntre(v.created_at)} días en stock`}
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] capitalize ${colorEstado[v.estado]}`}>
              {v.estado}
            </span>
            <div className="flex gap-2">
              {v.estado !== 'vendido' && (
                <button onClick={() => onSold(v)} className="btn btn-sm border border-line hover:border-brand">
                  Marcar vendido
                </button>
              )}
              <button onClick={() => onEdit(v)} className="btn btn-sm border border-line hover:border-brand">
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
