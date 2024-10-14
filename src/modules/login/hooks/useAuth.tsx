import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { ROUTE } from '../../../routes/router.tsx';
import { auth } from '../../../firebase.config.ts';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser, TCreatUser } from '../../../enitites/user';

export const useAuthController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

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

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error if user creation fails
      } else {
        console.error(error);
        setError('An error occurred while creating a user');
      }
    }
  };

  const createUser = async ({
    email,
    password,
    firsName: displayName,
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
        console.error(error);
        setError('An error occurred while creating a user');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error if user creation fails
      } else {
        console.error(error);
        setError('An error occurred while creating a user');
      }
    }
  };

  return { user, error, login, createUser, logout };
};
