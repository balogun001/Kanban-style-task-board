import React from 'react';
import {
  PhoneInput as ReactPhoneInput,
  PhoneInputProps as Props,
} from 'react-international-phone';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';

const inputStyles = cva(
  'flex-1 appearance-none text-brand-textBlack rounded-md border font-normal leading-loose focus:border px-3 sm:text-sm  focus:outline-none',
  {
    defaultVariants: {
      intent: 'normal',
      size: 'md',
    },
    variants: {
      intent: {
        fill: '!bg-gray-100  !border-gray-200 focus:!border-brand-textInput',
        normal:
          '!border-gray-300  placeholder:!text-gray-200  focus:!border-brand-textInput !bg-transparent',
      },
      size: {
        lg: 'h-16',
        md: '!h-12',
        sm: 'h-9',
      },
    },
  },
);

export type PhoneInputProps = VariantProps<typeof inputStyles> &
  Props & {
    label?: string;

    error?: string;
  };

export const PhoneInput = ({
  error,
  intent,
  size,
  label,
  defaultCountry = 'ng',
  value = '',
  ...props
}: PhoneInputProps) => {
  const className = classNames(inputStyles({ intent, size }), {
    '!border-red-500': !!error,
  });
  return (
    <label className="block">
      {label && (
        <p className="text-brand-textBlack mb-2 block text-sm font-medium leading-6">
          {label}
        </p>
      )}
      <ReactPhoneInput
        {...props}
        className="focus-within:!border-brand-textInput group !flex  !w-full"
        countrySelectorStyleProps={{
          buttonClassName: classNames(
            '!h-full group-focus-within:!border-brand-textInput !px-1 !bg-gray-200 !border',
            { '!border-red-500': !!error },
          ),
          dropdownArrowClassName: '!hidden',
        }}
        defaultCountry={defaultCountry}
        inputClassName={className}
        value={value}
      />
      {error && (
        <p className="mt-2 flex items-center gap-x-1 text-sm text-rose-500">
          <ExclamationTriangleIcon className="h-4 w-4" />
          {error}
        </p>
      )}
    </label>
  );
};
