'use client';
import { ReactNode } from 'react';
import ReactSelect, {
  components,
  Props as ReactSelectProps,
} from 'react-select';
import ReactSelectAsync from 'react-select/async';
import ReactSelectCreatable from 'react-select/creatable';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';

const controlStyles = cva('w-full rounded-md shadow-sm border text-sm', {
  defaultVariants: {
    error: false,
    intent: 'normal',
    isDisabled: false,
    isFocused: false,
    size: 'md',
  },
  variants: {
    error: {
      true: '!border-rose-500',
    },
    intent: {
      fill: '!bg-gray-100 !border-gray-100 focus-within:!border-brand-textInput',
      normal:
        '!border-gray-300 border focus:!outline-none placeholder:text-gray-200  focus:!border-brand-orange-800! bg-transparent',
    },
    isDisabled: {
      true: '!bg-gray-100',
    },
    isFocused: {
      false: '!border-gray-300',
      true: '!border-brand-textInput',
    },
    size: {
      lg: '!min-h-h-16',
      md: '!min-h-[3rem]',
    },
  },
});

export type SelectProps<Option, IsMulti extends boolean> = Omit<
  VariantProps<typeof controlStyles>,
  'error' | 'isFocused'
> &
  ReactSelectProps<Option, IsMulti> & {
    isCreatable?: boolean;
    label?: string;
    helpText?: string;
    error?: string;
    isAsync?: boolean;
    leftIcon?: ReactNode;
  };

const getSelectComponent = (isAsync?: boolean, isCreatable?: boolean) => {
  if (isAsync) {
    return ReactSelectAsync;
  } else if (isCreatable) {
    return ReactSelectCreatable;
  }
  return ReactSelect;
};

export const Select = <Option, IsMulti extends boolean>({
  label,
  error,
  isCreatable,
  isDisabled,
  placeholder,
  helpText,
  isAsync,
  leftIcon,
  intent,
  ...props
}: SelectProps<Option, IsMulti>) => {
  const SelectComponent = getSelectComponent(isAsync, isCreatable);

  return (
    <div className="relative">
      {label && (
        <div className="mb-2 flex justify-between">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor={props.name}
          >
            {label}
          </label>
        </div>
      )}
      <div className="rounded-md shadow-sm">
        <SelectComponent
          {...props}
          classNames={{
            control: ({ isFocused, isDisabled }) =>
              controlStyles({ error: !!error, intent, isDisabled, isFocused }),
            indicatorSeparator: () => 'hidden',
            placeholder: () => '!text-gray-200',
          }}
          components={{
            ValueContainer: ({ children, className, ...rest }) => (
              <components.ValueContainer
                className={classNames(className, '!flex items-center gap-x-1')}
                {...rest}
              >
                {leftIcon && <span>{leftIcon}</span>}
                {children}
              </components.ValueContainer>
            ),
          }}
          id={props.name}
          isDisabled={isDisabled}
          placeholder={placeholder ?? 'Select an option'}
          styles={{
            control: (base) => ({
              ...base,
              boxShadow: 'none',
            }),
            input: (base) => ({
              ...base,
              'input:focus': {
                boxShadow: 'none',
              },
            }),
          }}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-rose-600" id={`${props.name}-error`}>
          {error}
        </p>
      )}

      {helpText && (
        <p
          className="mt-2 text-sm text-gray-500"
          id={`${props.name}-description`}
        >
          {helpText}
        </p>
      )}
    </div>
  );
};
