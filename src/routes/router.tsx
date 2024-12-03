import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import Search from '@/ui/book/pages/Search/Search.tsx';
import Profile from '@/ui/profile/Profile.tsx';
import Login from '@/ui/login/Login.tsx';
import Registration from '@/ui/registration/Registration.tsx';
import { Book } from '@/ui/book/pages/Book';
import Home from '@/ui/home';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { ROUTE } from '@/routes/routes.ts';

const { fetchFirstList, fetchBook } = useBookStore.getState();

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
        loader: ({ request }) => {
          const query = new URL(request.url).searchParams.get('query');
          if (query) {
            fetchFirstList({ query });
          }

          return null;
        },
        element: <Search />,
      },
      {
        path: ROUTE.BOOK,
        element: <Book />,
        loader: async ({ params }) => {
          const bookId = params.bookId;
          if (bookId) {
            fetchBook({ bookId });
          }

          return null;
        },
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
