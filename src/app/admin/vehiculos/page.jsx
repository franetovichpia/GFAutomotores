'use client';
import { useState } from 'react';
import VehicleForm from '@/components/admin/VehicleForm';
import VehicleTable from '@/components/admin/VehicleTable';
import { estados } from '@/config/site';
import { useVehicles } from '@/hooks/useVehicles';
import { db } from '@/lib/db';
import { urlToItem } from '@/lib/images';

export default function AdminVehiclesPage() {
  const { vehicles, loading, error, reload } = useVehicles();
  const [editing, setEditing] = useState(null); // null | 'new' | vehicle
  const [filtro, setFiltro] = useState('');

  const lista = filtro ? vehicles.filter((v) => v.estado === filtro) : vehicles;

  const marcarVendido = async (v) => {
    const precio = prompt('Precio de venta final (dejá vacío para usar el publicado):', v.precio ?? '');
    if (precio === null) return;
    await db.saveVehicle(
      {
        ...v,
        estado: 'vendido',
        sold_at: new Date().toISOString(),
        precio_venta: precio.trim() === '' ? v.precio : Number(precio),
      },
      (v.fotos || []).map(urlToItem)
    );
    reload();
  };

  if (editing) {
    return (
      <VehicleForm
        vehicle={editing === 'new' ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          reload();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <select className="field w-auto" value={filtro} onChange={(e) => setFiltro(e.target.value)} aria-label="Filtrar por estado">
          <option value="">Todos los estados</option>
          {estados.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => setEditing('new')}>
          + Cargar vehículo
        </button>
      </div>

      {error && <p className="card border-brand p-4 text-sm">Error: {error}</p>}
      {loading ? (
        <p className="text-sm text-muted">Cargando…</p>
      ) : (
        <VehicleTable
          vehicles={lista}
          onEdit={setEditing}
          onSold={marcarVendido}
          onDelete={async (ids) => {
            await db.deleteVehicles(ids);
            reload();
          }}
        />
      )}
    </div>
  );
}
