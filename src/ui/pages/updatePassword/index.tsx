import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { Button } from '@/ui/components/ui/button.tsx';
import { EyeOffIcon, EyeIcon, MoonIcon, SunIcon } from 'lucide-react';
import css from '@/ui/pages/login/styles.module.scss';
import { useTheme } from '@/ui/hooks/useTheme.tsx';
import { toast } from 'sonner';
import { useProfileStore } from '@/data/profile/useProfileStore.tsx';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/ui/routes/routes.ts';
import { InputWithIcon } from '@/ui/components/InputWithIcon';

interface IInputTypes {
  'new-password': 'password' | 'text';
  'repeat-new-password': 'password' | 'text';
}

export const UpdatePassword: FC = () => {
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [inputTypes, setInputTypes] = useState<IInputTypes>({
    'new-password': 'password',
    'repeat-new-password': 'password',
  });

  const { switchTheme, theme } = useTheme();
  const updatePassword = useProfileStore().updatePassword;
  const updatePasswordError = useProfileStore().errors.updatePasswordError;
  const loading = useProfileStore().updatePasswordLoading;

  useEffect(() => {
    if (passwordUpdated) {
      toast.error('Password updated', {
        closeButton: true,
      });
    }
  }, [passwordUpdated]);

  useEffect(() => {
    if (!passwordsMatch) {
      toast.error('Passwords do not match', {
        closeButton: true,
      });
    }
  }, [passwordsMatch]);

  useEffect(() => {
    if (updatePasswordError) {
      toast.error(updatePasswordError, {
        closeButton: true,
      });
    }
  }, [updatePasswordError]);

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    const repeatedPassword = formData.get('repeated-password') as string;

    if (password !== repeatedPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      await updatePassword(password);
      setPasswordUpdated(true);
    }
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
      title="Update password"
      showBack={false}
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
          className="flex flex-col gap-4 w-full items-center"
        >
          {!passwordUpdated && (
            <>
              <InputWithIcon
                type={inputTypes['new-password']}
                name="password"
                required
                placeholder="New password"
                endIcon={
                  <Button
                    data-input-type="new-password"
                    variant="link"
                    size="icon"
                    type="button"
                    onClick={switchInputType}
                  >
                    {inputTypes['new-password'] === 'text' ? (
                      <EyeIcon />
                    ) : (
                      <EyeOffIcon />
                    )}
                  </Button>
                }
              />

              <InputWithIcon
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                type={inputTypes['repeat-new-password']}
                name="repeated-password"
                required
                placeholder="Repeat password"
                endIcon={
                  <Button
                    variant="link"
                    size="icon"
                    type="button"
                    data-input-type="repeat-new-password"
                    onClick={switchInputType}
                  >
                    {inputTypes['repeat-new-password'] === 'text' ? (
                      <EyeIcon />
                    ) : (
                      <EyeOffIcon />
                    )}
                  </Button>
                }
              />

              <Button type="submit">
                Update password
                {loading && (
                  <>
                    {' '}
                    <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}

          {passwordUpdated ? (
            <NavLink to={ROUTE.HOME.ROOT}>Go to app</NavLink>
          ) : (
            <NavLink to={ROUTE.AUTH.LOGIN}>Go to sign in page</NavLink>
          )}
        </form>
      </div>
    </PageWrapper>
  );
};
