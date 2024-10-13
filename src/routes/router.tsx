import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
} from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import Search from '../pages/Search/Search.tsx';
import Profile from '../pages/Profile.tsx';
import Login from '../pages/Login/Login.tsx';
import Registration from '../pages/Registration/Registration.tsx';
import { Book } from '@/pages/Book';

export enum ROUTE {
  HOME = '/',
  BOOKS = 'books',
  BOOK = 'books/:bookId',
  PROFILE = 'profile',
  LOGIN = 'login',
  REGISTRATION = 'registration',
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
