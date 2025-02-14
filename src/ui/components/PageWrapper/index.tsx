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
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '@/ui/routes/routes.ts';
import PWABadge from '@/PWABadge.tsx';
import { cn } from '@/lib/utils.ts';
import { H3 } from '@/ui/components/ui/typography.tsx';

type PageWrapperProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    showSearch?: boolean;
    showBack?: boolean;
    title?: string;
    customHeaderTitle?: ReactNode;
    contentClassName?: string;
    customRightButton?: ReactNode;
    customLeftButton?: ReactNode;
    onGoBack?: () => void;
  };

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = DEFAULT_DOCUMENT_TITLE,
  title = '',
  customHeaderTitle,
  showBack = false,
  showSearch = true,
  contentClassName = '',
  customRightButton,
  customLeftButton,
  onGoBack,
  ...props
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const goBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (location.key === 'default') {
      navigate(ROUTE.HOME.ROOT);
    } else {
      navigate(-1);
    }
  };

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
      <Button
        variant="outline"
        size="icon"
        asChild
        className="relative right-0"
      >
        <NavLink viewTransition to={ROUTE.SEARCH.ROOT}>
          <SearchIcon />
        </NavLink>
      </Button>
    ) : null);

  const showHeader = Boolean(leftButton || rightButton);

  return (
    <div
      className={cn(
        `hideScrollBar flex flex-col gap-4 ${css.pageWrapper} ${className}`,
        { [css.headerPadding]: showHeader },
      )}
      {...props}
    >
      {showHeader && (
        <header className={css.header}>
          <div>{leftButton}</div>
          <div className={cn(css.titleWrapper, 'hideScrollBar')}>
            {customHeaderTitle || (
              <H3 className="pt-[0.2rem] h-full">{title}</H3>
            )}
          </div>
          <div>{rightButton}</div>
        </header>
      )}
      <main
        className={cn(
          'flex flex-col flex-1',

          contentClassName,
        )}
      >
        {children}
        <PWABadge />
      </main>
    </div>
  );
};
