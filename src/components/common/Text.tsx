import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

type TitleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function Title({ className, ...rest }: TitleProps) {
  return (
    <h2
      className={classNames(
        className,
        'text-lg font-bold text-gray-800 sm:text-2xl',
      )}
      {...rest}
    />
  );
}

export function BodyText({ className, ...rest }: TitleProps) {
  return (
    <p
      className={classNames(className, 'text-base font-normal text-gray-700')}
      {...rest}
    />
  );
}
