import { FC, FormEventHandler } from 'react';
import css from './styles.module.scss';
import { TCreatUser } from '@/enitites/user';
import { useUser } from '@/modules/profile/hooks/useUser.tsx';

const Registration: FC = () => {
  const { createUser } = useUser();

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
      <input type="text" name="name" placeholder="Name" required />

      <button type="submit">Registration</button>
    </form>
  );
};

export default Registration;
