import { JSX, useState } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useBookStore } from '@/stores/books/store/useBookStore.tsx';
import { Img } from '@/ui/components/Img';
import css from './Book.module.scss';
import { useProfileStore } from '@/stores/profile/useProfileStore.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { useReviewStore } from '@/stores/reviews/store/useReviewStore.tsx';
import { Ratings } from '@/ui/components/Ratings';
import { Editor } from '@/ui/components/Editor';
import {
  PlusIcon,
  BookOpenCheckIcon,
  BookOpenTextIcon,
  BookOpenIcon,
  BookHeartIcon,
  BookPlusIcon,
  CalendarIcon,
} from 'lucide-react';
import { Toggle } from '@/ui/components/ui/toggle.tsx';
import { ExtraSmall, H4, P, Small } from '@/ui/components/ui/typography.tsx';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/ui/components/ui/toggle-group.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/ui/components/ui/calendar.tsx';
import { SelectSingleEventHandler } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/components/ui/drawer';
import { convertJSONToHTML } from '@/lib/utils.ts';

export const Book = (): JSX.Element => {
  const [reviewJSON, setReviewJSON] = useState('');
  // const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [showLists, setShowLists] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const addReview = useReviewStore().addReview;
  const reviews = useReviewStore().reviews;
  const profile = useProfileStore().profile;
  const isPending = useBookStore().bookLoading;
  const book = useBookStore().book;
  // const addBookToCollection = useBookStore().addToCollection;
  // const removeFromCollection = useBookStore().removeFromCollection;

  if (isPending) {
    return <PageWrapper title="Loading book...">Loading book...</PageWrapper>;
  }

  if (!book) {
    return <PageWrapper>No data</PageWrapper>;
  }

  const resetReviewAdding = () => {
    setReviewJSON('');
    // setReviewText('');
    setRating(0);
  };

  // const handleStatusChange = (status: string = '') => {
  //   if (!profile) {
  //     return;
  //   }
  //
  //   if (status === 'reset') {
  //     removeFromCollection({
  //       userId: profile.id,
  //       bookId: book.id,
  //     });
  //   } else {
  //     addBookToCollection({
  //       userId: profile.id,
  //       bookId: book.id,
  //       status: status as TBookStatus,
  //     });
  //   }
  //
  //   resetReviewAdding();
  // };

  const handleSaveReview = async () => {
    if (!profile) {
      return;
    }

    await addReview({
      bookId: book.id,
      review: reviewJSON,
      userId: profile.id,
      rating,
    });

    resetReviewAdding();
  };

  const handleReviewChange = (
    json: string,
    // text: string = ''
  ) => {
    setReviewJSON(json);
    // setReviewText(text);
  };

  const handleDateChange: SelectSingleEventHandler = (date) => {
    if (!date) return;
    setDate(date);
  };

  const title = book.title || 'Book';

  return (
    <Drawer>
      <PageWrapper
        title={title}
        className={css.pageWrapper}
        showSearch
        showBack
      >
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
            {book.title && <b>{book.title}</b>}
            {book.subtitle && <Small>{book.subtitle}</Small>}
            {book.authors && <Small>{book.authors?.join(', ')}</Small>}
            {book.categories && <Small>{book.categories.join(', ')}</Small>}
            {book.publishedDate && <Small>{book.publishedDate}</Small>}
          </div>
        </div>
        {book.description && <P>{book.description}</P>}

        <div className="mt-6">
          <H4 className="mb-4">Reviews</H4>
          <div>
            {reviews?.length ? (
              reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-1 mb-4">
                  <Ratings size="sm" rating={review.rating} />

                  {review.review && (
                    <div
                      className={css.review}
                      dangerouslySetInnerHTML={{
                        __html: convertJSONToHTML(review.review),
                      }}
                    />
                  )}

                  <Small className="block">
                    {review.author?.fullName || 'Unknown author'}
                  </Small>
                  <ExtraSmall>
                    {review.createdAt.toDate().toLocaleString()}
                  </ExtraSmall>

                  <hr className="mt-4" />
                </div>
              ))
            ) : (
              <div>No reviews yet</div>
            )}
          </div>
        </div>

        <DrawerTrigger asChild>
          <Button className={css.addButton} variant="outline" size="icon">
            <PlusIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className="flex flex-col max-h-[95%] h-[90%]"
          aria-describedby="Add to diary"
        >
          <DrawerHeader className="p-3">
            <DrawerTitle>Add to diary</DrawerTitle>
            <DrawerDescription className="hidden">
              Add to diary
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col flex-1 overflow-auto px-4 gap-3">
            <div className="flex justify-between">
              <ToggleGroup type="single">
                <div className="flex flex-col items-center">
                  <ToggleGroupItem value="read" aria-label="Read">
                    <BookOpenCheckIcon />
                  </ToggleGroupItem>
                  <ExtraSmall>Read</ExtraSmall>
                </div>
                <div className="flex flex-col items-center">
                  <ToggleGroupItem value="reading" aria-label="Reading">
                    <BookOpenTextIcon />
                  </ToggleGroupItem>
                  <ExtraSmall>Reading</ExtraSmall>
                </div>
                <div className="flex flex-col items-center">
                  <ToggleGroupItem value="want-to-read" aria-label="Readlist">
                    <BookOpenIcon />
                  </ToggleGroupItem>
                  <ExtraSmall>Readlist</ExtraSmall>
                </div>
              </ToggleGroup>

              <div className="flex gap-2">
                <div className="flex flex-col items-center">
                  <Toggle aria-label="Like">
                    <BookHeartIcon />
                  </Toggle>
                  <ExtraSmall>Like</ExtraSmall>
                </div>
                <div className="flex flex-col items-center">
                  <Toggle
                    aria-label="Add to list"
                    pressed={showLists}
                    onPressedChange={setShowLists}
                  >
                    <BookPlusIcon />
                  </Toggle>
                  <ExtraSmall>Add to list</ExtraSmall>
                </div>
              </div>
            </div>
            {showLists && (
              <Select
              // onValueChange={handleStatusChange}
              // defaultValue={book?.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="want-to-read">Want to read</SelectItem>
                  <SelectItem value="reset">Reset</SelectItem>
                </SelectContent>
              </Select>
            )}
            <div className="flex flex-1 flex-col gap-1">
              <Ratings rating={rating} onChange={setRating} />

              <Editor
                onChange={handleReviewChange}
                autoFocus={false}
                containerClassName="flex-1"
              />
              <div className="flex justify-end">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="justify-start">
                      {format(date, 'PPP')}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button type="submit" onClick={handleSaveReview}>
                  Save changes
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </PageWrapper>
    </Drawer>
  );
};
