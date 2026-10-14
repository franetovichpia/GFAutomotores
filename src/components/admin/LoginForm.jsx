'use client';
import { useState } from 'react';
import { db, isSupabase } from '@/lib/db';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await db.signIn(email, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4 p-6">
        <h1 className="text-xl font-semibold">Panel administrativo</h1>
        {isSupabase && (
          <div>
            <label className="label" htmlFor="l-mail">Mail</label>
            <input id="l-mail" type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        )}
        <div>
          <label className="label" htmlFor="l-pass">Contraseña</label>
          <input id="l-pass" type="password" required className="field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-brand">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
