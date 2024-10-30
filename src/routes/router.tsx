import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import Search from '@/modules/book/pages/Search/Search.tsx';
import Profile from '@/modules/profile/Profile.tsx';
import Login from '@/modules/login/Login.tsx';
import Registration from '@/modules/registration/Registration.tsx';
import { Book } from '@/modules/book/pages/Book';
import Home from '@/modules/home';

export enum ROUTE {
  HOME = '/',
  BOOKS = '/books',
  BOOK = '/books/:bookId',
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
        element: <Home />,
      },
      {
        path: ROUTE.BOOKS,
        element: <Search />,
      },
      {
        path: ROUTE.BOOK,
        element: <Book />,
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
