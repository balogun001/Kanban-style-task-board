'use client';

import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { Task } from '../app/page';
import { BodyText } from './common/Text';
import Card from './Card';

export interface PinnedTask extends Task {
  isPinned: boolean;
}

export interface PinCardListProps {
  tasks: Task[];
  pinnedTaskIds: string[];
  onTogglePin: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
  maxItems?: number;
}

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return 'text-emerald-600';
    case 'in-progress':
      return 'text-amber-600';
    case 'todo':
      return 'text-slate-600';
    default:
      return 'text-gray-600';
  }
};

export function PinCardList({
  tasks,
  pinnedTaskIds,
  onTogglePin,
  onTaskClick,
  maxItems = 2,
}: PinCardListProps) {
  const pinnedTasks = tasks.filter(task => pinnedTaskIds.includes(task.id));
  const displayTasks = pinnedTasks.slice(0, maxItems);

  if (pinnedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <BookmarkIcon className="w-6 h-6 text-gray-400" />
        </div>
        <BodyText className="text-gray-500 mb-1">No pinned tasks</BodyText>
        <BodyText className="text-sm text-gray-400">
          Pin important tasks to keep them at the top
        </BodyText>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayTasks.map((task) => (
        <Card
          key={task.id}
          className="p-3 hover:shadow-lg cursor-pointer group border border-gray-200 dark:border-gray-700"
          onClick={() => onTaskClick?.(task)}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2 mb-1">
                <BodyText className="font-medium truncate">
                  {task.title}
                </BodyText>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(task.id);
                  }}
                  className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all"
                >
                  <BookmarkIconSolid className="w-4 h-4 text-[#5432D3]" />
                </button>
              </div>
              
              {task.description && (
                <BodyText className="text-sm line-clamp-2 mb-2">
                  {task.description}
                </BodyText>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <BodyText className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status === 'in-progress' ? 'In Progress' : task.status}
                  </BodyText>
                </div>
                
                {task.assignee && (
                  <BodyText className="text-sm truncate max-w-[80px]">
                    @{task.assignee}
                  </BodyText>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {pinnedTasks.length > maxItems && (
        <div className="text-center pt-2">
          <BodyText className="text-sm text-gray-500">
            +{pinnedTasks.length - maxItems} more pinned tasks
          </BodyText>
        </div>
      )}
    </div>
  );
}

export default PinCardList;
