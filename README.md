# Sitio de agencia automotor

Sitio público + panel administrativo. Next.js (App Router) + Tailwind CSS v4.

## Correr

```bash
npm install
npm run dev        # http://localhost:3000
```

Panel: `http://localhost:3000/admin` (en modo demo la contraseña es `admin1234`).

## Datos de la agencia

Todo está en `src/config/site.js`: nombre, WhatsApp de ventas y de trámites, Instagram,
años de trayectoria, textos de servicios y testimonios de clientes.

## Base de datos

- **Sin configurar nada** el sitio corre en **modo demo**: guarda vehículos y fotos en el navegador
  (IndexedDB) y arranca con vehículos de ejemplo. Sirve para probar y mostrar, no para producción.
- **Con Supabase** (producción):
  1. Crear un proyecto en supabase.com.
  2. SQL Editor: pegar y ejecutar `supabase/schema.sql` (tablas, permisos y bucket de fotos).
  3. Authentication > Users > Add user: ese mail y contraseña son el login del panel.
  4. Copiar `.env.example` a `.env.local` y completar URL y anon key (Project Settings > API).
  5. En Vercel, cargar las mismas dos variables.

La app solo usa `db` de `src/lib/db/index.js`, que elige la implementación según las variables.

## Estructura

```
src/
  app/                    rutas
    page.jsx              portada
    vehiculos/            stock con filtros y orden
    comparar/             comparación de 2 vehículos
    permuta/              formulario para que el cliente cargue su vehículo
    admin/                métricas · vehiculos/ · permutas/
  components/
    layout/               Navbar, Footer, botones flotantes, PublicShell
    home/                 Hero, Services, Stats, StockPreview, SoldVehicles, Testimonials, TramitesCTA
    vehicles/             VehicleCard, VehicleGrid, VehicleModal, VehicleFilters, CompareBar, CompareTable
    tradein/              TradeInForm
    admin/                AdminShell, LoginForm, VehicleForm, VehicleTable, MetricCard, BarChart
    shared/               PhotoUploader (selección y eliminado múltiple), SectionTitle, Icons
  config/site.js          datos de la agencia
  context/                CompareContext
  hooks/                  useVehicles
  lib/
    db/                   index (selector), local (demo), supabase, seed
    metrics.js            cálculo de métricas del panel
    whatsapp.js           armado de links y mensajes
    format.js · images.js
supabase/schema.sql
```
