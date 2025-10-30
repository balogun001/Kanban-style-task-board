'use client';

import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

export type Option = { id: string; label: string; disabled?: boolean };

type Props = {
  options?: Option[];
  handleClick?: (val: Option) => void;
  disabled?: boolean;
};

const tableDropdown = [
  {
    id: 'edit',
    label: 'Edit',
  },
  {
    id: 'delete',
    label: 'Deactivate',
  },
];

export const DropMenu = ({ options, handleClick, disabled }: Props) => {
  return (
    <div className="flex w-full justify-end">
      <Menu as="div" className="relative ml-4 h-8 max-h-8 flex-shrink-0">
        <Menu.Button
          className="bottom-1 flex h-8 w-8 items-center justify-center rounded-lg border"
          disabled={disabled}
        >
          <EllipsisVerticalIcon className="text-brand-blue h-6 w-6" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {(options || tableDropdown)
              .filter((x: Option) => !x?.disabled)
              .map((option, index) => (
                <Menu.Item key={index}>
                  <div
                    className={classNames(
                      'text-brand-blue block px-4 py-2 text-sm hover:bg-gray-100',
                    )}
                    onClick={() => handleClick && handleClick(option)}
                  >
                    {option.label}
                  </div>
                </Menu.Item>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
