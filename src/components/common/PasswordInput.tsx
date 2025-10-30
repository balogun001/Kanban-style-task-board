'use client';

import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';

const inputStyles = cva(
  'w-full appearance-none rounded-md focus:ring-0 font-normal leading-loose px-3 text-sm',
  {
    defaultVariants: {
      error: false,
      intent: 'normal',
      size: 'md',
    },
    variants: {
      error: {
        true: '!border-rose-500',
      },
      intent: {
        fill: 'bg-gray-100 border-gray-200 focus:border-brand-textInput',
        normal:
          'border-gray-300 border focus:outline-none placeholder:text-gray-200  focus:border-brand-orange-800 bg-transparent',
      },
      size: {
        lg: 'h-16',
        md: 'h-12',
        sm: 'h-10',
      },
    },
  },
);

export type InputProps = Omit<VariantProps<typeof inputStyles>, 'error'> & {
  label?: string;
  loading?: boolean;
  error?: string;
  leftIcon?: ReactNode;
  addon?: boolean;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size' | 'type'
  >;

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, intent, size, addon, className, leftIcon, ...rest },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <label className={classNames('group block', className)}>
        {label && (
          <p className="text-brand-textBlack mb-2 block text-sm font-medium leading-6">
            {label}
          </p>
        )}
        <div className="relative rounded-md">
          {leftIcon && (
            <div className="text-brand-textBlack pointer-events-none absolute inset-y-0 left-0 flex   items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            className={classNames(
              inputStyles({ error: !!error, intent, size }),
              {
                'pl-8': leftIcon,
              },
            )}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            {...rest}
          />

          <button
            className="text-brand-textBlack absolute inset-y-0  right-0 z-20 flex items-center justify-center rounded px-4 text-sm font-medium leading-6 hover:opacity-70"
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-x-1 text-sm text-rose-500">
            <ExclamationTriangleIcon className="h-4 w-4" />
            {error}
          </p>
        )}

        {addon && (
          <div className="mt-2  hidden space-y-2 transition-all duration-100 group-focus-within:block">
            <span className="block text-sm font-semibold text-black">
              Password requirement
            </span>
            <ul className="text-brand-textBlack list-disc space-y-1 px-4 text-sm">
              <li>Must have at least 1 lowercase letter</li>
              <li>Must have at least 1 uppercase letter</li>
              <li>Must have at least 1 number</li>
              <li>Must have at least 1 special character</li>
              <li>Must have 6 characters minimum</li>
            </ul>
          </div>
        )}
      </label>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
