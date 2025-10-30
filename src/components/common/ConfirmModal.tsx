'use client';
import React, { ReactNode } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/Button';
import { Modal } from '@ui/Modal';
import { BodyText, Title } from '@ui/Text';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  message?: string;
  onCancel?: () => void;
  onConfirm?: (act: Function) => void;
  cancelText?: string;
  isLoading?: boolean;
  confirmText?: string;
};

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  message,
  onCancel,
  cancelText,
  onConfirm,
  confirmText,
  isLoading,
}: ConfirmModalProps) {
  const handleCancel = () => {
    onClose();
    onCancel && onCancel();
  };

  return (
    <Modal className="px-10 py-9" isOpen={isOpen}>
      <button
        className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200"
        onClick={onClose}
      >
        <XMarkIcon className="h-4 w-4" color="#4F4F4F" />
      </button>
      <div className="mb-6 flex items-center space-x-6">
        <div className="bg-brand-whiteBg flex h-14 w-14 items-center justify-center rounded-lg">
          <CheckCircleIcon className="h-7 w-7" />
        </div>
        <div>
          <Title className="mb-2 text-xl font-semibold">{title}</Title>
          <BodyText className=" text-brand-textInput text-sm leading-snug">
            {message}
          </BodyText>
        </div>
      </div>
      <div className="flex space-x-6">
        <Button
          block
          className=" !border-brand-blue"
          kinds="normal"
          onClick={handleCancel}
        >
          {cancelText || 'No, cancel'}
        </Button>
        <Button
          block
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => onConfirm && onConfirm(onClose)}
        >
          {confirmText || 'Yes, confirm'}
        </Button>
      </div>
    </Modal>
  );
}
