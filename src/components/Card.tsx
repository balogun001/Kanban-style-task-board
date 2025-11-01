import classNames from 'classnames';
import React, { ReactNode } from 'react';

function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={classNames(
        'bg-[#FAFAFA] dark:bg-gray-800 w-full rounded-sm p-4 shadow-md transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};
