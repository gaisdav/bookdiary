import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import Library from '../pages/Library.tsx';
import { Layout } from '../components/Layout/Layout.tsx';
import { Profile } from '../pages/Profile.tsx';

export enum ROUTE {
  HOME = '/',
  LIBRARY = 'library',
  PROFILE = 'profile',
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
    ],
  },
]);
