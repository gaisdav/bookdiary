import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout.tsx';
import { lazy, Suspense } from 'react';

const Library = lazy(() => import('../pages/Library.tsx'));
const Profile = lazy(() => import('../pages/Profile.tsx'));
const Login = lazy(() => import('../pages/Login/Login.tsx'));
const Registration = lazy(
  () => import('../pages/Registration/Registration.tsx'),
);

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
        element: (
          <Suspense fallback={<>Library Loading</>}>
            <Library />
          </Suspense>
        ),
      },
      {
        path: ROUTE.PROFILE,
        element: (
          <Suspense fallback={<>Profile Loading</>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: ROUTE.LOGIN,
        element: (
          <Suspense fallback={<>Login Loading</>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: ROUTE.REGISTRATION,
        element: (
          <Suspense fallback={<>Registration Loading</>}>
            <Registration />
          </Suspense>
        ),
      },
    ],
  },
]);
