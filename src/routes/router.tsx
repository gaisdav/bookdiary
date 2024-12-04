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
import { IUser } from '@/data/user/enitites/user';
import Collection from '@/ui/collection';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';

const { fetchFirstList, fetchBook, fetchUserCollection } =
  useBookStore.getState();

const { getReviews } = useReviewStore.getState();

const createRouter =
  import.meta.env.BOOK_CUSTOM_MODE === 'gh-pages'
    ? createHashRouter
    : createBrowserRouter;

export const initRouter = (profile: IUser) => {
  return createRouter([
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

            if (bookId && profile) {
              getReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.COLLECTION,
          element: <Collection />,
          loader: async () => {
            if (profile) {
              fetchUserCollection(profile.uid);
            }

            return null;
          },
        },
        {
          path: ROUTE.COLLECTION_BOOK,
          element: <Book />,
          loader: async ({ params }) => {
            const bookId = params.bookId;

            if (bookId && profile) {
              getReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
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
};
