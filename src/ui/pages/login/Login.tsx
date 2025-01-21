import { FC, FormEventHandler } from 'react';
import { useAuthController } from './hooks/useAuth.tsx';
import { NavLink } from 'react-router-dom';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { Input } from '@/ui/components/ui/input.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import css from './styles.module.scss';
import { ROUTE } from '@/routes/routes.ts';
import { Alert, AlertTitle } from '@/ui/components/ui/alert.tsx';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme.tsx';

const Login: FC = () => {
  const { login, loading, error } = useAuthController();
  const { switchTheme, theme } = useTheme();

  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('login') as string;
    const password = formData.get('password') as string;

    await login({ email, password });
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
        <Input type="password" name="password" required disabled={loading} />
        {error && (
          <Alert variant="destructive">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <div className="flex flex-col gap-2 items-center">
          <Button size="sm" type="submit" disabled={loading} className="w-full">
            Sign in
            {loading && (
              <>
                {' '}
                <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
              </>
            )}
          </Button>
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
    </PageWrapper>
  );
};

export default Login;
