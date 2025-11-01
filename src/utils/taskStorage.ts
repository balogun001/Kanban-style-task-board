import { Task } from '../app/page';
import { storage } from './storage';

const STORAGE_KEYS = {
  TASKS: 'kanban_tasks',
  PINNED_TASKS: 'kanban_pinned_tasks',
} as const;

export const taskStorage = {
  getTasks: (): Task[] => {
    return storage.get<Task[]>(STORAGE_KEYS.TASKS, []);
  },

  setTasks: (tasks: Task[]): void => {
    storage.set(STORAGE_KEYS.TASKS, tasks);
  },

  addTask: (task: Task): void => {
    const tasks = taskStorage.getTasks();
    const updatedTasks = [...tasks, task];
    taskStorage.setTasks(updatedTasks);
  },

  updateTask: (taskId: string, updates: Partial<Task>): void => {
    const tasks = taskStorage.getTasks();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    taskStorage.setTasks(updatedTasks);
  },

  deleteTask: (taskId: string): void => {
    const tasks = taskStorage.getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    taskStorage.setTasks(updatedTasks);
  },

  getPinnedTaskIds: (): string[] => {
    return storage.get<string[]>(STORAGE_KEYS.PINNED_TASKS, []);
  },

  setPinnedTaskIds: (pinnedIds: string[]): void => {
    storage.set(STORAGE_KEYS.PINNED_TASKS, pinnedIds);
  },

  togglePinTask: (taskId: string): string[] => {
    const pinnedIds = taskStorage.getPinnedTaskIds();
    const updatedPinnedIds = pinnedIds.includes(taskId)
      ? pinnedIds.filter(id => id !== taskId)
      : [...pinnedIds, taskId];
    
    taskStorage.setPinnedTaskIds(updatedPinnedIds);
    return updatedPinnedIds;
  },

  clearAllData: (): void => {
    storage.remove(STORAGE_KEYS.TASKS);
    storage.remove(STORAGE_KEYS.PINNED_TASKS);
  },

};