import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import css from './styles.module.scss';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { Button } from '@/ui/components/ui/button.tsx';
import { Input } from '@/ui/components/ui/input.tsx';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import { EyeIcon, EyeOffIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/ui/hooks/useTheme.tsx';
import { toast } from 'sonner';
import { InputWithIcon } from '@/ui/components/InputWithIcon';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/ui/routes/routes.ts';

interface IInputTypes {
  password: 'password' | 'text';
  'repeat-password': 'password' | 'text';
}

const Registration: FC = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [inputTypes, setInputTypes] = useState<IInputTypes>({
    password: 'password',
    'repeat-password': 'password',
  });

  const { switchTheme, theme } = useTheme();
  const createUser = useProfileStore().createUser;
  const { signUpError } = useProfileStore().errors;
  const resetErrors = useProfileStore().resetErrors;
  const loading = useProfileStore().registrationLoading;

  useEffect(() => {
    if (!passwordsMatch) {
      toast.error('Passwords do not match', {
        closeButton: true,
      });
    }
  }, [passwordsMatch]);

  useEffect(() => {
    if (signUpError) {
      toast.error(signUpError, {
        closeButton: true,
        onAutoClose: () => resetErrors('signUpError'),
      });
    }
  }, [resetErrors, signUpError]);

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries());

    if (fields.password !== fields['repeated-password']) {
      setPasswordsMatch(false);
      return;
    }

    await createUser({
      email: fields.email.toString(),
      password: fields.password.toString(),
      full_name: fields.full_name.toString(),
    });
    setSignedUp(true);
    toast.success(
      'You have successfully signed up. Please check your email to confirm your registration.',
      {
        closeButton: true,
      },
    );
  };

  const switchInputType: MouseEventHandler<HTMLButtonElement> = (e) => {
    const inputType = e.currentTarget.getAttribute('data-input-type') as
      | keyof IInputTypes
      | null;

    if (!inputType) {
      return;
    }

    setInputTypes((prev) => ({
      ...prev,
      [inputType]: prev[inputType] === 'password' ? 'text' : 'password',
    }));
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
        <Input type="text" name="full_name" placeholder="Full name" required />
        <InputWithIcon
          type={inputTypes['password']}
          name="password"
          placeholder="Password"
          required
          endIcon={
            <Button
              variant="ghost"
              size="icon"
              type="button"
              data-input-type="password"
              onClick={switchInputType}
            >
              {inputTypes['password'] === 'text' ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          }
        />
        <InputWithIcon
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          type={inputTypes['repeat-password']}
          name="repeated-password"
          required
          placeholder="Repeat password"
          endIcon={
            <Button
              variant="ghost"
              size="icon"
              type="button"
              data-input-type="repeat-password"
              onClick={switchInputType}
            >
              {inputTypes['repeat-password'] === 'text' ? (
                <EyeIcon />
              ) : (
                <EyeOffIcon />
              )}
            </Button>
          }
        />

        <Button size="sm" type="submit">
          Sign up{' '}
          {loading && (
            <>
              {' '}
              <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
            </>
          )}
        </Button>
        {signedUp && (
          <NavLink to={ROUTE.LOGIN} className="text-center">
            Go sign in page
          </NavLink>
        )}
      </form>
    </PageWrapper>
  );
};

export default Registration;
