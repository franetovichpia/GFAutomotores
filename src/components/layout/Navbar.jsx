'use client';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/config/site';
import { waGeneral } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../shared/Icons';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/vehiculos', label: 'Vehículos' },
  { href: '/permuta', label: 'Cotizar permuta' },
  { href: '/comparar', label: 'Comparar' },
  { href: '/#tramites', label: 'Trámites' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [nombre, ...resto] = site.nombre.split(' ');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          <span className="text-brand">{nombre}</span>{' '}
          <span className="font-light">{resto.join(' ')}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/80 transition hover:text-brand">
              {l.label}
            </Link>
          ))}
          <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
            <WhatsAppIcon size={16} /> Consultar
          </a>
        </nav>

        <button
          className="cursor-pointer p-2 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
        </button>
      </div>

      {open && (
        <nav className="container-x flex flex-col gap-1 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm hover:bg-panel"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
