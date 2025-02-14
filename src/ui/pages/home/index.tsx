import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { ROUTE } from '@/ui/routes/routes.ts';
import { Link } from 'react-router-dom';

const MyLibraryLinks = [
  {
    label: 'My books',
    url: ROUTE.MY_LIBRARY.MY_BOOKS.ROOT,
  },
  {
    label: 'Favorites',
    url: ROUTE.MY_LIBRARY.FAVORITES.ROOT,
  },
  {
    label: 'Want to read',
    url: ROUTE.MY_LIBRARY.WANT_TO_READ.ROOT,
  },
];

const Home: FC = () => {
  return (
    <PageWrapper title="My library">
      <div className="mt-3">
        {MyLibraryLinks.map((link) => {
          return (
            <div key={link.label}>
              <Link to={link.url}>{link.label}</Link>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default Home;
