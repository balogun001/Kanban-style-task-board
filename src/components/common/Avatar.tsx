import React from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Image, { ImageProps } from 'next/image';

import { Dot } from './Dot';

type AvatarProps = Partial<ImageProps> & { showActive?: boolean };

export const Avatar = ({
  className,
  showActive = true,
  src,
  ...rest
}: AvatarProps) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className={classNames(
          'relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full  bg-brand-orange-50',
          className,
        )}
      >
        {src ? (
          <Image alt="" fill src={src} {...rest} />
        ) : (
          <UserIcon className="h-5 w-4 text-gray-700" />
        )}
      </div>
      {showActive && <Dot position="bottom-right" />}
    </div>
  );
};
