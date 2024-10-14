import { FC, FormEventHandler } from 'react';
import { useAuthController } from './hooks/useAuth.tsx';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../routes/router.tsx';

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
    <form onSubmit={submitLogin}>
      <input type="email" name="login" required />
      <input type="password" name="password" required />

      <button type="submit">Login</button>
      <Link to={ROUTE.REGISTRATION}>REGISTRATION</Link>
    </form>
  );
};

export default Login;
