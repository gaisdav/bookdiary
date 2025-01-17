import { FC, HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import css from './styles.module.scss';
import { DEFAULT_DOCUMENT_TITLE } from '@/lib/constants.ts';
import { MoveLeftIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/ui/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/routes/routes.ts';

type THeader = {
  showSearch?: boolean;
  showBack?: boolean;
};

type PageWrapperProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    title?: string;
  } & THeader;

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = DEFAULT_DOCUMENT_TITLE,
  title = '',
  showBack = false,
  showSearch = true,
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
          <div className="flex-1">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="relative left-0"
              >
                <MoveLeftIcon />
              </Button>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            {showSearch && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative right-0"
              >
                <NavLink viewTransition to={ROUTE.BOOKS}>
                  <SearchIcon />
                </NavLink>
              </Button>
            )}
          </div>
        </header>
      )}
      {children}
    </div>
  );
};
