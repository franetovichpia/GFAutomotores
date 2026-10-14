// Todos los datos de la agencia en un solo lugar. Cambiá acá y se actualiza todo el sitio.
export const site = {
  nombre: 'GF Automotores',
  descripcion: 'Compra, venta y consignación de vehículos. Gestoría incluida y financiación.',

  // WhatsApp en formato internacional sin + ni espacios (54 9 + código de área + número)
  whatsappVentas: '5491121542210',
  whatsappTramites: '5491121542210',
  instagram: 'gfautomotores', // TODO: confirmar el usuario real (sin @)
  email: 'gfrane.automotores@gmail.com',

  direccion: 'Lanús, Buenos Aires',
  horario: 'Lunes a sábado',

  aniosTrayectoria: 20,
  // Ventas anteriores a usar este sistema. Se suman a los vendidos cargados en el panel.
  vendidosHistoricos: 0,
};

export const servicios = [
  {
    titulo: 'Compra',
    texto: 'Tomamos tu vehículo. Lo tasamos y te hacemos una oferta concreta.',
  },
  {
    titulo: 'Venta',
    texto: 'Autos, camionetas y motos seleccionados, revisados y con la documentación al día.',
  },
  {
    titulo: 'Consignaciones',
    texto: 'Dejanos tu vehículo y nos ocupamos de publicarlo, mostrarlo y venderlo.',
  },
  {
    titulo: 'Gestoría incluida',
    texto: 'Transferencia y trámites registrales resueltos por nuestra propia gestoría.',
  },
  {
    titulo: 'Financiación',
    texto: 'Contamos con financiamiento. Consultanos las opciones para tu próximo vehículo.',
  },
  {
    titulo: 'Permutas',
    texto: 'Entregá tu usado en parte de pago. Cargá las fotos y te cotizamos.',
  },
];

// Reemplazar por testimonios reales de clientes (con su permiso). Si queda vacío, la sección no se muestra.
export const testimonios = [
  // { nombre: 'Nombre del cliente', vehiculo: 'Marca Modelo', texto: 'Lo que dijo el cliente.' },
];

export const tipos = [
  { value: 'auto', label: 'Auto' },
  { value: 'camioneta', label: 'Camioneta' },
  { value: 'moto', label: 'Moto' },
];

export const combustibles = ['Nafta', 'Diésel', 'GNC', 'Híbrido', 'Eléctrico'];
export const transmisiones = ['Manual', 'Automática'];
export const estados = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'reservado', label: 'Reservado' },
  { value: 'vendido', label: 'Vendido' },
];

export const marcasSugeridas = [
  'Chevrolet', 'Citroën', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Nissan',
  'Peugeot', 'Renault', 'Toyota', 'Volkswagen', 'Yamaha', 'Zanella', 'Motomel', 'Bajaj',
];
