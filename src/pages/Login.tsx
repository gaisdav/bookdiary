import { FC, FormEventHandler } from 'react';

export const Login: FC = () => {
  const login: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
  };

  return (
    <form onSubmit={login}>
      <input type="text" name="login" />
      <input type="password" name="password" />

      <button type="submit">Login</button>
    </form>
  );
};
