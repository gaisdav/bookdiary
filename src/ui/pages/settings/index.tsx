import { FC } from 'react';
import { useTheme } from '@/ui/hooks/useTheme.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import css from './styles.module.scss';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import { Img } from '@/ui/components/Img';

export const Settings: FC = () => {
  const { switchTheme, theme } = useTheme();
  const profile = useProfileStore().profile;

  if (!profile) {
    return <div>user not found</div>;
  }

  return (
    <PageWrapper
      title="Settings"
      showBack
      customRightButton={
        <Button variant="outline" size="icon" onClick={switchTheme}>
          {theme === 'light' ? (
            <MoonIcon className={css.themeIcon} />
          ) : (
            <SunIcon className={css.themeIcon} />
          )}
        </Button>
      }
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col w-full flex-1">
          {profile.avatarUrl && <Img src={profile.avatarUrl} />}
          <div>{profile.fullName}</div>
          <div>{profile.email}</div>
        </div>
      </div>
    </PageWrapper>
  );
};
