import { site } from '@/config/site';

// Trayectoria + vehículos vendidos (los cargados en el panel + los históricos de config)
export default function Stats({ vendidos, enStock }) {
  const total = vendidos + site.vendidosHistoricos;
  const items = [
    [site.aniosTrayectoria, 'Años de trayectoria'],
    total > 0 && [total, 'Vehículos vendidos'],
    enStock > 0 && [enStock, 'Vehículos en stock'],
  ].filter(Boolean);

  const columnas = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' }[items.length];

  return (
    <section className="border-y border-line bg-panel">
      <div className={`container-x grid gap-8 py-12 text-center ${columnas}`}>
        {items.map(([numero, label]) => (
          <div key={label}>
            <p className="text-5xl font-semibold text-brand">
              {numero}
            </p>
            <p className="mt-2 text-sm tracking-wide text-white/75 uppercase">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
