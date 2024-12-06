import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase.config.ts';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TCreatUser } from '@/data/user/enitites/user';
import { ROUTE } from '@/routes/routes.ts';

export const useUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Navigate to appropriate routes based on authentication state
      if (
        !user &&
        location.pathname !== ROUTE.LOGIN &&
        location.pathname !== ROUTE.REGISTRATION
      ) {
        navigate(ROUTE.LOGIN);
      } else if (
        user &&
        (location.pathname === ROUTE.LOGIN ||
          location.pathname === ROUTE.REGISTRATION)
      ) {
        navigate(ROUTE.HOME);
      }
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, [location.pathname, navigate]);

  const createUser = async ({
    email,
    password,
    name: displayName,
  }: TCreatUser) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error if user creation fails
      } else {
        setError('An error occurred while creating a user');
      }
    }
  };

  return { error, createUser };
};
