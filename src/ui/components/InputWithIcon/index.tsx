import { Input, InputProps } from '@/ui/components/ui/input.tsx';
import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

export interface IInputWithIcon extends InputProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const InputWithIcon: FC<IInputWithIcon> = ({
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  return (
    <div className="w-full relative">
      {startIcon && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          {startIcon}
        </div>
      )}

      <Input className={cn('pr-8', className)} {...props} />

      {endIcon && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {endIcon}
        </div>
      )}
    </div>
  );
};
