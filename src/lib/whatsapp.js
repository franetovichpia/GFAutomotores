import { site } from '@/config/site';
import { nombreVehiculo } from './format';

export const waLink = (mensaje, numero = site.whatsappVentas) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

// Mensaje de las cards: solo marca y modelo
export const waVehiculo = (v) => waLink(`Hola, estoy interesado en el ${nombreVehiculo(v)}`);

export const waTramites = () =>
  waLink('Hola, quiero hacer una consulta por un trámite automotor', site.whatsappTramites);

export const waGeneral = () => waLink('Hola, quiero hacer una consulta');

export const instagramLink = () => `https://instagram.com/${site.instagram}`;
