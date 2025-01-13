import { FC, useState } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { Img } from '@/ui/components/Img';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/components/ui/card.tsx';
import css from './Book.module.scss';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import { TBookStatus } from '@/data/books/enitites/book/types.ts';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { useReviewStore } from '@/stores/reviews/useReviewStore.tsx';
import { Ratings } from '@/ui/components/Ratings';
import { Editor } from '@/ui/components/Editor';
import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/components/ui/sheet';
import { PlusIcon } from '@radix-ui/react-icons';

function convertJSONToHTML(json: string): string {
  const editor = createEditor();
  editor.setEditorState(editor.parseEditorState(json));
  let htmlContent = '';
  editor.update(() => {
    htmlContent = $generateHtmlFromNodes(editor);
  });
  return htmlContent;
}

export const Book: FC = () => {
  const [addReviewMode, setAddReviewMode] = useState(false);
  const [reviewJSON, setReviewJSON] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

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
    setReviewJSON('');
    setReviewText('');
    setRating(0);
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
      review: reviewJSON,
      userId: profile.uid,
      rating,
    });

    resetReviewAdding();
  };

  const handleReviewChange = (json: string, text: string = '') => {
    setReviewJSON(json);
    setReviewText(text);
  };

  const title = book.title || 'Book';

  return (
    <PageWrapper title={title} className={css.pageWrapper}>
      <Sheet>
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
          <CardHeader className="flex-row justify-between items-center space-y-0">
            <CardTitle>{addReviewMode ? 'Add review' : 'Reviews'}</CardTitle>
            {addReviewMode ? (
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={resetReviewAdding}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveReview}
                  disabled={!reviewText && !rating}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={toggleAddReviewMode}>
                Add review
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {addReviewMode && (
              <div className="mb-6">
                <div className="mb-2 flex justify-end">
                  Rating: <Ratings rating={rating} onChange={setRating} />
                </div>
                <Editor onChange={handleReviewChange} />
              </div>
            )}
            {reviews?.length ? (
              reviews.map((review) => (
                <div key={review.id} className="mb-2">
                  <CardDescription
                    className={css.review}
                    dangerouslySetInnerHTML={{
                      __html: convertJSONToHTML(review.review),
                    }}
                  />
                  {review.rating ? (
                    <Ratings size="sm" rating={review.rating} />
                  ) : null}
                  <CardDescription>
                    {review.author?.displayName || 'Unknown author'}
                  </CardDescription>
                  <CardDescription>
                    {review.createdAt.toDate().toLocaleString()}
                  </CardDescription>
                </div>
              ))
            ) : (
              <div>
                <CardDescription>No reviews yet</CardDescription>
              </div>
            )}
          </CardContent>
        </Card>
        <SheetTrigger asChild>
          <Button className={css.addButton} variant="outline" size="icon">
            <PlusIcon />
            {/*<ChevronRight />*/}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </PageWrapper>
  );
};
