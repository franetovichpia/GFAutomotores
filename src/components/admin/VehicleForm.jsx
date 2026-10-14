'use client';
import { useState } from 'react';
import { combustibles, estados, marcasSugeridas, tipos, transmisiones } from '@/config/site';
import { db } from '@/lib/db';
import { urlToItem } from '@/lib/images';
import { toNumberOrNull } from '@/lib/format';
import PhotoUploader from '../shared/PhotoUploader';

const vacio = {
  tipo: 'auto', marca: '', modelo: '', version: '', anio: '', km: '', combustible: 'Nafta',
  transmision: 'Manual', precio: '', moneda: 'USD', descripcion: '', estado: 'disponible',
  destacado: false, created_at: '', sold_at: '', precio_venta: '',
};

const aFecha = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : '');
const aISO = (fecha) => (fecha ? new Date(`${fecha}T12:00:00`).toISOString() : null);

// Alta y edición de vehículos
export default function VehicleForm({ vehicle, onSaved, onCancel }) {
  const [form, setForm] = useState(() => ({
    ...vacio,
    ...Object.fromEntries(Object.entries(vehicle || {}).map(([k, v]) => [k, v ?? ''])),
    created_at: aFecha(vehicle?.created_at) || aFecha(new Date()),
    sold_at: aFecha(vehicle?.sold_at),
  }));
  const [fotos, setFotos] = useState(() => (vehicle?.fotos || []).map(urlToItem));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const vendido = form.estado === 'vendido';

  const guardar = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await db.saveVehicle(
        {
          ...form,
          id: vehicle?.id,
          fotos: vehicle?.fotos || [],
          anio: toNumberOrNull(form.anio),
          km: toNumberOrNull(form.km),
          precio: toNumberOrNull(form.precio),
          destacado: Boolean(form.destacado),
          created_at: aISO(form.created_at) || new Date().toISOString(),
          sold_at: vendido ? aISO(form.sold_at) || new Date().toISOString() : null,
          precio_venta: vendido ? toNumberOrNull(form.precio_venta) ?? toNumberOrNull(form.precio) : null,
        },
        fotos
      );
      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const Select = ({ id, label, campo, opciones }) => (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <select id={id} className="field" value={form[campo]} onChange={set(campo)}>
        {opciones.map((o) =>
          typeof o === 'string' ? <option key={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
    </div>
  );

  return (
    <form onSubmit={guardar} className="card space-y-5 p-5 sm:p-6">
      <h2 className="text-xl font-semibold">{vehicle ? 'Editar vehículo' : 'Nuevo vehículo'}</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Select({ id: 'v-tipo', label: 'Tipo', campo: 'tipo', opciones: tipos })}
        <div>
          <label className="label" htmlFor="v-marca">Marca *</label>
          <input id="v-marca" className="field" list="marcas-admin" required value={form.marca} onChange={set('marca')} />
          <datalist id="marcas-admin">
            {marcasSugeridas.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="label" htmlFor="v-modelo">Modelo *</label>
          <input id="v-modelo" className="field" required value={form.modelo} onChange={set('modelo')} />
        </div>
        <div>
          <label className="label" htmlFor="v-version">Versión</label>
          <input id="v-version" className="field" value={form.version} onChange={set('version')} />
        </div>
        <div>
          <label className="label" htmlFor="v-anio">Año</label>
          <input id="v-anio" type="number" min="1950" max="2100" className="field" value={form.anio} onChange={set('anio')} />
        </div>
        <div>
          <label className="label" htmlFor="v-km">Kilómetros</label>
          <input id="v-km" type="number" min="0" className="field" value={form.km} onChange={set('km')} />
        </div>
        {Select({ id: 'v-comb', label: 'Combustible', campo: 'combustible', opciones: combustibles })}
        {Select({ id: 'v-trans', label: 'Transmisión', campo: 'transmision', opciones: transmisiones })}
        <div>
          <label className="label" htmlFor="v-precio">Precio (vacío = «Consultar»)</label>
          <input id="v-precio" type="number" min="0" className="field" value={form.precio} onChange={set('precio')} />
        </div>
        {Select({ id: 'v-moneda', label: 'Moneda', campo: 'moneda', opciones: ['USD', 'ARS'] })}
        {Select({ id: 'v-estado', label: 'Estado', campo: 'estado', opciones: estados })}
        <div>
          <label className="label" htmlFor="v-ingreso">Fecha de ingreso</label>
          <input id="v-ingreso" type="date" className="field" value={form.created_at} onChange={set('created_at')} />
        </div>
        {vendido && (
          <>
            <div>
              <label className="label" htmlFor="v-venta">Fecha de venta</label>
              <input id="v-venta" type="date" className="field" value={form.sold_at} onChange={set('sold_at')} />
            </div>
            <div>
              <label className="label" htmlFor="v-pventa">Precio de venta final</label>
              <input id="v-pventa" type="number" min="0" className="field" value={form.precio_venta} onChange={set('precio_venta')} />
            </div>
          </>
        )}
      </div>

      <div>
        <label className="label" htmlFor="v-desc">Descripción</label>
        <textarea id="v-desc" className="field min-h-28" value={form.descripcion} onChange={set('descripcion')} />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" className="size-4 accent-brand" checked={Boolean(form.destacado)} onChange={set('destacado')} />
        Destacar en la portada
      </label>

      <div>
        <p className="label">Fotos</p>
        <PhotoUploader value={fotos} onChange={setFotos} />
      </div>

      {error && <p className="text-sm text-brand">No se pudo guardar: {error}</p>}

      <div className="flex gap-3">
        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
