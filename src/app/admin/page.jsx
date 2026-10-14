'use client';
import { useEffect, useMemo, useState } from 'react';
import { ColumnChart, RowChart } from '@/components/admin/BarChart';
import MetricCard from '@/components/admin/MetricCard';
import { useVehicles } from '@/hooks/useVehicles';
import { db } from '@/lib/db';
import { formatFecha, formatPrecio, nombreVehiculo } from '@/lib/format';
import { calcularMetricas } from '@/lib/metrics';

const montos = ({ USD, ARS }) =>
  [USD > 0 && formatPrecio(USD, 'USD'), ARS > 0 && formatPrecio(ARS, 'ARS')].filter(Boolean).join(' + ') || '—';

export default function AdminMetricsPage() {
  const { vehicles, loading } = useVehicles();
  const [tradeins, setTradeins] = useState([]);

  useEffect(() => {
    db.listTradeIns().then(setTradeins).catch(() => {});
  }, []);

  const m = useMemo(() => calcularMetricas(vehicles, tradeins), [vehicles, tradeins]);
  if (loading) return <p className="text-sm text-muted">Cargando métricas…</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="En stock" value={m.enStock} hint={`${m.reservados} reservados`} />
        <MetricCard label="Vendidos" value={m.vendidos} hint={`${m.vendidosEsteMes} este mes`} />
        <MetricCard
          label="Tiempo promedio de venta"
          value={m.promedioDiasVenta == null ? '—' : `${m.promedioDiasVenta} días`}
          hint="Desde el ingreso hasta la venta"
        />
        <MetricCard label="Permutas recibidas" value={m.permutas} hint="Solicitudes desde la web" />
        <MetricCard label="Valor del stock" value={montos(m.valorStock)} hint="Suma de precios publicados" />
        <MetricCard label="Total vendido" value={montos(m.facturado)} hint="Suma de precios de venta" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ColumnChart title="Ventas por mes (últimos 6)" data={m.ventasPorMes} />
        <RowChart title="Stock por tipo" data={m.stockPorTipo} />
        <RowChart title="Marcas más vendidas" data={m.marcasMasVendidas} empty="Todavía no hay ventas." />
      </div>

      <div className="card overflow-x-auto p-5">
        <h3 className="mb-4 text-sm font-semibold">Más tiempo en stock</h3>
        {!m.masAntiguos.length ? (
          <p className="text-sm text-muted">No hay vehículos en stock.</p>
        ) : (
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="pb-2 font-medium">Vehículo</th>
                <th className="pb-2 font-medium">Ingreso</th>
                <th className="pb-2 font-medium">Precio</th>
                <th className="pb-2 text-right font-medium">Días en stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {m.masAntiguos.map((v) => (
                <tr key={v.id}>
                  <td className="py-2.5">{nombreVehiculo(v)} <span className="text-muted">{v.anio}</span></td>
                  <td className="py-2.5 text-muted">{formatFecha(v.created_at)}</td>
                  <td className="py-2.5">{formatPrecio(v.precio, v.moneda)}</td>
                  <td className={`py-2.5 text-right font-semibold ${v.dias > 90 ? 'text-brand' : ''}`}>{v.dias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
