import { FC, HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import css from './styles.module.scss';
import { DEFAULT_DOCUMENT_TITLE } from '@/lib/constants.ts';
import { MoveLeftIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/ui/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/routes/routes.ts';

type PageWrapperProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    title?: string;
    showSearch?: boolean;
    showBack?: boolean;
    expandSearch?: boolean;
  };

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = DEFAULT_DOCUMENT_TITLE,
  title = '',
  showBack = false,
  showSearch = false,
  ...props
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={`hideScrollBar ${css.pageWrapper} ${className}`} {...props}>
      {(showSearch || showBack) && (
        <header className={css.header}>
          {showBack && (
            <Button variant="ghost" size="icon" onClick={goBack}>
              <MoveLeftIcon />
            </Button>
          )}
          {showSearch && (
            <div className="flex flex-1 justify-end">
              <Button variant="ghost" size="icon" asChild>
                <NavLink viewTransition to={ROUTE.BOOKS}>
                  <SearchIcon />
                </NavLink>
              </Button>
            </div>
          )}
        </header>
      )}
      {children}
    </div>
  );
};
