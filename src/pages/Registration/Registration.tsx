import { FC, FormEventHandler } from 'react';
import { useAuthController } from '../../сontrollers/useAuth.tsx';
import css from './styles.module.scss';
import { TCreatUser } from '../../enitites/user';

const Registration: FC = () => {
  const { createUser } = useAuthController();

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries()) as TCreatUser;

    await createUser(fields);
  };

  return (
    <form onSubmit={submit} autoComplete="on" className={css.form}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="text" name="firstName" placeholder="First name" required />

      <button type="submit">Registration</button>
    </form>
  );
};

export default Registration;
