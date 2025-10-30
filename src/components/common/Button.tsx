'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';

const buttonStyle = cva(
  'rounded-lg  gap-2 flex justify-center items-center w-max transition-all duration-150  text-sm  disabled:opacity-70',
  {
    defaultVariants: {
      block: false,
      kinds: 'primary',
      rounded: false,
      size: 'md',
    },
    variants: {
      block: { true: '!w-full' },
      kinds: {
        normal: 'border-none hover:opacity-70',
        primary: 'bg-brand-orange-800 text-white hover:bg-opacity-80 shadow-sm',
        secondary: 'border border-gray-300 hover:opacity-70',
      },
      rounded: {
        true: '!rounded-full',
      },
      size: {
        lg: 'px-3.5 py-2.5',
        md: 'px-4 py-2',
        sm: 'px-3.5 py-2.5',
      },
    },
  },
);

type Props = VariantProps<typeof buttonStyle> & {
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
  ref?: any;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Props & {
    href?: never;
  };

type ButtonLinkProps = LinkProps &
  Props & {
    href: string;
    download?: boolean;
  };

export function Button(props: ButtonProps): JSX.Element;
export function Button(props: ButtonLinkProps): JSX.Element;
export function Button({
  href,
  className,
  children,
  size,
  kinds,
  block,
  isLoading,
  rounded,
  ref,
  ...props
}: ButtonProps | ButtonLinkProps) {
  let inner = <>{children}</>;

  const style = classNames(
    buttonStyle({ block, kinds, rounded, size }),
    className,
  );
  if (href) {
    return (
      <Link passHref {...(props as LinkProps)} className={style} href={href}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      className={style}
      ref={ref}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {isLoading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-white" />
      )}
      {inner}
    </button>
  );
}
