import React, { useState } from 'react';

interface RoyalImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const RoyalImage: React.FC<RoyalImageProps> = ({
  src,
  alt = 'Royal Wedding',
  fallbackTitle,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cream-200 ${containerClassName}`}>
      {/* Loading Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-cream-200 via-cream-100 to-cream-200 animate-pulse flex items-center justify-center">
          <span className="font-serif italic text-gold-600 text-sm opacity-60">Loading portrait...</span>
        </div>
      )}

      {/* Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-700 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      ) : (
        /* Graceful Royal Fallback Vector Card */
        <div className="w-full h-full min-h-[220px] p-6 flex flex-col items-center justify-center text-center bg-cream-100 border border-gold-300/40">
          <div className="w-12 h-12 rounded-full border border-gold-500/60 flex items-center justify-center text-gold-600 mb-3 bg-gold-50">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <span className="font-serif-royal text-lg text-burgundy-900 font-semibold mb-1">
            {fallbackTitle || alt || 'Celebration Memory'}
          </span>
          <p className="text-xs text-charcoal-800/70 max-w-[200px] font-sans">
            Mewar Heritage Celebrations • A & V
          </p>
        </div>
      )}
    </div>
  );
};
