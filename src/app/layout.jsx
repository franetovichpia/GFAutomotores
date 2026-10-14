import './globals.css';
import { site } from '@/config/site';
import { CompareProvider } from '@/context/CompareContext';

export const metadata = {
  title: `${site.nombre} | Compra, venta y consignación de vehículos`,
  description: site.descripcion,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CompareProvider>{children}</CompareProvider>
      </body>
    </html>
  );
}
