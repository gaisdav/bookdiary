import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { ROUTE } from '@/ui/routes/routes.ts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
  const { t } = useTranslation();

  const myLibraryLinks = [
    {
      label: t('my-library.my-books'),
      url: ROUTE.MY_LIBRARY.MY_BOOKS.ROOT,
    },
    {
      label: t('my-library.favorites'),
      url: ROUTE.MY_LIBRARY.FAVORITES.ROOT,
    },
    {
      label: t('my-library.want-to-read'),
      url: ROUTE.MY_LIBRARY.WANT_TO_READ.ROOT,
    },
  ];

  return (
    <PageWrapper title={t('my-library.title')}>
      <div className="mt-3">
        {myLibraryLinks.map((link) => {
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
