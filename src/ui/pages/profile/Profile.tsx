import { FC } from 'react';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Img } from '@/ui/components/Img';
import { ROUTE } from '@/routes/routes.ts';
import { NavLink } from 'react-router-dom';

const Profile: FC = () => {
  const profile = useProfileStore().profile;
  const signOut = useProfileStore().signOut;

  if (!profile) {
    return (
      <PageWrapper title="Profile" showSearch={false}>
        User not found
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="Profile"
      showSearch={false}
      customRightButton={
        <Button variant="outline" size="icon" asChild>
          <NavLink viewTransition to={ROUTE.SETTINGS}>
            <SettingsIcon />
          </NavLink>
        </Button>
      }
    >
      <div className="flex flex-1 flex-col gap-4 justify-between items-center">
        <div className="flex flex-col w-full flex-1">
          {profile.avatarUrl && <Img src={profile.avatarUrl} />}
          <div>{profile.fullName}</div>
          <div>{profile.email}</div>
        </div>

        <Button variant="outline" onClick={signOut}>
          <LogOutIcon /> Sign out
        </Button>
      </div>
    </PageWrapper>
  );
};

export default Profile;
