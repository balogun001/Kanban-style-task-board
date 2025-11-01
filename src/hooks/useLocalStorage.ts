import { useState, useEffect } from 'react';
import { taskStorage } from '../utils';
import { Task } from '../app/page';

export const useLocalStorage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pinnedTaskIds, setPinnedTaskIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeData = () => {
      const existingTasks = taskStorage.getTasks();
      
      if (existingTasks.length === 0) {
        const sampleTasks: Task[] = [
          {
            id: '1',
            title: 'Welcome to Kanban Board',
            description: 'This is your first task! Click edit to modify or delete to remove.',
            priority: 'medium',
            assignee: 'Idris Agboola',
            status: 'todo',
            createdAt: new Date(),
          },
        ];
        
        taskStorage.setTasks(sampleTasks);
        return sampleTasks;
      }
      
      return existingTasks;
    };

    const initializePinnedTasks = () => {
      const existingPinned = taskStorage.getPinnedTaskIds();
      
      if (existingPinned.length === 0) {
        const pinnedIds = ['1'];
        taskStorage.setPinnedTaskIds(pinnedIds);
        return pinnedIds;
      }
      
      return existingPinned;
    };

    const initialTasks = initializeData();
    const initialPinnedIds = initializePinnedTasks();
    
    setTasks(initialTasks);
    setPinnedTaskIds(initialPinnedIds);
    setIsLoaded(true);
  }, []); // Empty dependency array - only run once on mount

  return {
    tasks,
    setTasks,
    pinnedTaskIds,
    setPinnedTaskIds,
    isLoaded,
  };
};