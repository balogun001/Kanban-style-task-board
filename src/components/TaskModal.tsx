'use client';

import { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from './common/Modal';
import { Input } from './common/Input';
import { TextArea } from './common/Textarea';
import { Button } from './common/Button';
import { Title } from './common/Text';
import { TaskFormData } from '../app/page';

export function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  modalTitle = 'Add New Task',
  initialValues,
  submitButtonText = 'Create Task',
}: TaskModalProps) {
  const defaultFormData = useMemo(
    () => ({
      title: '',
      description: '',
      priority: 'medium' as const,
      assignee: '',
    }),
    []
  );

  const [taskForm, setTaskForm] = useState<TaskFormData>(
    initialValues || defaultFormData
  );

  useEffect(() => {
    if (initialValues) {
      setTaskForm(initialValues);
    } else {
      setTaskForm(defaultFormData);
    }
  }, [initialValues, defaultFormData]);

  const handleCloseModal = () => {
    setTaskForm(initialValues || defaultFormData);
    onClose();
  };

  const onSubmitForm= (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(taskForm);
    }

    handleCloseModal();
  };

  const onInputChange = (field: keyof TaskFormData, value: string) => {
    setTaskForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      header={
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <Title>{modalTitle}</Title>
          <button
            type="button"
            onClick={handleCloseModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-[#2F3954]" />
          </button>
        </div>
      }
      className="max-w-md"
    >
      <form onSubmit={onSubmitForm} className="space-y-4 pt-4">
        <Input
          label="Task Title"
          placeholder="Enter task title..."
          value={taskForm.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          required
        />

        <TextArea
          label="Description"
          placeholder="Enter task description..."
          value={taskForm.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          size="sm"
        />

        <Input
          label="Assignee"
          placeholder="Assign to team member..."
          value={taskForm.assignee}
          onChange={(e) => onInputChange('assignee', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => onInputChange('priority', priority)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  taskForm.priority === priority
                    ? 'bg-[#5432D3] text-white'
                    : 'bg-gray-100 text-[#2F3954] hover:bg-gray-200'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            kinds="secondary"
            className="flex-1"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            kinds="primary"
            className="flex-1"
            disabled={!taskForm.title.trim()}
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (taskData: TaskFormData) => void;
  modalTitle?: string;
  initialValues?: TaskFormData;
  submitButtonText?: string;
};
