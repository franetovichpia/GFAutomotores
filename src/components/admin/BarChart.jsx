// Gráfico de barras simple, sin librerías. data: [{ label, value }]
export function ColumnChart({ title, data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="card p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="flex h-40 items-end gap-3">
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-xs">{d.value}</span>
            <div
              className="w-full rounded-t bg-brand"
              style={{ height: `${(d.value / max) * 80}%`, minHeight: d.value ? 4 : 1 }}
            />
            <span className="text-[11px] text-muted capitalize">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RowChart({ title, data, empty = 'Sin datos todavía.' }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="card p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {!data.length && <p className="text-sm text-muted">{empty}</p>}
      <ul className="space-y-3">
        {data.map((d) => (
          <li key={d.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="capitalize">{d.label}</span>
              <span>{d.value}</span>
            </div>
            <div className="h-2 rounded bg-panel-2">
              <div className="h-full rounded bg-brand" style={{ width: `${(d.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
