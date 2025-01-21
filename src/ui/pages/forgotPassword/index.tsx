import { FC, FormEventHandler } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { Input } from '@/ui/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/routes/routes.ts';

export const ForgotPassword: FC = () => {
  const resetPassword = useProfileStore().resetPassword;
  const loading = useProfileStore().resetPasswordLoading;
  const error = useProfileStore().errors.resetPasswordError;
  const resetErrors = useProfileStore().resetErrors;

  const navigate = useNavigate();

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    await resetPassword(email);
    navigate(ROUTE.LOGIN, {
      replace: true,
    });
  };

  const resetError = () => {
    resetErrors('resetPasswordError');
  };

  return (
    <PageWrapper
      title="Forgot password"
      showBack
      contentClassName="items-center"
    >
      <form
        onSubmit={submit}
        className="flex flex-col gap-4 w-full max-w-md"
        onChange={resetError}
      >
        <Input type="email" name="email" required placeholder="Email" />
        {error && <div className="text-red-800">{error}</div>}
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
    </PageWrapper>
  );
};
