'use client';
import React, { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

type DashboardMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
};

export const SideDrawer = ({
  onClose,
  open,
  children,
  position = 'left',
}: DashboardMobileDrawerProps) => {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div
          className={classNames('fixed inset-0 flex', {
            'justify-end': position === 'right',
            'justify-start': position === 'left',
          })}
        >
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={classNames({
              '-translate-x-full': position === 'left',
              'translate-x-full': position === 'right',
            })}
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo={classNames({
              '-translate-x-full': position === 'left',
              'translate-x-full': position === 'right',
            })}
          >
            <Dialog.Panel as={Fragment}>{children}</Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
