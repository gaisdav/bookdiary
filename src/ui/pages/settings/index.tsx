import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import css from './styles.module.scss';
import { MoonIcon, SunIcon, MoveLeftIcon } from 'lucide-react';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Img } from '@/ui/components/Img';
import { ROUTE } from '@/routes/routes.ts';
import { NavLink } from 'react-router-dom';

export const Settings: FC = () => {
  const { switchTheme } = useTheme();
  const { theme } = useTheme();
  const profile = useProfileStore().profile;

  if (!profile) {
    return <div>user not found</div>;
  }

  return (
    <PageWrapper title="Settings" showBack={false} showSearch={false}>
      <div className={css.actions}>
        <Button variant="ghost" size="icon" className="relative left-0" asChild>
          <NavLink viewTransition to={ROUTE.PROFILE}>
            <MoveLeftIcon />
          </NavLink>
        </Button>

        <Button variant="outline" size="icon" onClick={switchTheme}>
          {theme === 'light' ? (
            <MoonIcon className={css.themeIcon} />
          ) : (
            <SunIcon className={css.themeIcon} />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col w-full flex-1">
          {profile.photoURL && <Img src={profile.photoURL} />}
          <div>{profile.displayName}</div>
          <div>{profile.email}</div>
        </div>
      </div>
    </PageWrapper>
  );
};
