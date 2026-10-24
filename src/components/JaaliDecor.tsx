import React from 'react';

export const RoyalDivider: React.FC<{ className?: string; dark?: boolean }> = ({
  className = '',
  dark = false,
}) => {
  const strokeColor = dark ? '#C5A059' : '#C5A059';
  const fillColor = dark ? '#ECC870' : '#846227';

  return (
    <div className={`flex items-center justify-center my-6 space-x-3 ${className}`}>
      <div className={`h-[1px] w-12 sm:w-20 ${dark ? 'bg-gold-400/40' : 'bg-gold-500/40'}`} />
      <svg
        width="28"
        height="28"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-500 flex-shrink-0"
        aria-hidden="true"
      >
        {/* Traditional Mughal floral motif */}
        <path
          d="M20 2C20 12 10 20 2 20C10 20 20 28 20 38C20 28 30 20 38 20C30 20 20 12 20 2Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          fill={fillColor}
          fillOpacity="0.15"
        />
        <circle cx="20" cy="20" r="3" fill={fillColor} />
      </svg>
      <div className={`h-[1px] w-12 sm:w-20 ${dark ? 'bg-gold-400/40' : 'bg-gold-500/40'}`} />
    </div>
  );
};

export const RoyalArchBorder: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative p-1 rounded-t-[140px] md:rounded-t-[180px] bg-gradient-to-b from-gold-400/50 via-gold-300/30 to-gold-400/20 shadow-royal ${className}`}>
      <div className="rounded-t-[138px] md:rounded-t-[178px] bg-cream-50 h-full w-full overflow-hidden border border-gold-300/50 p-6 md:p-10">
        {children}
      </div>
    </div>
  );
};

export const MonogramBadge: React.FC<{ initials?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  initials = 'A & V',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border-2 border-gold-500/80 bg-cream-50/90 shadow-gold-subtle text-burgundy-900 font-serif-royal font-semibold tracking-wider relative group ${sizeClasses[size]}`}
    >
      <div className="absolute inset-[3px] rounded-full border border-gold-400/40 pointer-events-none" />
      <span>{initials}</span>
    </div>
  );
};
