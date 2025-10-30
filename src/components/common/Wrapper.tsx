import React, { DetailedHTMLProps } from 'react';
import classNames from 'classnames';

type WrapperProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;
export const Wrapper = ({ className, ...rest }: WrapperProps) => {
  return (
    <section
      className={classNames(
        'mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8',
        className,
      )}
      {...rest}
    />
  );
};
