'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CompareContext = createContext(null);
const KEY = 'agencia-comparar';
export const MAX_COMPARE = 2;

export function CompareProvider({ children }) {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(KEY)) || []);
    } catch {}
  }, []);

  const update = (next) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  // Si ya hay 2 elegidos, el nuevo reemplaza al más viejo
  const toggle = (id) =>
    update(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id].slice(-MAX_COMPARE));

  return (
    <CompareContext.Provider value={{ ids, toggle, clear: () => update([]) }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
