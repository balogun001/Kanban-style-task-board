'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const pillStyle = cva(
  'rounded-full px-3 py-1 flex justify-center items-center  text-xs font-medium  disabled:opacity-70',
  {
    defaultVariants: {
      kinds: 'primary',
    },
    variants: {
      kinds: {
        error: 'text-brand-red-700 bg-brand-red-50',
        primary:
          'bg-[#E3EFFC] bg-opacity-50 text-brand-blue  hover:bg-opacity-80 ',
        secondary: 'text-yellow-700 bg-yellow-50',
        success: 'text-brand-green-700 bg-brand-green-50',
      },
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof pillStyle> & {
    children: ReactNode;
  };

export function Pill({ className, children, kinds, ...props }: ButtonProps) {
  return (
    <button className={pillStyle({ className, kinds })} {...props}>
      {children}
    </button>
  );
}
