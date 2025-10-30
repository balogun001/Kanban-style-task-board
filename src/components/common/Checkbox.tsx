import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & {
  label?: string;
  type?: 'radio' | 'checkbox';
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, type = 'checkbox', ...rest }, ref) => {
    return (
      <label className="flex items-center gap-3">
        <input
          aria-describedby="comments-description"
          className="h-4 w-4 rounded border-gray-300 text-brand-orange-800 focus:ring-brand-orange-800"
          id="comments"
          name="comments"
          ref={ref}
          type={type}
          {...rest}
        />{' '}
        {label && (
          <p className="block text-sm font-medium leading-6 text-gray-700">
            {label}
          </p>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
