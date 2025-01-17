import { FC, useState } from 'react';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import css from './styles.module.scss';
import {
  AlertCircle,
  LogOutIcon,
  SettingsIcon,
  MailPlusIcon,
  MailQuestionIcon,
} from 'lucide-react';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { useAuthController } from '@/ui/pages/login/hooks/useAuth.tsx';
import { Img } from '@/ui/components/Img';
import { ROUTE } from '@/routes/routes.ts';
import { NavLink } from 'react-router-dom';
import { Alert, AlertTitle } from '@/ui/components/ui/alert.tsx';

const Profile: FC = () => {
  const { logout } = useAuthController();
  const profile = useProfileStore().profile;
  const { emailVerificationError } = useProfileStore().errors;
  const sendEmailVerification = useProfileStore().sendEmailVerification;
  const emailVerificationLoading = useProfileStore().emailVerificationLoading;

  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(
    profile?.emailVerified,
  );
  const [verificationLinkSent, setVerificationLinkSent] =
    useState<boolean>(false);

  if (!profile) {
    return (
      <PageWrapper title="Profile" showSearch={false}>
        User not found
      </PageWrapper>
    );
  }

  const verifyEmail = async () => {
    await sendEmailVerification();
    setIsEmailVerified(true);
    setVerificationLinkSent(true);
  };

  return (
    <PageWrapper title="Profile" showSearch={false}>
      <div className={css.actions}>
        <Button variant="outline" size="icon" asChild>
          <NavLink viewTransition to={ROUTE.SETTINGS}>
            <SettingsIcon />
          </NavLink>
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-4 justify-between items-center">
        <div className="flex flex-col w-full flex-1">
          {profile.photoURL && <Img src={profile.photoURL} />}
          <div>{profile.displayName}</div>
          <div>{profile.email}</div>
        </div>

        {!isEmailVerified && (
          <Alert
            variant="destructive"
            className="flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="m-0">
                Email verification required
              </AlertTitle>
            </div>

            <Button variant="outline" size="sm" onClick={verifyEmail}>
              <MailPlusIcon /> Verify email{' '}
              {emailVerificationLoading && (
                <>
                  {' '}
                  <div className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 h-4 w-4" />
                </>
              )}
            </Button>
          </Alert>
        )}

        {emailVerificationError && (
          <Alert variant="destructive">
            <AlertTitle>{emailVerificationError}</AlertTitle>
          </Alert>
        )}

        {verificationLinkSent && (
          <Alert className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <MailQuestionIcon className="h-4 w-4" />
              <AlertTitle className="m-0">
                Email verification link sent
              </AlertTitle>
            </div>
          </Alert>
        )}

        <Button variant="outline" onClick={logout}>
          <LogOutIcon /> Logout
        </Button>
      </div>
    </PageWrapper>
  );
};

export default Profile;
