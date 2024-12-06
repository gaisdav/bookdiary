import {
  createBrowserRouter,
  createHashRouter,
  redirect,
} from 'react-router-dom';
import { Layout } from '@/ui/components/Layout/Layout.tsx';
import Search from '@/ui/pages/book/pages/Search/Search.tsx';
import Profile from '@/ui/pages/profile/Profile.tsx';
import Login from '@/ui/pages/login/Login.tsx';
import Registration from '@/ui/pages/registration/Registration.tsx';
import { Book } from '@/ui/pages/book/pages/book';
import Home from '@/ui/pages/home';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { ROUTE } from '@/routes/routes.ts';
import { IUser } from '@/data/user/enitites/user';
import Collection from '@/ui/pages/collection';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';
import { MyReviews } from '@/ui/pages/myReviews';

const { fetchFirstList, fetchBook, fetchUserCollection } =
  useBookStore.getState();

const { getBookReviews, getUserReviews } = useReviewStore.getState();

const createRouter =
  import.meta.env.BOOK_CUSTOM_MODE === 'gh-pages'
    ? createHashRouter
    : createBrowserRouter;

const checkAuth = (profile: IUser | null) => {
  if (!profile) {
    return redirect(ROUTE.LOGIN);
  }
};

export const initRouter = (profile: IUser | null) => {
  return createRouter([
    {
      path: ROUTE.HOME,
      Component: Layout,
      children: [
        {
          path: ROUTE.HOME,
          element: <Home />,
          loader: async () => {
            checkAuth(profile);

            return null;
          },
        },
        {
          path: ROUTE.BOOKS,
          loader: ({ request }) => {
            checkAuth(profile);

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
            checkAuth(profile);

            const bookId = params.bookId;

            if (bookId && profile) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.COLLECTION,
          element: <Collection />,
          loader: async () => {
            checkAuth(profile);

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
            checkAuth(profile);

            const bookId = params.bookId;

            if (bookId && profile) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.PROFILE,
          element: <Profile />,
          loader: async () => {
            checkAuth(profile);

            return null;
          },
        },
        {
          path: ROUTE.MY_REVIEWS,
          loader: async () => {
            checkAuth(profile);

            if (profile) {
              getUserReviews(profile.uid);
            }

            return null;
          },
          element: <MyReviews />,
        },
        {
          path: ROUTE.LOGIN,
          element: <Login />,
          loader: async () => {
            if (profile) {
              return redirect(ROUTE.HOME);
            }

            return null;
          },
        },
        {
          path: ROUTE.REGISTRATION,
          element: <Registration />,
          loader: async () => {
            if (profile) {
              return redirect(ROUTE.HOME);
            }

            return null;
          },
        },
      ],
    },
  ]);
};
