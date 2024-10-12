import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout.tsx';
import Library from '../pages/Library.tsx';
import Profile from '../pages/Profile.tsx';
import Login from '../pages/Login/Login.tsx';
import Registration from '../pages/Registration/Registration.tsx';

export enum ROUTE {
  HOME = '/',
  LIBRARY = '/library',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTRATION = '/registration',
}

const createRouter =
  import.meta.env.BOOK_CUSTOM_MODE === 'gh-pages'
    ? createHashRouter
    : createBrowserRouter;

export const router = createRouter([
  {
    path: ROUTE.HOME,
    Component: Layout,
    children: [
      {
        path: ROUTE.HOME,
        element: <h1>Top book</h1>,
      },
      {
        path: ROUTE.LIBRARY,
        element: <Library />,
      },
      {
        path: ROUTE.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTE.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTE.REGISTRATION,
        element: <Registration />,
      },
    ],
  },
]);
