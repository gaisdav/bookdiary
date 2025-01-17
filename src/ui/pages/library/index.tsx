import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { ROUTE } from '@/routes/routes.ts';
import { Link } from 'react-router-dom';

const MyLibraryLinks = [
  {
    label: 'Books',
    url: ROUTE.LIBRARY_READ,
  },
  {
    label: 'Reading',
    url: ROUTE.LIBRARY_READING,
  },
  {
    label: 'To-read',
    url: ROUTE.LIBRARY_WANT_TO_READ,
  },
  {
    label: 'Diary',
    url: ROUTE.REVIEWS,
  },
  {
    label: 'Favorites',
    url: ROUTE.REVIEWS,
  },
  {
    label: 'Reviews',
    url: ROUTE.REVIEWS,
  },
  {
    label: 'Lists',
    url: ROUTE.REVIEWS,
  },
];

const Library: FC = () => {
  return (
    <PageWrapper showSearch title="My library">
      <div>My library</div>

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

export default Library;
