import { FC, FormEventHandler, useEffect, useState } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { Input } from '@/ui/components/ui/input.tsx';
import { MoonIcon, SunIcon } from 'lucide-react';
import css from '@/ui/pages/login/styles.module.scss';
import { useTheme } from '@/hooks/useTheme.tsx';
import { toast } from 'sonner';

export const ForgotPassword: FC = () => {
  const [linkSent, setLinkSent] = useState(false);

  const { switchTheme, theme } = useTheme();

  const resetPassword = useProfileStore().resetPassword;
  const loading = useProfileStore().resetPasswordLoading;
  const error = useProfileStore().errors.resetPasswordError;
  const resetErrors = useProfileStore().resetErrors;

  useEffect(() => {
    if (error) {
      toast.error(error, {
        closeButton: true,
        onAutoClose: () => resetErrors('resetPasswordError'),
      });
    }

    return () => {
      resetErrors('resetPasswordError');
    };
  }, [resetErrors, error]);

  useEffect(() => {
    if (linkSent) {
      toast.success(
        'We have sent you an email with a link to reset your password.',
        {
          closeButton: true,
        },
      );
    }

    return () => {
      setLinkSent(false);
    };
  }, [linkSent]);

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    await resetPassword(email);
    setLinkSent(true);
  };

  const resetError = () => {
    resetErrors('resetPasswordError');
  };

  return (
    <PageWrapper
      title="Forgot password"
      showBack
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
          onChange={resetError}
          className="flex flex-col gap-4 w-full items-center"
        >
          <Input type="email" name="email" required placeholder="Email" />
          <Button type="submit">
            Reset password
            {loading && (
              <>
                {' '}
                <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
};
