'use client';
import { useState } from 'react';
import VehicleCard from './VehicleCard';
import VehicleModal from './VehicleModal';

export default function VehicleGrid({ vehicles, empty = 'No hay vehículos para mostrar.' }) {
  const [open, setOpen] = useState(null);

  if (!vehicles.length) {
    return <p className="card p-10 text-center text-sm text-muted">{empty}</p>;
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} onOpen={setOpen} />
        ))}
      </div>
      {open && <VehicleModal vehicle={open} onClose={() => setOpen(null)} />}
    </>
  );
}
