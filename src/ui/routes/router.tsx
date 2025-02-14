import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
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
import MyDiary from '@/ui/pages/diary';
import { useReviewStore } from '@/data/reviews/store/useReviewStore.tsx';
import { MyReviews } from '@/ui/pages/reviews';
import { Books } from '@/ui/pages/books';
import { Settings } from '@/ui/pages/settings';
import { ForgotPassword } from '@/ui/pages/forgotPassword';
import { UpdatePassword } from '@/ui/pages/updatePassword';

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
      path: ROUTE.HOME.ROOT,
      Component: Layout,
      shouldRevalidate: () => false,
      children: [
        {
          path: ROUTE.HOME.ROOT,
          element: <Home />,
          loader: () => (!profile ? redirect(ROUTE.AUTH.LOGIN) : null),
        },

        // Книги (поиск + страница книги)
        {
          path: ROUTE.SEARCH.ROOT,
          element: <Outlet />,

          children: [
            {
              path: ROUTE.SEARCH.ROOT,
              element: <Search />,
              loader: ({ request }) => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);
                const query = new URL(request.url).searchParams.get('query');
                if (query) fetchFirstList({ query });
                return null;
              },
            },
            {
              path: ROUTE.SEARCH.BOOK,
              element: <Book parentRoute={ROUTE.SEARCH.ROOT} />,
              loader: async ({ params }) => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);
                if (params.bookId) {
                  getBookReviews(params.bookId);
                  fetchBook({ userId: profile.id, bookId: params.bookId });
                }
                return null;
              },
            },
          ],
        },

        // Дневник
        {
          path: ROUTE.DIARY.ROOT,
          element: <MyDiary />,
          loader: () => (!profile ? redirect(ROUTE.AUTH.LOGIN) : null),
        },

        // Профиль и настройки
        {
          path: ROUTE.PROFILE.ROOT,
          element: <Outlet />,
          children: [
            {
              path: ROUTE.PROFILE.ROOT,
              element: <Profile />,
              loader: () => (!profile ? redirect(ROUTE.AUTH.LOGIN) : null),
            },
            {
              path: ROUTE.PROFILE.SETTINGS,
              element: <Settings />,
              loader: () => (!profile ? redirect(ROUTE.AUTH.LOGIN) : null),
            },
          ],
        },

        // Рецензии
        {
          path: ROUTE.REVIEWS.ROOT,
          element: <MyReviews />,
          loader: async () => {
            if (!profile) return redirect(ROUTE.AUTH.LOGIN);
            getUserReviews(profile.id);
            return null;
          },
        },
        {
          path: ROUTE.REVIEWS.BOOK,
          element: <Book />,
          loader: async ({ params }) => {
            if (!profile) return redirect(ROUTE.AUTH.LOGIN);
            if (params.bookId) {
              getBookReviews(params.bookId);
              fetchBook({ userId: profile.id, bookId: params.bookId });
            }
            return null;
          },
        },

        // Моя библиотека
        {
          path: ROUTE.MY_LIBRARY.MY_BOOKS.ROOT,
          element: <Outlet />,
          children: [
            {
              path: ROUTE.MY_LIBRARY.MY_BOOKS.ROOT,
              element: <Books type="my-books" />,
              loader: async () => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);
                fetchBooksByStatuses({ userId: profile.id, statuses: [1, 2] });
                return null;
              },
            },
            {
              path: ROUTE.MY_LIBRARY.MY_BOOKS.BOOK,
              element: <Book parentRoute={ROUTE.MY_LIBRARY.MY_BOOKS.ROOT} />,
              loader: async ({ params }) => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);

                if (params.bookId) {
                  fetchBook({ userId: profile.id, bookId: params.bookId });
                }

                return null;
              },
            },
          ],
        },

        {
          path: ROUTE.MY_LIBRARY.FAVORITES.ROOT,
          element: <Outlet />,
          children: [
            {
              path: ROUTE.MY_LIBRARY.FAVORITES.ROOT,
              element: <Books type="favorites" />,
              loader: async () => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);
                if (favoriteBooks.size === 0) {
                  getFavoriteBooks(profile.id);
                }
                return null;
              },
            },
            {
              path: ROUTE.MY_LIBRARY.FAVORITES.BOOK,
              element: <Book parentRoute={ROUTE.MY_LIBRARY.FAVORITES.ROOT} />,
              loader: async ({ params }) => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);

                if (params.bookId) {
                  fetchBook({ userId: profile.id, bookId: params.bookId });
                }

                return null;
              },
            },
          ],
        },

        {
          path: ROUTE.MY_LIBRARY.WANT_TO_READ.ROOT,
          element: <Outlet />,
          children: [
            {
              path: ROUTE.MY_LIBRARY.WANT_TO_READ.ROOT,
              element: <Books type="want-to-read" />,
              loader: async () => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);
                if (favoriteBooks.size === 0) {
                  fetchBooksByStatuses({
                    userId: profile.id,
                    statuses: [3],
                  });
                }
                return null;
              },
            },
            {
              path: ROUTE.MY_LIBRARY.WANT_TO_READ.BOOK,
              element: (
                <Book parentRoute={ROUTE.MY_LIBRARY.WANT_TO_READ.ROOT} />
              ),
              loader: async ({ params }) => {
                if (!profile) return redirect(ROUTE.AUTH.LOGIN);

                if (params.bookId) {
                  fetchBook({ userId: profile.id, bookId: params.bookId });
                }

                return null;
              },
            },
          ],
        },

        // Авторизация
        {
          path: ROUTE.AUTH.LOGIN,
          element: <Login />,
          loader: () => (profile ? redirect(ROUTE.HOME.ROOT) : null),
        },
        {
          path: ROUTE.AUTH.REGISTRATION,
          element: <Registration />,
          loader: () => (profile ? redirect(ROUTE.HOME.ROOT) : null),
        },
        {
          path: ROUTE.AUTH.FORGOT_PASSWORD,
          element: <ForgotPassword />,
          loader: () => (profile ? redirect(ROUTE.HOME.ROOT) : null),
        },
        {
          path: ROUTE.AUTH.UPDATE_PASSWORD,
          element: <UpdatePassword />,
          loader: () => (profile ? redirect(ROUTE.HOME.ROOT) : null),
        },
      ],
    },
  ]);
