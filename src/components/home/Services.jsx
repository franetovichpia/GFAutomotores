import { servicios } from '@/config/site';
import SectionTitle from '../shared/SectionTitle';

export default function Services() {
  return (
    <section className="container-x py-16">
      <SectionTitle eyebrow="Qué hacemos" title="Todo en" accent="un solo lugar" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((s, i) => (
          <div key={s.titulo} className="card p-6 transition hover:border-brand/60">
            <p className="text-sm font-semibold text-brand">0{i + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{s.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
