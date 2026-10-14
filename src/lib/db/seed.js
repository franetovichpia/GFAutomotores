// Vehículos de EJEMPLO para que el modo demo no arranque vacío.
// Se borran desde el panel admin (seleccionar todos > eliminar).
const diasAtras = (n) => new Date(Date.now() - n * 86400000).toISOString();

const base = [
  ['auto', 'Volkswagen', 'Gol Trend', '1.6 Trendline', 2018, 82000, 'Nafta', 'Manual', 9500, 12],
  ['camioneta', 'Toyota', 'Hilux', 'SRV 4x4', 2020, 95000, 'Diésel', 'Automática', 32000, 95],
  ['auto', 'Peugeot', '208', 'Allure 1.6', 2021, 41000, 'Nafta', 'Manual', 14500, 40],
  ['moto', 'Honda', 'XR 150L', '', 2022, 12000, 'Nafta', 'Manual', 3200, 150],
  ['camioneta', 'Ford', 'Ranger', 'XLT 3.2', 2019, 120000, 'Diésel', 'Manual', 27000, 60],
  ['auto', 'Chevrolet', 'Onix', 'LTZ 1.4', 2019, 67000, 'Nafta', 'Manual', 11000, 75],
  ['auto', 'Renault', 'Sandero', 'Stepway', 2017, 98000, 'GNC', 'Manual', 8700, 110],
];

export function seedVehicles() {
  return base.map(([tipo, marca, modelo, version, anio, km, combustible, transmision, precio, dias], i) => {
    const vendido = i >= 5;
    return {
      id: crypto.randomUUID(),
      tipo, marca, modelo, version, anio, km, combustible, transmision, precio,
      moneda: 'USD',
      descripcion: 'Vehículo de ejemplo. Editalo o eliminalo desde el panel administrativo.',
      fotos: [],
      estado: vendido ? 'vendido' : 'disponible',
      destacado: i < 3,
      created_at: diasAtras(dias),
      sold_at: vendido ? diasAtras(dias - 30 - i * 5) : null,
      precio_venta: vendido ? precio - 300 : null,
    };
  });
}
