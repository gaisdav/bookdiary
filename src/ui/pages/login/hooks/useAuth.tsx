import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase.config.ts';
import { useState } from 'react';

export const useAuthController = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // New error state

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error if user creation fails
      } else {
        console.error(error);
        setError('An error occurred while creating a user');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error if user creation fails
      } else {
        console.error(error);
        setError('An error occurred while creating a user');
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, login, logout, loading };
};
