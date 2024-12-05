import { FC, HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import css from './styles.module.scss';
import { DEFAULT_DOCUMENT_TITLE } from '@/lib/constants.ts';

type PageWrapperProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    title?: string;
  };

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = '',
  title,
  ...props
}) => {
  useEffect(() => {
    if (title) {
      document.title = title || DEFAULT_DOCUMENT_TITLE;
    }
  }, [title]);

  return (
    <div className={`${css.pageWrapper} ${className}`} {...props}>
      {children}
    </div>
  );
};
