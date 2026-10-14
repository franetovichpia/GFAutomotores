// Capa de datos. El resto de la app solo importa `db` y no sabe dónde se guarda.
//
// Las dos implementaciones exponen lo mismo:
//   listVehicles()                      -> Vehicle[]
//   saveVehicle(vehicle, photoItems)    -> Vehicle      (crea o actualiza)
//   deleteVehicles(ids)
//   listTradeIns()                      -> TradeIn[]
//   createTradeIn(data, photoItems)
//   deleteTradeIns(ids)
//   signIn(email, password) / signOut() / isLoggedIn()
import * as local from './local';
import * as supabase from './supabase';

export const isSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const db = isSupabase ? supabase : local;
