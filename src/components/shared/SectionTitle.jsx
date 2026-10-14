export default function SectionTitle({ eyebrow, title, accent, children, align = 'center' }) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-medium tracking-[0.25em] text-brand uppercase">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-light sm:text-4xl">
        {title} {accent && <span className="font-semibold text-brand">{accent}</span>}
      </h2>
      {children && <p className="mx-auto mt-3 max-w-xl text-sm text-muted">{children}</p>}
    </div>
  );
}
