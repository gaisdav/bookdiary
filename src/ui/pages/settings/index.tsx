import { FC } from 'react';
import { useTheme } from '@/ui/hooks/useTheme.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import css from './styles.module.scss';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import { Img } from '@/ui/components/Img';
import { changeLanguage } from '@/lib/utils.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select.tsx';
import { useTranslation } from 'react-i18next';
import { Label } from '@/ui/components/ui/label.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/ui/routes/routes.ts';

export const Settings: FC = () => {
  const { switchTheme, theme } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const profile = useProfileStore().profile;

  if (!profile) {
    return <div>user not found</div>;
  }

  const goBack = () => {
    navigate(ROUTE.PROFILE.ROOT);
  };

  return (
    <PageWrapper
      title={t('settings.title')}
      showBack
      onGoBack={goBack}
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
      <div className="flex flex-col gap-4 flex-1">
        <Label htmlFor="languages">{t('settings.language')}</Label>
        <Select onValueChange={changeLanguage} value={i18n.language}>
          <SelectTrigger id="languages" className="w-[180px]">
            <SelectValue placeholder={t('settings.language')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </PageWrapper>
  );
};
