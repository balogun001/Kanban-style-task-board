'use client';

import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import Card from './Card';
import { BodyText, Title } from './common/Text';
import { Task } from 'src/app/page';

function TaskCardList({
  title,
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus,
  emptyMessage = 'No tasks',
  columnColor = 'gray',
  pinnedTaskIds = [],
  onTogglePin,
}: TaskCardListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getColumnBadgeColor = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'bg-yellow-100 text-yellow-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'gray':
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderTaskCard = (task: Task, index: number) => (
    <div
      key={task.id}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="600"
    >
      <Card className="w-full p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02] flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-[#2F3954] dark:text-gray-300 text-sm line-clamp-2 flex-1 mr-2">{task.title}</h3>
          <div className="flex gap-1">
            {onTogglePin && (
              <button
                type="button"
                onClick={() => onTogglePin(task.id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title={pinnedTaskIds.includes(task.id) ? 'Unpin task' : 'Pin task'}
              >
                {pinnedTaskIds.includes(task.id) ? (
                  <BookmarkIconSolid className="h-4 w-4 text-[#5432D3]" />
                ) : (
                  <BookmarkIcon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => onEditTask(task.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <PencilIcon className="h-4 w-4 text-gray-600" />
            </button>
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <TrashIcon className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 mb-3">
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              {task.assignee && (
                <span className="text-xs text-gray-500 truncate max-w-[80px]">@{task.assignee}</span>
              )}
            </div>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onUpdateTaskStatus(task.id, 'todo')}
                className={`p-1 rounded transition-colors ${
                  task.status === 'todo'
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
                title="Move to To-do"
              >
                <ClockIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onUpdateTaskStatus(task.id, 'in-progress')}
                className={`p-1 rounded transition-colors ${
                  task.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
                title="Move to In Progress"
              >
                <ExclamationCircleIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onUpdateTaskStatus(task.id, 'completed')}
                className={`p-1 rounded transition-colors ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
                title="Move to Completed"
              >
                <CheckCircleIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="flex-1 space-y-4">
      <div data-aos="fade-down" data-aos-duration="500">
        <Card>
          <div className="flex items-center justify-between">
            <Title className="text-sm">{title}</Title>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getColumnBadgeColor(
                columnColor
              )}`}
            >
              {tasks.length}
            </span>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => renderTaskCard(task, index))}

        {tasks.length === 0 && (
          <div data-aos="fade-up" data-aos-delay="200">
            <Card className="h-[180px] flex items-center justify-center border-dashed border-2 border-gray-200">
              <BodyText className="text-gray-400">{emptyMessage}</BodyText>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCardList;


type TaskCardListProps = {
  title: string;
  tasks: Task[];
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  emptyMessage?: string;
  columnColor?: 'gray' | 'yellow' | 'green';
  pinnedTaskIds?: string[];
  onTogglePin?: (taskId: string) => void;
};
