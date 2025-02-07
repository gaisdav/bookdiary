import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from 'react';
import css from './styles.module.scss';
import { DEFAULT_DOCUMENT_TITLE } from '@/lib/constants.ts';
import { MoveLeftIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/ui/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/ui/routes/routes.ts';
import PWABadge from '@/PWABadge.tsx';
import { cn } from '@/lib/utils.ts';
import { H3 } from '@/ui/components/ui/typography.tsx';

type PageWrapperProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    showSearch?: boolean;
    showBack?: boolean;
    title?: string;
    customHeaderTitle?: string;
    contentClassName?: string;
    customRightButton?: ReactNode;
    customLeftButton?: ReactNode;
  };

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = DEFAULT_DOCUMENT_TITLE,
  title = '',
  customHeaderTitle = '',
  showBack = false,
  showSearch = true,
  contentClassName = '',
  customRightButton,
  customLeftButton,
  ...props
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const goBack = () => {
    window.history.back();
  };

  const headerTitle = customHeaderTitle || title;
  const leftButton =
    customLeftButton ||
    (showBack ? (
      <Button
        variant="ghost"
        size="icon"
        onClick={goBack}
        className="relative left-0"
      >
        <MoveLeftIcon />
      </Button>
    ) : null);

  const rightButton =
    customRightButton ||
    (showSearch ? (
      <Button variant="ghost" size="icon" asChild className="relative right-0">
        <NavLink viewTransition to={ROUTE.BOOKS}>
          <SearchIcon />
        </NavLink>
      </Button>
    ) : null);

  return (
    <div
      className={`hideScrollBar flex flex-col gap-4 ${css.pageWrapper} ${className}`}
      {...props}
    >
      {(leftButton || rightButton) && (
        <header className={css.header}>
          <div>{leftButton}</div>
          <div className={css.titleWrapper}>
            {headerTitle && <H3>{headerTitle}</H3>}
          </div>
          <div>{rightButton}</div>
        </header>
      )}
      <main className={cn('flex flex-col flex-1', contentClassName)}>
        {children}
        <PWABadge />
      </main>
    </div>
  );
};
