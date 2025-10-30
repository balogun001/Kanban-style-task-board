import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  CloudArrowUpIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import classNames from 'classnames';

import { BodyText } from './Text';

const accept = {
  'image/*': ['.png', '.jpeg', '.jpg'],
};

type ImageInputProps = {
  onChange: (selected: (string | File)[]) => void;
  maxFiles?: number;
  value?: (string | File)[];
  label?: string;
  uploadComponent?: React.ReactNode;
  isMultiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
};

export const ImageInput = ({
  onChange = () => {},
  disabled,
  value = [],
  label,
  maxFiles = 4,
  uploadComponent,
  isMultiple = true,
  placeholder,
  error,
}: ImageInputProps) => {
  const onDrop = useCallback(
    async (files: File[]) => {
      const newImages = isMultiple ? [...value, files[0]] : [files[0]];
      onChange(newImages);
    },
    [isMultiple, onChange, value],
  );

  const isDisabled = disabled || maxFiles === value?.length;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled: isDisabled,
    maxFiles: 1,
    multiple: false,
    noClick: true,

    onDrop,
  });

  const getUploadComponent = () => {
    if (uploadComponent) {
      return (
        <label {...getRootProps()}>
          {uploadComponent}
          <input disabled={!!disabled} hidden {...getInputProps()} />
        </label>
      );
    }

    return (
      <div className="relative">
        <div
          className={classNames(
            'border-brand-gray4 block rounded-xl border bg-gray-100 p-2',
            { 'border-rose-500': !!error },
          )}
          {...getRootProps()}
        >
          {label && (
            <span className="flex items-center gap-2 text-sm font-medium leading-6">
              {label}
            </span>
          )}

          <div className="relative">
            <label className="block py-6 text-center">
              <CloudArrowUpIcon className="mx-auto h-8 w-8" />
              <span className="block py-2 text-sm font-medium sm:text-sm sm:leading-6">
                {placeholder}
              </span>
              <BodyText className="text-center !text-sm text-gray-600 ">
                Supports PDF, JPEG & PNG
              </BodyText>
              <input
                className="sr-only"
                disabled={isDisabled}
                id="file-upload"
                name="file-upload"
                type="file"
                {...getInputProps()}
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>

            <div
              className={classNames('grid gap-4 ', {
                'sm:grid-cols-2': value.length > 1,
              })}
            >
              {value.map((image, index) => (
                <div
                  className="gap-z-3 bg-brand-green-700 relative mt-2 flex justify-between overflow-hidden rounded-md p-2"
                  key={index}
                >
                  <BodyText className="flex gap-x-1 text-sm text-white">
                    <DocumentIcon className="h-5 w-5" />
                    {image instanceof File ? image.name : image}
                  </BodyText>
                  <button
                    onClick={() =>
                      onChange(value.filter((file, idx) => idx !== index))
                    }
                    type="button"
                  >
                    <XMarkIcon className="h-5 w-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-x-1 text-sm text-rose-500">
            <ExclamationTriangleIcon className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    );
  };

  return <>{getUploadComponent()}</>;
};
