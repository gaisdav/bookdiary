import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { H4 } from '@/ui/components/ui/typography.tsx';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';
import { Ratings } from '@/ui/components/Ratings';
import {
  Card,
  CardContent,
  CardDescription,
} from '@/ui/components/ui/card.tsx';
import { Link } from 'react-router-dom';
import { convertJSONToHTML } from '@/lib/utils.ts';

export const MyReviews: FC = () => {
  const reviews = useReviewStore().reviews;

  return (
    <PageWrapper title="My reviews">
      <H4 className="mb-2">My reviews</H4>
      <div>
        {reviews?.map((review) => (
          <Card key={review.id}>
            <CardContent>
              <Link to={review.bookId}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertJSONToHTML(review.review),
                  }}
                />
                {Boolean(review.rating) && (
                  <Ratings rating={review.rating} size="sm" />
                )}
                <CardDescription>
                  {review.createdAt.toDate().toLocaleString()}
                </CardDescription>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
};
