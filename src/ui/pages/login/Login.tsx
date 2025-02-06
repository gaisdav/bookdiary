import { FC, FormEventHandler, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { Input } from '@/ui/components/ui/input.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import css from './styles.module.scss';
import { ROUTE } from '@/routes/routes.ts';
import { EyeIcon, EyeOffIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme.tsx';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { toast } from 'sonner';
import { InputWithIcon } from '@/ui/components/InputWithIcon';

const Login: FC = () => {
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const signIn = useProfileStore().signIn;
  const loading = useProfileStore().signInLoading;
  const error = useProfileStore().errors.signInError;
  const resetErrors = useProfileStore().resetErrors;

  const { switchTheme, theme } = useTheme();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        closeButton: true,
        onAutoClose: () => resetErrors('signInError'),
      });
    }
  }, [resetErrors, error]);

  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('login') as string;
    const password = formData.get('password') as string;

    await signIn({ email, password });
  };

  const switchInputType = () => {
    setPasswordInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <PageWrapper
      title="Login"
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
      <form className={css.form} onSubmit={submitLogin}>
        <Input type="email" name="login" required disabled={loading} />
        <InputWithIcon
          type={passwordInputType}
          name="password"
          placeholder="Password"
          required
          disabled={loading}
          endIcon={
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={switchInputType}
            >
              {passwordInputType === 'text' ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          }
        />

        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-4 w-full">
            <Button type="submit" disabled={loading} className="flex-1">
              Sign in
              {loading && (
                <>
                  {' '}
                  <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" disabled={loading}>
              <NavLink to={ROUTE.REGISTRATION}>Sign up</NavLink>
            </Button>
            <Button asChild variant="outline" size="sm" disabled={loading}>
              <NavLink to={ROUTE.FORGOT_PASSWORD}>Forgot password</NavLink>
            </Button>
          </div>
        </div>
      </form>
      {/*<Button size="icon" disabled={loading}>*/}
      {/*  <GoogleIcon />*/}
      {/*</Button>*/}
    </PageWrapper>
  );
};

export default Login;
