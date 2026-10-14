// MODO DEMO: guarda todo en IndexedDB del navegador. Sirve para probar y mostrar el sitio,
// pero cada navegador tiene sus propios datos. Para producción, configurar Supabase.
import { compressImage, blobToDataURL } from '../images';
import { seedVehicles } from './seed';

const DB_NAME = 'agencia-automotor';
const STORES = ['vehicles', 'tradeins'];

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () =>
      STORES.forEach((s) => req.result.createObjectStore(s, { keyPath: 'id' }));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run(store, mode, fn) {
  const conn = await open();
  return new Promise((resolve, reject) => {
    const tx = conn.transaction(store, mode);
    const result = fn(tx.objectStore(store));
    tx.oncomplete = () => resolve(result?.result ?? result);
    tx.onerror = () => reject(tx.error);
  });
}

const all = (store) => run(store, 'readonly', (s) => s.getAll());
const put = (store, value) => run(store, 'readwrite', (s) => s.put(value));
const remove = (store, ids) => run(store, 'readwrite', (s) => ids.forEach((id) => s.delete(id)));

async function resolvePhotos(items) {
  const urls = [];
  for (const item of items) {
    urls.push(item.file ? await blobToDataURL(await compressImage(item.file, 1280, 0.75)) : item.url);
  }
  return urls;
}

const byNewest = (a, b) => new Date(b.created_at) - new Date(a.created_at);

export async function listVehicles() {
  let rows = await all('vehicles');
  if (!rows.length && !localStorage.getItem('agencia-seeded')) {
    localStorage.setItem('agencia-seeded', '1');
    for (const v of seedVehicles()) await put('vehicles', v);
    rows = await all('vehicles');
  }
  return rows.sort(byNewest);
}

export async function saveVehicle(vehicle, photoItems) {
  const row = {
    ...vehicle,
    id: vehicle.id || crypto.randomUUID(),
    created_at: vehicle.created_at || new Date().toISOString(),
    fotos: await resolvePhotos(photoItems),
  };
  await put('vehicles', row);
  return row;
}

export const deleteVehicles = (ids) => remove('vehicles', ids);

export async function listTradeIns() {
  return (await all('tradeins')).sort(byNewest);
}

export async function createTradeIn(data, photoItems) {
  await put('tradeins', {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    fotos: await resolvePhotos(photoItems),
  });
}

export const deleteTradeIns = (ids) => remove('tradeins', ids);

// Login de demo: NO es seguridad real (la contraseña viaja en el código del sitio).
const KEY = 'agencia-admin';
export async function signIn(_email, password) {
  const ok = password === (process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || 'admin1234');
  if (!ok) throw new Error('Contraseña incorrecta');
  sessionStorage.setItem(KEY, '1');
}
export async function signOut() {
  sessionStorage.removeItem(KEY);
}
export async function isLoggedIn() {
  return sessionStorage.getItem(KEY) === '1';
}
