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
import { useBookStore } from '@/data/books/store/useBookStore.tsx';
import { ROUTE } from '@/ui/routes/routes.ts';
import { TUser } from '@/data/user/enitites/user';
import Library from '@/ui/pages/library';
import { useReviewStore } from '@/data/reviews/store/useReviewStore.tsx';
import { MyReviews } from '@/ui/pages/reviews';
import { Books } from '@/ui/pages/books';
import { Settings } from '@/ui/pages/settings';
import { ForgotPassword } from '@/ui/pages/forgotPassword';

const {
  fetchFirstList,
  fetchBook,
  getFavoriteBooks,
  favoriteBooks,
  fetchBooksByStatuses,
} = useBookStore.getState();

const { getBookReviews, getUserReviews } = useReviewStore.getState();

const createRouter =
  import.meta.env.BOOK_CUSTOM_MODE === 'gh-pages'
    ? createHashRouter
    : createBrowserRouter;

export const initRouter = (profile: TUser | null) =>
  createRouter([
    {
      path: ROUTE.HOME,
      Component: Layout,
      shouldRevalidate: () => false,
      children: [
        {
          path: ROUTE.HOME,
          shouldRevalidate: () => false,
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
              fetchBook({ userId: profile.id, bookId });
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

            getUserReviews(profile.id);

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
              fetchBook({ userId: profile.id, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.MY_BOOKS,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            fetchBooksByStatuses({
              userId: profile.id,
              statuses: [1, 2],
            });

            return null;
          },
          element: <Books type="my-books" />,
        },
        {
          path: ROUTE.FAVORITES,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            if (favoriteBooks.size !== 0) {
              return null;
            }

            getFavoriteBooks(profile.id);

            return null;
          },
          element: <Books type="favorites" />,
        },
        {
          path: ROUTE.WANT_TO_READ,
          loader: async () => {
            if (!profile) {
              return redirect(ROUTE.LOGIN);
            }

            fetchBooksByStatuses({
              userId: profile.id,
              statuses: [3],
            });

            return null;
          },
          element: <Books type="want-to-read" />,
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
              fetchBook({ userId: profile.id, bookId });
            }

            return null;
          },
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
              fetchBook({ userId: profile.id, bookId });
            }

            return null;
          },
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
              fetchBook({ userId: profile.id, bookId });
            }

            return null;
          },
        },
        {
          path: ROUTE.LOGIN,
          element: <Login />,
          index: true,
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
