import { testimonios } from '@/config/site';
import SectionTitle from '../shared/SectionTitle';

// Los testimonios se cargan en src/config/site.js. Si no hay ninguno, la sección no aparece.
export default function Testimonials() {
  if (!testimonios.length) return null;

  return (
    <section className="bg-panel py-16">
      <div className="container-x">
        <SectionTitle eyebrow="Nos eligen" title="Clientes" accent="satisfechos" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonios.map((t) => (
            <blockquote key={t.nombre} className="card bg-ink p-6">
              <p className="text-4xl leading-none text-brand" aria-hidden="true">“</p>
              <p className="text-sm leading-relaxed text-white/85">{t.texto}</p>
              <footer className="mt-4 text-sm">
                <span className="font-semibold">{t.nombre}</span>
                {t.vehiculo && <span className="text-muted"> · {t.vehiculo}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
