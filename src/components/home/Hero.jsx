'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { site, tipos } from '@/config/site';
import { ORDENES } from '../vehicles/VehicleFilters';

export default function Hero({ marcas }) {
  const router = useRouter();
  const [filtros, setFiltros] = useState({ tipo: '', marca: '', orden: 'recientes' });
  const set = (k) => (e) => setFiltros({ ...filtros, [k]: e.target.value });

  const buscar = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v));
    router.push(`/vehiculos?${params}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Fondo: degradé + líneas de luz. Para usar una foto, reemplazá este div por un <img> con object-cover */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#3a0a10_0%,transparent_55%),radial-gradient(ellipse_at_90%_80%,#2a070b_0%,transparent_50%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="container-x relative grid items-center gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-brand uppercase">
            {site.aniosTrayectoria} años de trayectoria
          </p>
          <h1 className="text-4xl leading-[1.05] font-light sm:text-6xl">
            Tu próximo <span className="font-semibold text-brand">vehículo</span>
            <br />
            te está esperando
          </h1>
          <p className="mt-5 max-w-md text-base text-white/75">
            Compra, venta y consignaciones. Gestoría incluida y financiación para que te lo lleves
            sin vueltas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/vehiculos" className="btn btn-primary">
              Ver vehículos
            </Link>
            <Link href="/permuta" className="btn btn-outline">
              Cotizar mi permuta
            </Link>
          </div>
        </div>

        <form onSubmit={buscar} className="relative">
          <div className="absolute -top-3 -left-3 size-24 bg-brand" aria-hidden="true" />
          <div className="relative space-y-4 bg-white p-6 text-ink shadow-2xl">
            <h2 className="text-xl font-semibold">Buscá tu vehículo</h2>
            {[
              ['tipo', 'Tipo', [['', 'Todos'], ...tipos.map((t) => [t.value, t.label])]],
              ['marca', 'Marca', [['', 'Todas las marcas'], ...marcas.map((m) => [m, m])]],
              ['orden', 'Ordenar por', ORDENES.map((o) => [o.value, o.label])],
            ].map(([campo, label, opciones]) => (
              <div key={campo}>
                <label htmlFor={`h-${campo}`} className="mb-1 block text-xs text-neutral-500">
                  {label}
                </label>
                <select
                  id={`h-${campo}`}
                  value={filtros[campo]}
                  onChange={set(campo)}
                  className="w-full border-b border-neutral-300 bg-transparent py-2 text-sm focus:border-brand focus:outline-none"
                >
                  {opciones.map(([value, texto]) => (
                    <option key={value} value={value}>{texto}</option>
                  ))}
                </select>
              </div>
            ))}
            <button className="btn btn-primary w-full">Buscar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
