import { FC, FormEventHandler } from 'react';
import { useAuthController } from './hooks/useAuth.tsx';
import { NavLink } from 'react-router-dom';
import { PageWrapper } from '@/components/PageWrapper';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import css from './styles.module.scss';
import { ROUTE } from '@/routes/routes.ts';

const Login: FC = () => {
  const { login } = useAuthController();

  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('login') as string;
    const password = formData.get('password') as string;

    await login({ email, password });
  };

  return (
    <PageWrapper>
      <form className={css.form} onSubmit={submitLogin}>
        <Input type="email" name="login" required />
        <Input type="password" name="password" required />
        <div className={css.actions}>
          <Button variant="outline" size="sm" type="submit">
            Login
          </Button>
          <Button asChild variant="outline" size="sm">
            <NavLink to={ROUTE.REGISTRATION}>Registration</NavLink>
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default Login;
