'use client';
import React, { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { cva, VariantProps } from 'class-variance-authority';

const buttonStyle = cva(
  'rounded-lg  font-medium py-3 flex gap-2 border text-left w-full text-sm disabled:opacity-70',
  {
    defaultVariants: {
      block: true,
      error: false,
      intent: 'normal',
      size: 'md',
    },
    variants: {
      block: { true: '!w-full' },
      error: {
        true: '!border-rose-500',
      },

      intent: {
        fill: '!bg-gray-100 !border-gray-200 focus:border-brand-textInput',
        normal: '!border-gray-300  focus:border-brand-textInput bg-transparent',
      },
      size: {
        lg: 'px-3.5 py-2.5',
        md: 'px-4 py-2',
        sm: 'px-2.5 py-1',
      },
    },
  }
);

type Props = Omit<VariantProps<typeof buttonStyle>, 'error'> & {
  className?: string;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  onChange: (startDate: Date, endDate: Date) => void;
  label?: string;
  error?: string;
};

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> &
  Props;

export function DateRangePicker({
  className,
  size,
  intent,
  block,
  onChange,
  defaultStartDate = new Date(),
  defaultEndDate = new Date(),
  label,
  error,
  ...props
}: ButtonProps) {
  const [startDate, setStartDate] = useState<null | Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<null | Date>(defaultEndDate);
  const style = buttonStyle({ block, className, error: !!error, intent, size });
  const Output = forwardRef(function ({ value, onClick }: any, ref: any) {
    return (
      <div>
        {label && (
          <p className="text-brand-textBlack mb-2 block text-sm font-medium leading-6">
            {label}
          </p>
        )}
        <button
          className={style}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
          onClick={onClick}
          ref={ref}
          type="button"
        >
          <div className="mr-auto">{value}</div>
          <CalendarIcon
            className="text-brand-blue h-5 w-5 font-semibold"
            strokeWidth={2}
          />
        </button>
        {error && (
          <p className="mt-2 flex items-center gap-x-1 text-sm text-rose-500">
            <ExclamationTriangleIcon className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    );
  });

  Output.displayName = 'Output';

  const handleOnChange = (date: [Date | null, Date | null]) => {
    const startDate = date[0];
    const endDate = date[1];

    setEndDate(endDate);
    setStartDate(startDate);

    if (!startDate || !endDate) return;

    onChange(startDate, endDate);
  };
  return (
    <DatePicker
      className="w-full"
      customInput={<Output />}
      dateFormat="dd MMM yyyy"
      endDate={endDate || undefined}
      onChange={handleOnChange}
      selected={startDate || undefined}
      selectsRange
      startDate={startDate || undefined}
    />
  );
}
