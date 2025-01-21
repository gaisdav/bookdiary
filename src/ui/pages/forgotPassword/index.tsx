import { FC, FormEventHandler, useState } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { Input } from '@/ui/components/ui/input.tsx';
import { Alert, AlertTitle } from '@/ui/components/ui/alert.tsx';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/routes/routes.ts';
import { MoonIcon, SunIcon } from 'lucide-react';
import css from '@/ui/pages/login/styles.module.scss';
import { useTheme } from '@/hooks/useTheme.tsx';

export const ForgotPassword: FC = () => {
  const [linkSent, setLinkSent] = useState(false);

  const { switchTheme, theme } = useTheme();

  const resetPassword = useProfileStore().resetPassword;
  const loading = useProfileStore().resetPasswordLoading;
  const error = useProfileStore().errors.resetPasswordError;
  const resetErrors = useProfileStore().resetErrors;

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    await resetPassword(email);
    setLinkSent(true);
  };

  const resetError = () => {
    resetErrors('resetPasswordError');
  };

  return (
    <PageWrapper
      title="Forgot password"
      showBack
      contentClassName="items-center"
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
      <div className="flex flex-col gap-4 w-full max-w-md">
        <form
          onSubmit={submit}
          onChange={resetError}
          className="flex flex-col gap-4 w-full items-center"
        >
          <Input type="email" name="email" required placeholder="Email" />
          {error && <div className="text-red-800">{error}</div>}
          <Button type="submit">
            Reset password
            {loading && (
              <>
                {' '}
                <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        {linkSent && (
          <Alert className="flex gap-4 items-center">
            <>
              <AlertTitle>
                We have sent you an email with a link to reset your password.
              </AlertTitle>
              <Button variant="outline" size="sm" asChild>
                <NavLink to={ROUTE.LOGIN}>Sign in</NavLink>
              </Button>
            </>
          </Alert>
        )}
      </div>
    </PageWrapper>
  );
};
