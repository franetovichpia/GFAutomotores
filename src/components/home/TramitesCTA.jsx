import { waTramites } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../shared/Icons';

export default function TramitesCTA() {
  return (
    <section id="tramites" className="scroll-mt-20 border-t border-line">
      <div className="container-x flex flex-col items-center gap-5 py-16 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-brand uppercase">Gestoría del automotor</p>
        <h2 className="text-3xl font-light sm:text-4xl">
          Consultas por <span className="font-semibold text-brand">trámites</span>
        </h2>
        <p className="max-w-lg text-sm text-muted">
          Transferencias, informes de dominio, cédulas, denuncias de venta y más. Escribinos y te
          asesoramos.
        </p>
        <a href={waTramites()} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
          <WhatsAppIcon /> Consultar por WhatsApp
        </a>
      </div>
    </section>
  );
}
