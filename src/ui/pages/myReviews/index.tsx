import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { H4 } from '@/ui/components/ui/typography.tsx';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';
import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { Ratings } from '@/ui/components/Ratings';
import {
  Card,
  CardContent,
  CardDescription,
} from '@/ui/components/ui/card.tsx';

//TODO: move to separate file
function convertJSONToHTML(json: string): string {
  const editor = createEditor();
  editor.setEditorState(editor.parseEditorState(json));
  let htmlContent = '';
  editor.update(() => {
    htmlContent = $generateHtmlFromNodes(editor);
  });
  return htmlContent;
}

export const MyReviews: FC = () => {
  const reviews = useReviewStore().reviews;

  return (
    <PageWrapper title="My reviews">
      <H4 className="mb-2">My reviews</H4>
      <div>
        {reviews?.map((review) => (
          <Card key={review.id}>
            <CardContent>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
};
