'use client';
import PublicShell from '@/components/layout/PublicShell';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Stats from '@/components/home/Stats';
import StockPreview from '@/components/home/StockPreview';
import TradeInCTA from '@/components/home/TradeInCTA';
import SoldVehicles from '@/components/home/SoldVehicles';
import Testimonials from '@/components/home/Testimonials';
import TramitesCTA from '@/components/home/TramitesCTA';
import { marcasDe } from '@/components/vehicles/VehicleFilters';
import { useVehicles } from '@/hooks/useVehicles';

export default function HomePage() {
  const { vehicles } = useVehicles();
  const enStock = vehicles.filter((v) => v.estado !== 'vendido');
  const vendidos = vehicles.filter((v) => v.estado === 'vendido');

  return (
    <PublicShell>
      <Hero marcas={marcasDe(enStock)} />
      <StockPreview vehicles={enStock} />
      <Services />
      <TradeInCTA />
      <Stats vendidos={vendidos.length} enStock={enStock.length} />
      <SoldVehicles vehicles={vendidos} limite={8} />
      <Testimonials />
      <TramitesCTA />
    </PublicShell>
  );
}