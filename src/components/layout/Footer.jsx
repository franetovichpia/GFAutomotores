import Link from 'next/link';
import { site } from '@/config/site';
import { instagramLink, waGeneral } from '@/lib/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '../shared/Icons';
import SecretAdminAccess from './SecretAdminAccess';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <SecretAdminAccess className="text-lg font-semibold">{site.nombre}</SecretAdminAccess>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.descripcion}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-brand">Navegación</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/vehiculos" className="hover:text-brand">Vehículos en stock</Link></li>
            <li><Link href="/permuta" className="hover:text-brand">Cotizar permuta</Link></li>
            <li><Link href="/comparar" className="hover:text-brand">Comparar vehículos</Link></li>
            <li><Link href="/#tramites" className="hover:text-brand">Consultas por trámites</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-brand">Contacto</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand">
                <InstagramIcon size={16} /> @{site.instagram}
              </a>
            </li>
            {site.email && (
              <li><a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a></li>
            )}
            {site.direccion && <li>{site.direccion}</li>}
            {site.horario && <li className="text-muted">{site.horario}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  );
}