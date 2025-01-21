import { FC, FormEventHandler } from 'react';
import css from './styles.module.scss';
import { TCreatUser } from '@/data/user/enitites/user';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { Button } from '@/ui/components/ui/button.tsx';
import { Input } from '@/ui/components/ui/input.tsx';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme.tsx';

const Registration: FC = () => {
  const { switchTheme, theme } = useTheme();
  const createUser = useProfileStore().createUser;
  const error = useProfileStore().error;
  const loading = useProfileStore().registrationLoading;

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries()) as TCreatUser;

    await createUser(fields);
  };

  return (
    <PageWrapper
      title="Registration"
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
      contentClassName="items-center"
    >
      <form onSubmit={submit} autoComplete="on" className={css.form}>
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input type="text" name="name" placeholder="Full name" required />

        {error && <div className="text-red-800">{error}</div>}

        <Button size="sm" type="submit">
          Registration{' '}
          {loading && (
            <>
              {' '}
              <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </PageWrapper>
  );
};

export default Registration;
