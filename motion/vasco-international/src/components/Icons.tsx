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
    <path
      d="M12 2.5l1.6 3 2-1.4-.4 3.4h2.4v3.2h-1.6v7.8H7.9v-7.8H6.3V7.5h2.4l-.4-3.4 2 1.4L12 2.5z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M10 21.5v-4.6a2 2 0 014 0v4.6" stroke={color} strokeWidth="1.4" />
  </svg>
);

export const IconWave: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#fff",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M2 15c1.6-2 3.4-2 5 0s3.4 2 5 0 3.4-2 5 0 3.4 2 5 0M2 19c1.6-2 3.4-2 5 0s3.4 2 5 0 3.4-2 5 0 3.4 2 5 0"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="7" r="3.2" stroke={color} strokeWidth="1.6" />
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
