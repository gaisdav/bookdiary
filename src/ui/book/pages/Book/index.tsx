import { ChangeEvent, FC, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { Img } from '@/components/Img';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card.tsx';
import css from './Book.module.scss';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TBookStatus } from '@/data/books/enitites/book/types.ts';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/ui/textarea';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';

export const Book: FC = () => {
  const [addReviewMode, setAddReviewMode] = useState(false);
  const [review, setReview] = useState('');

  const addReview = useReviewStore().addReview;
  const reviews = useReviewStore().reviews;
  const profile = useProfileStore().profile;
  const isPending = useBookStore().bookLoading;
  const book = useBookStore().book;
  const addBookToCollection = useBookStore().addToCollection;
  const removeFromCollection = useBookStore().removeFromCollection;

  if (isPending) {
    return <PageWrapper>Loading book...</PageWrapper>;
  }

  if (!book) {
    return <PageWrapper>No data</PageWrapper>;
  }

  const resetReviewAdding = () => {
    setAddReviewMode(false);
    setReview('');
  };

  const handleStatusChange = (status: string = '') => {
    if (!profile) {
      return;
    }

    if (status === 'reset') {
      removeFromCollection({
        userId: profile.uid,
        bookId: book.id,
      });
    } else {
      addBookToCollection({
        userId: profile.uid,
        bookId: book.id,
        status: status as TBookStatus,
      });
    }

    resetReviewAdding();
  };

  const toggleAddReviewMode = () => {
    setAddReviewMode((prev) => !prev);
  };

  const handleSaveReview = async () => {
    if (!profile) {
      return;
    }

    await addReview({
      bookId: book.id,
      review,
      userId: profile.uid,
      // TODO add rating
      rating: 5,
    });

    resetReviewAdding();
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const title = book.title || 'Book';

  return (
    <PageWrapper title={title} className={css.pageWrapper}>
      <Card>
        <CardContent>
          <div className={css.mainInfo}>
            {book.cover && (
              <Img
                className={css.cover}
                loading="lazy"
                src={book.cover}
                alt={`${book.title} ${book.authors.join(', ')}`}
              />
            )}
            <div className={css.titles}>
              {book.title && <CardTitle>{book.title}</CardTitle>}
              {book.subtitle && (
                <CardDescription>{book.subtitle}</CardDescription>
              )}
              {book.authors && (
                <CardDescription>{book.authors}</CardDescription>
              )}
              {book.categories && (
                <CardDescription>{book.categories}</CardDescription>
              )}
              {book.publishedDate && (
                <CardDescription>{book.publishedDate}</CardDescription>
              )}
            </div>
          </div>
          {book.description && (
            <CardDescription>{book.description}</CardDescription>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <Select
              onValueChange={handleStatusChange}
              defaultValue={book?.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="want-to-read">Want to read</SelectItem>
                <SelectItem value="reset">Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {book?.status === 'read' && (
            <div className="mt-4">
              {!addReviewMode ? (
                <Button onClick={toggleAddReviewMode}>Add review</Button>
              ) : (
                <div>
                  <Textarea
                    onChange={handleReviewChange}
                    value={review}
                    placeholder="Type your review here."
                    maxLength={1000}
                    rows={4}
                  />
                  <div className="flex justify-end mt-2 gap-2">
                    <Button onClick={toggleAddReviewMode} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveReview}>Save</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      {reviews && (
        <Card>
          <CardContent>
            {reviews.length ? (
              reviews.map((review) => (
                <div key={review.id}>
                  <CardTitle>{review.review}</CardTitle>
                </div>
              ))
            ) : (
              <div>
                <CardTitle>No reviews yet</CardTitle>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  );
};
