import { onAuthStateChanged } from 'firebase/auth';
import { ROUTE } from '../routes/router.tsx';
import { auth } from '../firebase.config.ts';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuthController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else if (location.pathname !== ROUTE.LOGIN) {
        setUser(null);
        navigate(ROUTE.LOGIN);
      }
    });
  }, [location.pathname, navigate]);

  return { user };
};
