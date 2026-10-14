-- Pegar completo en Supabase > SQL Editor > Run.
-- Después: Authentication > Users > Add user (ese mail y contraseña son el login de /admin).

create table if not exists vehicles (
  id uuid primary key,
  tipo text not null check (tipo in ('auto','camioneta','moto')),
  marca text not null,
  modelo text not null,
  version text,
  anio int,
  km int,
  combustible text,
  transmision text,
  precio numeric,
  moneda text default 'USD',
  descripcion text,
  fotos jsonb not null default '[]',
  estado text not null default 'disponible' check (estado in ('disponible','reservado','vendido')),
  destacado boolean default false,
  created_at timestamptz not null default now(),
  sold_at timestamptz,
  precio_venta numeric
);

create table if not exists tradeins (
  id uuid primary key,
  nombre text not null,
  telefono text not null,
  tipo text,
  marca text,
  modelo text,
  anio int,
  km int,
  descripcion text,
  interes text,
  fotos jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table vehicles enable row level security;
alter table tradeins enable row level security;

-- Vehículos: cualquiera los ve, solo el admin logueado los modifica
create policy "vehicles lectura publica" on vehicles for select using (true);
create policy "vehicles admin" on vehicles for all to authenticated using (true) with check (true);

-- Permutas: cualquiera puede enviar, solo el admin las lee o borra
create policy "tradeins alta publica" on tradeins for insert to anon, authenticated with check (true);
create policy "tradeins admin lee" on tradeins for select to authenticated using (true);
create policy "tradeins admin borra" on tradeins for delete to authenticated using (true);

-- Storage de fotos
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true)
on conflict (id) do nothing;

create policy "fotos lectura publica" on storage.objects for select using (bucket_id = 'fotos');
create policy "fotos admin" on storage.objects for all to authenticated
  using (bucket_id = 'fotos') with check (bucket_id = 'fotos');
create policy "fotos permutas publico" on storage.objects for insert to anon
  with check (bucket_id = 'fotos' and (storage.foldername(name))[1] = 'permutas');
