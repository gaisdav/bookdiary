import { FC, HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import css from './styles.module.scss';
import { DEFAULT_DOCUMENT_TITLE } from '@/lib/constants.ts';

type PageWrapperProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    title?: string;
  };

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = DEFAULT_DOCUMENT_TITLE,
  title = '',
  ...props
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className={`hideScrollBar ${css.pageWrapper} ${className}`} {...props}>
      {children}
    </div>
  );
};
