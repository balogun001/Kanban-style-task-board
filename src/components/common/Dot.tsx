import React, { DetailedHTMLProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const dotStyle = cva('absolute z-10 rounded-full aspect-square', {
  defaultVariants: {
    kinds: 'success',
    position: 'top-right',
    size: 'sm',
  },
  variants: {
    kinds: {
      danger: 'bg-brand-red-500',
      primary: 'bg-brand-blue',
      success: 'bg-brand-green-500',
    },
    position: {
      'bottom-right': 'bottom-1 right-0',
      'top-right': 'right-0 top-1',
    },
    size: {
      lg: 'h-4',
      md: 'h-3',
      sm: 'h-2 ',
    },
  },
});

type Props = VariantProps<typeof dotStyle> &
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Dot = ({ className, kinds, size, position, ...rest }: Props) => {
  return (
    <div className={dotStyle({ className, kinds, position, size })} {...rest} />
  );
};
