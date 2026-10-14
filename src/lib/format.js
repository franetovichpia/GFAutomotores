export const formatKm = (km) =>
  km == null || km === '' ? '—' : `${Number(km).toLocaleString('es-AR')} km`;

export const formatPrecio = (precio, moneda = 'USD') =>
  precio == null || precio === ''
    ? 'Consultar'
    : `${moneda === 'USD' ? 'US$' : '$'} ${Number(precio).toLocaleString('es-AR')}`;

export const formatFecha = (iso) =>
  iso ? new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';

export const nombreVehiculo = (v) => `${v.marca} ${v.modelo}`.trim();

export const diasEntre = (desde, hasta = new Date()) =>
  Math.max(0, Math.floor((new Date(hasta) - new Date(desde)) / 86400000));

export const toNumberOrNull = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
