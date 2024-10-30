import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import css from './styles.module.scss';

type PageWrapperProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${css.pageWrapper} ${className}`} {...props}>
      {children}
    </div>
  );
};
