import Link from 'next/link';

export default function TradeInCTA() {
  return (
    <section className="container-x py-8">
      <div className="relative overflow-hidden rounded-2xl bg-brand p-8 sm:p-12">
        <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10" aria-hidden="true" />
        <div className="relative max-w-xl">
          <h2 className="text-3xl font-light sm:text-4xl">
            ¿Querés entregar <span className="font-semibold">tu usado</span>?
          </h2>
          <p className="mt-3 text-white/90">
            Cargá las fotos, los kilómetros y una descripción. Lo tasamos y lo tomamos en parte de
            pago o como permuta.
          </p>
          <Link href="/permuta" className="btn mt-6 bg-ink text-white hover:bg-black">
            Cotizar mi vehículo
          </Link>
        </div>
      </div>
    </section>
  );
}
