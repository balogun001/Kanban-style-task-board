import React from 'react';
import classNames from 'classnames';
import Image, { ImageProps } from 'next/image';

export const Logo = ({
  className,
  type = 'white',
  ...rest
}: Partial<ImageProps> & { type?: 'white' | 'black' }) => {
  return (
    <Image
      alt="starlink"
      height={120}
      src={type === 'white' ? '/white-logo.svg' : '/black-logo.svg'}
      width={135}
      {...rest}
      className={classNames('max-w-full', className)}
    />
  );
};
