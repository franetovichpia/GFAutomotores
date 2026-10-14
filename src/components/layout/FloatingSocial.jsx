import { instagramLink, waGeneral } from '@/lib/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '../shared/Icons';

// Botones flotantes de WhatsApp e Instagram, visibles en todo el sitio público
export default function FloatingSocial() {
  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3">
      <a
        href={instagramLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex size-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 shadow-lg transition hover:scale-110"
      >
        <InstagramIcon size={24} />
      </a>
      <a
        href={waGeneral()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-wa shadow-lg shadow-wa/40 transition hover:scale-110"
      >
        <WhatsAppIcon size={30} />
      </a>
    </div>
  );
}
