'use client';
import { useCallback, useEffect, useState } from 'react';
import { TrashIcon, WhatsAppIcon } from '@/components/shared/Icons';
import { db } from '@/lib/db';
import { formatFecha, formatKm } from '@/lib/format';

// Vehículos que los clientes cargaron para permuta o parte de pago
export default function AdminTradeInsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const reload = useCallback(async () => {
    setItems(await db.listTradeIns());
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const all = items.length > 0 && selected.length === items.length;

  const eliminar = async () => {
    if (!confirm(`¿Eliminar ${selected.length} solicitud(es)?`)) return;
    await db.deleteTradeIns(selected);
    setSelected([]);
    reload();
  };

  if (loading) return <p className="text-sm text-muted">Cargando…</p>;
  if (!items.length) {
    return <p className="card p-10 text-center text-sm text-muted">Todavía no llegaron solicitudes de permuta.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <label className="flex cursor-pointer items-center gap-2 text-muted">
          <input type="checkbox" className="size-4 accent-brand" checked={all} onChange={() => setSelected(all ? [] : items.map((t) => t.id))} />
          Seleccionar todas
        </label>
        <button disabled={!selected.length} onClick={eliminar} className="btn btn-sm border border-brand text-brand hover:bg-brand hover:text-white">
          <TrashIcon /> Eliminar ({selected.length})
        </button>
      </div>

      {items.map((t) => (
        <article key={t.id} className="card p-4">
          <div className="flex flex-wrap items-start gap-3">
            <input
              type="checkbox"
              aria-label={`Seleccionar solicitud de ${t.nombre}`}
              className="mt-1 size-4 accent-brand"
              checked={selected.includes(t.id)}
              onChange={() => toggle(t.id)}
            />
            <div className="min-w-48 flex-1">
              <p className="font-semibold">
                {t.marca} {t.modelo} <span className="font-normal text-muted">{t.anio}</span>
              </p>
              <p className="text-xs text-muted">
                {t.tipo} · {formatKm(t.km)} · recibido el {formatFecha(t.created_at)}
              </p>
              <p className="mt-2 text-sm">
                {t.nombre} · {t.telefono}
              </p>
              {t.interes && <p className="text-sm text-muted">Le interesa: {t.interes}</p>}
              {t.descripcion && <p className="mt-2 text-sm whitespace-pre-line text-white/80">{t.descripcion}</p>}
            </div>
            <a
              href={`https://wa.me/${String(t.telefono).replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-wa"
            >
              <WhatsAppIcon size={16} /> Contactar
            </a>
          </div>
          {t.fotos?.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {t.fotos.map((f, i) => (
                <a key={i} href={f} target="_blank" rel="noopener noreferrer" className="size-24 shrink-0 overflow-hidden rounded-lg">
                  <img src={f} alt={`Foto ${i + 1}`} className="size-full object-cover" />
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
