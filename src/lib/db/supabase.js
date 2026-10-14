// Implementación con Supabase: tablas `vehicles` y `tradeins`, bucket `fotos`, login con Auth.
// El esquema está en /supabase/schema.sql
import { createClient } from '@supabase/supabase-js';
import { compressImage } from '../images';

const BUCKET = 'fotos';
let client;
const sb = () =>
  (client ||= createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ));

const check = ({ data, error }) => {
  if (error) throw new Error(error.message);
  return data;
};

async function uploadPhotos(items, folder) {
  const urls = [];
  for (const item of items) {
    if (!item.file) {
      urls.push(item.url);
      continue;
    }
    const path = `${folder}/${crypto.randomUUID()}.jpg`;
    const blob = await compressImage(item.file);
    check(await sb().storage.from(BUCKET).upload(path, blob, { contentType: 'image/jpeg' }));
    urls.push(sb().storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }
  return urls;
}

const pathFromUrl = (url) => url.split(`/object/public/${BUCKET}/`)[1];

async function removePhotos(urls) {
  const paths = urls.map(pathFromUrl).filter(Boolean);
  if (paths.length) await sb().storage.from(BUCKET).remove(paths);
}

export async function listVehicles() {
  return check(await sb().from('vehicles').select('*').order('created_at', { ascending: false }));
}

export async function saveVehicle(vehicle, photoItems) {
  const id = vehicle.id || crypto.randomUUID();
  const fotos = await uploadPhotos(photoItems, `vehiculos/${id}`);
  const row = {
    ...vehicle,
    id,
    created_at: vehicle.created_at || new Date().toISOString(),
    fotos,
  };
  check(await sb().from('vehicles').upsert(row));
  // Borra del storage las fotos que se quitaron al editar
  await removePhotos((vehicle.fotos || []).filter((u) => !fotos.includes(u)));
  return row;
}

export async function deleteVehicles(ids) {
  const rows = check(await sb().from('vehicles').select('fotos').in('id', ids));
  check(await sb().from('vehicles').delete().in('id', ids));
  await removePhotos(rows.flatMap((r) => r.fotos || []));
}

export async function listTradeIns() {
  return check(await sb().from('tradeins').select('*').order('created_at', { ascending: false }));
}

export async function createTradeIn(data, photoItems) {
  const id = crypto.randomUUID();
  const fotos = await uploadPhotos(photoItems, `permutas/${id}`);
  // Sin .select(): el público puede insertar pero no leer
  check(await sb().from('tradeins').insert({ ...data, id, fotos }));
}

export async function deleteTradeIns(ids) {
  const rows = check(await sb().from('tradeins').select('fotos').in('id', ids));
  check(await sb().from('tradeins').delete().in('id', ids));
  await removePhotos(rows.flatMap((r) => r.fotos || []));
}

export async function signIn(email, password) {
  const { error } = await sb().auth.signInWithPassword({ email, password });
  if (error) throw new Error('Mail o contraseña incorrectos');
}
export async function signOut() {
  await sb().auth.signOut();
}
export async function isLoggedIn() {
  const { data } = await sb().auth.getSession();
  return Boolean(data.session);
}
