'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

// Acceso escondido al panel: 5 toques seguidos (en menos de 3 segundos) sobre el contenido.
// No reemplaza la contraseña: solo evita mostrar un botón "Admin" al público.
const TOQUES = 5;
const VENTANA_MS = 3000;

export default function SecretAdminAccess({ children, className }) {
  const router = useRouter();
  const toques = useRef([]);

  const onClick = () => {
    const ahora = Date.now();
    toques.current = [...toques.current.filter((t) => ahora - t < VENTANA_MS), ahora];
    if (toques.current.length >= TOQUES) {
      toques.current = [];
      router.push('/admin');
    }
  };

  return (
    <p onClick={onClick} className={`select-none ${className || ''}`}>
      {children}
    </p>
  );
}
