'use client';

import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';

import { Input } from './common/Input';
import { Avatar } from './common/Avatar';
import { LogoImage } from '../assets/images';
import { useTheme } from '../providers/ThemeProvider';


const defaultNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task in the Development board',
    time: '5 min ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'Task Completed',
    message: 'John Doe completed the UI Design task',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    title: 'Deadline Reminder',
    message: 'Task "API Integration" is due tomorrow',
    time: '3 hours ago',
    isRead: true,
  },
];

export function Navbar({
  onSearch,
  notifications = defaultNotifications,
  onNotificationClick,
  userName = 'John Doe',
  userAvatar,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: NavbarProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const { theme, toggleTheme } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-shrink-0 flex-1 flex items-center gap-8">
          <Image
            src={LogoImage}
            alt="Kanban Board Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        <div className="hidden sm:flex w-96">
          <Input
            placeholder="Search tasks, projects, or team members..."
            onChange={handleSearchChange}
            leftIcon={
              <div className="pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-[#2F3954]" />
              </div>
            }
            intent="fill"
            size="md"
            className="w-full"
          />
        </div>
        </div>


        <div className="flex items-center gap-4 ml-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#2F3954] dark:text-gray-200 hover:bg-[#E2E2E2] dark:hover:bg-gray-700 rounded-full transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 text-[#2F3954] dark:text-gray-200 hover:text-[#2F3954] bg-[#E2E2E2] dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-[#2F3954]">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <p className="text-sm text-[#2F3954]">
                      {unreadCount} unread
                    </p>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Menu.Item key={notification.id}>
                        <div
                          className={classNames(
                            'px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors',
                            notification.isRead
                              ? 'border-transparent'
                              : 'border-blue-500 bg-blue-50'
                          )}
                          onClick={() => onNotificationClick?.(notification)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[#2F3954]">
                                {notification.title}
                              </p>
                              <p className="text-sm text-[#2F3954] mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <span className="text-xs text-[#2F3954] ml-2 flex-shrink-0">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </Menu.Item>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-[#2F3954]">
                      <BellIcon className="h-8 w-8 mx-auto mb-2 text-[#2F3954]" />
                      <p>No notifications</p>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <Avatar src={userAvatar} showActive={false} className="h-8 w-8" />
              <span className="text-sm font-medium text-[#2F3954] hidden sm:block">
                {userName}
              </span>
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <button
                    type="button"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#2F3954] hover:bg-gray-100 w-full text-left"
                    onClick={onProfileClick}
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    type="button"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#2F3954] hover:bg-gray-100 w-full text-left"
                    onClick={onSettingsClick}
                  >
                    <Cog6ToothIcon className="h-4 w-4" />
                    Settings
                  </button>
                </Menu.Item>

                <div className="border-t border-gray-100 my-1" />

                <Menu.Item>
                  <button
                    type="button"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    onClick={onLogoutClick}
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    Sign out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};

type NavbarProps = {
  onSearch?: (query: string) => void;
  notifications?: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
  userName?: string;
  userAvatar?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
};