'use client';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CalendarIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { generateTodayDate } from '../../utils/date';

import { Dot } from './Dot';
import { BodyText, Title } from './Text';

type DashboardTitleProps = {
  title: string;
  options?: { label: string; href: string }[];
  activeOption?: string;
  canGoBack?: boolean;
};

export function DashboardTitle({
  title,
  options,
  activeOption,
  canGoBack,
}: DashboardTitleProps) {
  const { back } = useRouter();
  return (
    <div className="flex items-end  gap-4">
      <>
        {options ? (
          <Menu as="div" className="relative flex-shrink-0">
            <div className="flex items-center gap-2">
              <Dot className="!static" />
              <Title className="text-lg font-semibold sm:text-2xl">
                {title}
              </Title>
              <Menu.Button className="ml-4 rounded-full bg-white p-2">
                <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-2 w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map(({ label, href }, index) => (
                  <Menu.Item key={index}>
                    <Link
                      className="text-brand-blue relative flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray-100"
                      href={href}
                    >
                      {activeOption === label && (
                        <Dot className="!static -ml-3" />
                      )}
                      {label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button className="rounded-full bg-white p-2" onClick={back}>
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
            )}
            <Title className="text-lg font-semibold sm:text-2xl">{title}</Title>
          </div>
        )}
      </>
      <div className="bg-brand-blue ml-auto hidden w-52 items-center gap-4 rounded-lg px-6 py-3 !text-white sm:flex ">
        <CalendarIcon className="h-5 w-5" />
        <div>
          <BodyText className="text-xs text-white sm:text-xs">
            Today’s date
          </BodyText>
          <BodyText className="mt-1 !text-base font-semibold text-white sm:text-xs">
            {generateTodayDate()}
          </BodyText>
        </div>
      </div>
    </div>
  );
}
