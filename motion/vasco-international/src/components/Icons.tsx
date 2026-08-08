import React from "react";

// Ícones simples em SVG inline — sem dependência externa, sem tempo de
// download. Estilo linha, combinando com a tipografia bold do resto do vídeo.
export const IconBall: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.4" stroke={color} strokeWidth="1.6" />
    <path
      d="M12 7.2l3.6 2.6-1.4 4.2H9.8l-1.4-4.2L12 7.2z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M12 2.6v4.6M4.6 8.4l3.8.1M4.9 16l3.4-1.6M19.4 8.4l-3.8.1M19.1 16l-3.4-1.6M9.8 13.8L7 20M14.2 13.8L17 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const IconPlane: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M2.5 14.5l7.2-2.1L14 4.8c.3-.6 1.2-.9 1.8-.5.5.3.7 1 .4 1.6l-3 7.4 5 1.6c1 .3 1 1.7 0 2l-5.2 1.6-.9 3.6c-.2.8-1.3.9-1.7.2l-1.7-3-3.4.9c-.6.2-1.1-.5-.7-1l2-2.6-3.3-1.5c-.7-.3-.6-1.4.2-1.6z"
      fill={color}
    />
  </svg>
);

export const IconPin: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-6.4 7-12A7 7 0 105 9c0 5.6 7 12 7 12z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.4" stroke={color} strokeWidth="1.6" />
  </svg>
);

export const IconCalendar: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="5.2" width="17" height="15" rx="2.4" stroke={color} strokeWidth="1.6" />
    <path d="M3.5 9.6h17M8 3v3.6M16 3v3.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="8.2" cy="13.6" r="1.1" fill={color} />
    <circle cx="12" cy="13.6" r="1.1" fill={color} />
    <circle cx="15.8" cy="13.6" r="1.1" fill={color} />
  </svg>
);

export const IconCastle: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* castelo com 3 torres — silhueta mais limpa/reconhecível */}
    <path
      d="M4 21V11.2L2.6 9.8 4 8.4l1.6 1.6V6.4h2v2.2L9 7.2l1.4 1.4-1.6 1.6V21M4 21h16M20 21V11.2l1.4-1.4-1.4-1.4-1.6 1.6V6.4h-2v2.2L15 7.2l-1.4 1.4 1.6 1.6V21M12 21v-6.4c0-1.1.9-2 2-2s2 .9 2 2V21M12 21v-6.4c0-1.1-.9-2-2-2s-2 .9-2 2V21"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M12 8.4V5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M12 5l-1.6 1 1.6 1 1.6-1L12 5z" fill={color} />
  </svg>
);

export const IconWave: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* sol + ondas — parque aquático */}
    <circle cx="12" cy="7.4" r="3.1" stroke={color} strokeWidth="1.6" />
    <path
      d="M2.5 16.2c1.6-1.8 3.3-1.8 4.9 0 1.6 1.8 3.3 1.8 4.9 0 1.6-1.8 3.3-1.8 4.9 0 1.6 1.8 3.3 1.8 4.9 0"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M2.5 20.4c1.6-1.8 3.3-1.8 4.9 0 1.6 1.8 3.3 1.8 4.9 0 1.6-1.8 3.3-1.8 4.9 0 1.6 1.8 3.3 1.8 4.9 0"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

/** Claquete de cinema — Hollywood Studios. */
export const IconClapper: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="9.5" width="18" height="11.5" rx="1.6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 9.5l1.4-5 15.6 3-1 5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M6.6 4.9l3 3.1M11.8 4l3 3.1" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M3 13.2h18" stroke={color} strokeWidth="1.3" />
  </svg>
);

/** Sacola de compras — Disney Springs. */
export const IconBag: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5.5 8.4h13l1 12.2a1.6 1.6 0 01-1.6 1.7H6.1a1.6 1.6 0 01-1.6-1.7l1-12.2z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8.4 8.4v-2a3.6 3.6 0 017.2 0v2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** Bandeira dos Estados Unidos — cores reais (não é um "acento" de
 * destaque, é a identidade da bandeira mesmo). */
export const IconFlagUSA: React.FC<{ width?: number }> = ({ width = 90 }) => (
  <svg width={width} height={width * 0.53} viewBox="0 0 60 32" style={{ display: "block" }}>
    <rect width="60" height="32" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map((i) => (
      <rect key={i} y={(i * 32) / 13} width="60" height={32 / 13} fill="#fff" />
    ))}
    <rect width="26" height="17.2" fill="#3C3B6E" />
    {Array.from({ length: 12 }).map((_, i) => (
      <circle key={i} cx={2.5 + (i % 4) * 6.5} cy={2.5 + Math.floor(i / 4) * 6} r="0.9" fill="#fff" />
    ))}
  </svg>
);

/** Passaporte — livrinho com brasão simplificado. */
export const IconPassport: React.FC<{ size?: number; color?: string }> = ({
  size = 70,
  color = "#0A0A0A",
}) => (
  <svg width={size * 0.74} height={size} viewBox="0 0 44 60">
    <rect x="1.5" y="1.5" width="41" height="57" rx="4" fill={color} stroke="#fff" strokeWidth="1.4" />
    <rect x="6" y="6" width="32" height="48" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <circle cx="22" cy="24" r="8" fill="none" stroke="#fff" strokeWidth="1.4" />
    <path d="M22 17.5v13M16 24h12" stroke="#fff" strokeWidth="1.2" />
    <rect x="12" y="38" width="20" height="3" fill="#fff" opacity="0.85" />
    <rect x="12" y="43" width="14" height="2.4" fill="#fff" opacity="0.55" />
  </svg>
);

export const IconSpark: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.4l1.8 6.3 6.3 1.8-6.3 1.8L12 18.4l-1.8-6.1-6.3-1.8 6.3-1.8L12 2.4z"
      fill={color}
    />
  </svg>
);

/** Cursor de mouse (seta) — usado no clique simulado em cima de um CTA. */
export const IconCursor: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4.5 2.8l14.6 8.4-6.2 1.5-1.5 6.2-6.9-16.1z"
      fill={color}
      stroke="#000"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShirt: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M8 3l4 2 4-2 4 3.4-2.6 2.6L16 7.6V21H8V7.6l-1.4 1.4L4 6.4 8 3z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
