'use client';
import { useState } from 'react';
import { marcasSugeridas, tipos } from '@/config/site';
import { db } from '@/lib/db';
import { toNumberOrNull } from '@/lib/format';
import { waLink } from '@/lib/whatsapp';
import PhotoUploader from '../shared/PhotoUploader';
import { WhatsAppIcon } from '../shared/Icons';

const vacio = {
  nombre: '', telefono: '', tipo: 'auto', marca: '', modelo: '', anio: '', km: '', descripcion: '', interes: '',
};

// Formulario público: el cliente carga su vehículo para permuta o parte de pago
export default function TradeInForm({ vehiculosEnStock = [] }) {
  const [form, setForm] = useState(vacio);
  const [fotos, setFotos] = useState([]);
  const [estado, setEstado] = useState('idle'); // idle | enviando | ok | error
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setEstado('enviando');
    try {
      await db.createTradeIn(
        { ...form, anio: toNumberOrNull(form.anio), km: toNumberOrNull(form.km) },
        fotos
      );
      setEstado('ok');
    } catch (err) {
      setError(err.message);
      setEstado('error');
    }
  };

  if (estado === 'ok') {
    const mensaje = `Hola, soy ${form.nombre}. Cargué en la web mi ${form.marca} ${form.modelo} para cotizar una permuta.`;
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-semibold">¡Recibimos tu vehículo!</h2>
        <p className="mt-2 text-sm text-muted">
          Lo vamos a revisar y te contactamos. Si querés una respuesta más rápida, avisanos por
          WhatsApp.
        </p>
        <a href={waLink(mensaje)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-6">
          <WhatsAppIcon /> Avisar por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="card space-y-5 p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="t-nombre">Tu nombre *</label>
          <input id="t-nombre" className="field" required value={form.nombre} onChange={set('nombre')} />
        </div>
        <div>
          <label className="label" htmlFor="t-tel">Teléfono / WhatsApp *</label>
          <input id="t-tel" className="field" type="tel" required value={form.telefono} onChange={set('telefono')} />
        </div>
        <div>
          <label className="label" htmlFor="t-tipo">Tipo</label>
          <select id="t-tipo" className="field" value={form.tipo} onChange={set('tipo')}>
            {tipos.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="t-marca">Marca *</label>
          <input id="t-marca" className="field" list="marcas" required value={form.marca} onChange={set('marca')} />
          <datalist id="marcas">
            {marcasSugeridas.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="label" htmlFor="t-modelo">Modelo *</label>
          <input id="t-modelo" className="field" required value={form.modelo} onChange={set('modelo')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="t-anio">Año</label>
            <input id="t-anio" className="field" type="number" min="1950" max="2100" value={form.anio} onChange={set('anio')} />
          </div>
          <div>
            <label className="label" htmlFor="t-km">Kilómetros</label>
            <input id="t-km" className="field" type="number" min="0" value={form.km} onChange={set('km')} />
          </div>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="t-desc">Descripción</label>
        <textarea
          id="t-desc"
          className="field min-h-28"
          placeholder="Estado general, detalles, service, único dueño…"
          value={form.descripcion}
          onChange={set('descripcion')}
        />
      </div>

      {vehiculosEnStock.length > 0 && (
        <div>
          <label className="label" htmlFor="t-interes">¿Qué vehículo te interesa? (opcional)</label>
          <select id="t-interes" className="field" value={form.interes} onChange={set('interes')}>
            <option value="">Todavía no sé</option>
            {vehiculosEnStock.map((v) => (
              <option key={v.id}>{`${v.marca} ${v.modelo}${v.anio ? ` ${v.anio}` : ''}`}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <p className="label">Fotos de tu vehículo</p>
        <PhotoUploader value={fotos} onChange={setFotos} max={12} />
      </div>

      {estado === 'error' && <p className="text-sm text-brand">No se pudo enviar: {error}</p>}

      <button className="btn btn-primary w-full" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar para cotizar'}
      </button>
    </form>
  );
}
