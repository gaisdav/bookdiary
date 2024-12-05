import { FC, FormEventHandler } from 'react';
import css from './styles.module.scss';
import { TCreatUser } from '@/data/user/enitites/user';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { Button } from '@/ui/components/ui/button.tsx';
import { Input } from '@/ui/components/ui/input.tsx';
import { useUser } from '@/ui/pages/profile/hooks/useUser.tsx';

const Registration: FC = () => {
  const { createUser } = useUser();

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries()) as TCreatUser;

    await createUser(fields);
  };

  return (
    <PageWrapper>
      <form onSubmit={submit} autoComplete="on" className={css.form}>
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input type="text" name="name" placeholder="Name" required />

        <Button variant="outline" size="sm" type="submit">
          Registration
        </Button>
      </form>
    </PageWrapper>
  );
};

export default Registration;
