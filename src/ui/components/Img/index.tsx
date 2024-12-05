import React, { useState } from 'react';
import css from './Img.module.scss';
import { cn } from '@/lib/utils.ts';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  loadingPlaceholder?: React.ReactNode;
};

export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  loadingPlaceholder = 'Loading...',
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const loadingCns = cn(css.loading, className);

  return (
    <>
      {isLoading && <div className={loadingCns}>{loadingPlaceholder}</div>}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          {...props}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          style={
            isLoading
              ? { opacity: 0 }
              : { opacity: 1, transition: 'opacity 0.3s ease' }
          }
        />
      )}
    </>
  );
};
