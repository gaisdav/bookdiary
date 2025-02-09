import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { ROUTE } from '@/ui/routes/routes.ts';
import { Link } from 'react-router-dom';

const MyLibraryLinks = [
  {
    label: 'My books',
    url: ROUTE.MY_BOOKS,
  },
  {
    label: 'Favorites',
    url: ROUTE.FAVORITES,
  },
  {
    label: 'Want to read',
    url: ROUTE.WANT_TO_READ,
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
