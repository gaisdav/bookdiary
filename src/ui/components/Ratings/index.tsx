import { FC } from 'react';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils.ts';

interface IRatingsProps {
  rating: number;
  onChange?: (rating: number) => void;
}

export const Ratings: FC<IRatingsProps> = ({ rating, onChange }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => onChange?.(rating === star ? star - 1 : star)} // Сбрасываем рейтинг, если кликнули на уже выбранную звезду
        className={cn(
          'p-0.5 rounded-full bg-transparent border border-transparent',
          {
            'pointer-events-none': !onChange,
          },
        )}
      >
        <StarFilledIcon
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        />
      </button>
    ))}
  </div>
);
