'use client';
import React, { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

import { Wrapper } from './Wrapper';

type BottomDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'top' | 'bottom';
};

export function BottomDrawer({
  onClose,
  open,
  children,
  position = 'bottom',
}: BottomDrawerProps) {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        as="div"
        className="fixed inset-x-0 bottom-0 z-50"
        onClose={onClose}
      >
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

        <div className={classNames('fixed inset-x-0 bottom-0 flex ', {})}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={classNames({
              '-translate-y-full': position === 'top',
              'translate-y-full': position === 'bottom',
            })}
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo={classNames({
              '-translate-y-full': position === 'top',
              'translate-y-full': position === 'bottom',
            })}
          >
            <Dialog.Panel
              as="div"
              className="flex h-screen w-full  flex-col justify-end"
            >
              <Wrapper className="flex w-full justify-end py-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <button
                    className="bg-brand-whiteBg rounded-full p-2 transition-all duration-100 hover:bg-opacity-70"
                    onClick={onClose}
                    type="button"
                  >
                    <XMarkIcon
                      aria-hidden="true"
                      className="text-brand-blue h-5 w-5"
                    />
                  </button>
                </Transition.Child>
              </Wrapper>
              <div className="bg-brand-whiteBg max-h-full w-full overflow-y-auto rounded-t-3xl py-8">
                <Wrapper>{children}</Wrapper>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
