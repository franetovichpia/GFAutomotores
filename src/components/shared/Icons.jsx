const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.2-.4.600-1.200.1-.2 0-.3 0-.5l-.800-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.300-.900.900-1 2.200-.300 3.500a11 11 0 0 0 4.600 4.300c1.700.700 2.400.800 3.200.700.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.100-1.200Z" />
  </svg>
);

export const InstagramIcon = ({ size = 18 }) => (
  <svg {...base} width={size} height={size} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

export const CompareIcon = () => (
  <svg {...base} aria-hidden="true">
    <path d="M7 4v16M17 4v16M3 8l4-4 4 4M13 16l4 4 4-4" />
  </svg>
);

export const TrashIcon = () => (
  <svg {...base} aria-hidden="true">
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);

export const UploadIcon = ({ size = 28 }) => (
  <svg {...base} width={size} height={size} aria-hidden="true">
    <path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...base} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const CarPlaceholder = () => (
  <svg viewBox="0 0 120 60" className="w-2/5 text-white/15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 40h104M14 40v-8l10-4 12-14h38l16 14 14 4v8" />
    <circle cx="34" cy="42" r="8" />
    <circle cx="88" cy="42" r="8" />
  </svg>
);
