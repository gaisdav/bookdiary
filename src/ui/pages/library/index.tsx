import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { ROUTE } from '@/ui/routes/routes.ts';
import { Link } from 'react-router-dom';

const MyLibraryLinks = [
  {
    label: 'Diary',
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
    <PageWrapper showSearch title="My Diary">
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
