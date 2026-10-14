import { diasEntre } from './format';

const contar = (lista, clave) => {
  const mapa = {};
  lista.forEach((x) => (mapa[clave(x)] = (mapa[clave(x)] || 0) + 1));
  return Object.entries(mapa)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
};

export function calcularMetricas(vehicles, tradeins = []) {
  const vendidos = vehicles.filter((v) => v.estado === 'vendido');
  const enStock = vehicles.filter((v) => v.estado !== 'vendido');
  const ahora = new Date();

  const vendidosEsteMes = vendidos.filter((v) => {
    const d = new Date(v.sold_at);
    return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear();
  });

  const diasVenta = vendidos.filter((v) => v.sold_at).map((v) => diasEntre(v.created_at, v.sold_at));
  const promedioDiasVenta = diasVenta.length
    ? Math.round(diasVenta.reduce((a, b) => a + b, 0) / diasVenta.length)
    : null;

  // Ventas de los últimos 6 meses
  const ventasPorMes = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
    ventasPorMes.push({
      label: d.toLocaleDateString('es-AR', { month: 'short' }),
      value: vendidos.filter((v) => {
        const s = new Date(v.sold_at);
        return s.getMonth() === d.getMonth() && s.getFullYear() === d.getFullYear();
      }).length,
    });
  }

  const suma = (lista, campo, moneda) =>
    lista.filter((v) => (v.moneda || 'USD') === moneda).reduce((a, v) => a + (Number(v[campo]) || 0), 0);

  return {
    enStock: enStock.length,
    reservados: vehicles.filter((v) => v.estado === 'reservado').length,
    vendidos: vendidos.length,
    vendidosEsteMes: vendidosEsteMes.length,
    promedioDiasVenta,
    permutas: tradeins.length,
    valorStock: { USD: suma(enStock, 'precio', 'USD'), ARS: suma(enStock, 'precio', 'ARS') },
    facturado: {
      USD: suma(vendidos, 'precio_venta', 'USD'),
      ARS: suma(vendidos, 'precio_venta', 'ARS'),
    },
    ventasPorMes,
    stockPorTipo: contar(enStock, (v) => v.tipo),
    marcasMasVendidas: contar(vendidos, (v) => v.marca).slice(0, 6),
    masAntiguos: enStock
      .map((v) => ({ ...v, dias: diasEntre(v.created_at) }))
      .sort((a, b) => b.dias - a.dias)
      .slice(0, 8),
  };
}
