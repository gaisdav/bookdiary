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
import { TUser } from '@/data/user/enitites/user';
import Library from '@/ui/pages/library';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';
import { MyReviews } from '@/ui/pages/reviews';
import { Books } from '@/ui/pages/books';
import { Settings } from '@/ui/pages/settings';
import { ForgotPassword } from '@/ui/pages/forgotPassword';

const {
  fetchFirstList,
  fetchBook,
  fetchUserCollection,
  fetchUserBooksByStatus,
} = useBookStore.getState();

const { getBookReviews, getUserReviews } = useReviewStore.getState();

const createRouter =
  import.meta.env.BOOK_CUSTOM_MODE === 'gh-pages'
    ? createHashRouter
    : createBrowserRouter;

export const initRouter = (profile: TUser | null) => {
  return createRouter([
    {
      path: ROUTE.HOME,
      Component: Layout,
      children: [
        {
          path: ROUTE.HOME,
          element: <Home />,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            return null;
          },
        },
        {
          path: ROUTE.BOOKS,
          loader: ({ request }) => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

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
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            const bookId = params.bookId;

            if (bookId) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.LIBRARY,
          element: <Library />,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            fetchUserCollection(profile.uid);
            return null;
          },
        },
        {
          path: ROUTE.PROFILE,
          element: <Profile />,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            return null;
          },
        },
        {
          path: ROUTE.SETTINGS,
          element: <Settings />,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            return null;
          },
        },
        {
          path: ROUTE.REVIEWS,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            getUserReviews(profile.uid);

            return null;
          },
          element: <MyReviews />,
        },
        {
          path: ROUTE.REVIEWS_BOOK,
          element: <Book />,
          loader: async ({ params }) => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            const bookId = params.bookId;

            if (bookId) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.LIBRARY_READ,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            fetchUserBooksByStatus(profile.uid, 'read');

            return null;
          },
          element: <Books type="read" />,
        },
        {
          path: ROUTE.LIBRARY_READ_BOOK,
          element: <Book />,
          loader: async ({ params }) => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            const bookId = params.bookId;

            if (bookId) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.LIBRARY_READING,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            fetchUserBooksByStatus(profile.uid, 'reading');

            return null;
          },
          element: <Books type="reading" />,
        },
        {
          path: ROUTE.LIBRARY_READING_BOOK,
          element: <Book />,
          loader: async ({ params }) => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            const bookId = params.bookId;

            if (bookId) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.LIBRARY_WANT_TO_READ,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            fetchUserBooksByStatus(profile.uid, 'want-to-read');

            return null;
          },
          element: <Books type="want-to-read" />,
        },
        {
          path: ROUTE.LIBRARY_WANT_TO_READ_BOOK,
          element: <Book />,
          loader: async ({ params }) => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            const bookId = params.bookId;

            if (bookId) {
              getBookReviews(bookId);
              fetchBook({ userId: profile.uid, bookId });
            }

            return null;
          },
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
        {
          path: ROUTE.FORGOT_PASSWORD,
          element: <ForgotPassword />,
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
