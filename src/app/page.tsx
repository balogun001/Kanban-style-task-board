'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/Button';
import { Title } from '@ui/Text';
import { useState } from 'react';
import Card from '../components/Card';
import { Navbar } from '../components/Navbar';
import PinCardList from '../components/PinCardList';
import TaskCardList from '../components/TaskCardList';
import { TaskModal } from '../components/TaskModal';
import TaskStatsChart from '../components/TaskStatsChart';
import { FullPageSpinner } from '../components/common/FullPageSpinner';
import { taskStorage } from '../utils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Wrapper } from '@ui/Wrapper';

export default function Home() {
  const { tasks, setTasks, pinnedTaskIds, setPinnedTaskIds, isLoaded } = useLocalStorage();
  
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddTask = () => {
    setModalMode('add');
    setEditingTask(null);
    setIsAddTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
    setEditingTask(null);
    setModalMode('add');
  };

  const handleTaskSubmit = (taskData: TaskFormData) => {
    if (modalMode === 'edit' && editingTask) {
      const updatedTask = { ...editingTask, ...taskData };
      taskStorage.updateTask(editingTask.id, taskData);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? updatedTask : task
        )
      );
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        status: 'todo',
        createdAt: new Date(),
      };
      taskStorage.addTask(newTask);
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const handleEditTask = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setModalMode('edit');
      setIsAddTaskModalOpen(true);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    taskStorage.deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    
    const updatedPinnedIds = pinnedTaskIds.filter(id => id !== taskId);
    if (updatedPinnedIds.length !== pinnedTaskIds.length) {
      taskStorage.setPinnedTaskIds(updatedPinnedIds);
      setPinnedTaskIds(updatedPinnedIds);
    } 
  };

  const handleUpdateTaskStatus = (
    taskId: string,
    newStatus: Task['status']
  ) => {
    taskStorage.updateTask(taskId, { status: newStatus });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleTogglePin = (taskId: string) => {
    const updatedPinnedIds = taskStorage.togglePinTask(taskId);
    setPinnedTaskIds(updatedPinnedIds);
  };

  const filterTasks = (taskList: Task[]) => {
    if (!searchQuery.trim()) {
      return taskList;
    }

    const query = searchQuery.toLowerCase();
    return taskList.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query)
      );
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FullPageSpinner />
      </div>
    );
  }

  const todoTasks = filterTasks(
    tasks.filter((task) => task.status === 'todo')
  );
  const inProgressTasks = filterTasks(
    tasks.filter((task) => task.status === 'in-progress')
  );
  const completedTasks = filterTasks(
    tasks.filter((task) => task.status === 'completed')
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar
        onSearch={handleSearch}
        onNotificationClick={() => null}
        onProfileClick={() => null}
        onSettingsClick={() => null}
        onLogoutClick={() => null}
        userName="Idris Agboola"
      />
      <Wrapper>
      <div className="flex pt-6">
        <div className="flex-1 p-4">
          <main>
            <div className="flex items-center justify-between">
              <div>
                <Title>Task</Title>
                {searchQuery.trim() && (
                  <p className="text-sm text-gray-600 mt-1">
                    Searching for: <span className="font-semibold text-[#5432D3]">"{searchQuery}"</span>
                    {' - '}
                    <span className="font-medium">
                      {todoTasks.length + inProgressTasks.length + completedTasks.length} results found
                    </span>
                  </p>
                )}
              </div>
              <Button size="lg" onClick={handleAddTask}>
                <PlusIcon className="h-5 w-5" />
                Add Task
              </Button>
            </div>
            <div className="flex flex-col lg:flex-row justify-between py-4 gap-4">
              <TaskCardList
                title="To-do"
                tasks={todoTasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                emptyMessage={
                  searchQuery.trim()
                    ? `No tasks found matching "${searchQuery}"`
                    : 'No tasks yet'
                }
                columnColor="gray"
                pinnedTaskIds={pinnedTaskIds}
                onTogglePin={handleTogglePin}
              />

              <TaskCardList
                title="In Progress"
                tasks={inProgressTasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                emptyMessage={
                  searchQuery.trim()
                    ? `No tasks found matching "${searchQuery}"`
                    : 'No tasks in progress'
                }
                columnColor="yellow"
                pinnedTaskIds={pinnedTaskIds}
                onTogglePin={handleTogglePin}
              />

              <TaskCardList
                title="Completed"
                tasks={completedTasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                emptyMessage={
                  searchQuery.trim()
                    ? `No tasks found matching "${searchQuery}"`
                    : 'No completed tasks'
                }
                columnColor="green"
                pinnedTaskIds={pinnedTaskIds}
                onTogglePin={handleTogglePin}
              />
            </div>
          </main>
        </div>
        <div className="hidden lg:flex w-[400px] p-4">
          <div className="flex flex-col gap-4 h-[calc(100vh-80px)]">
          
            <Card className="flex-1 min-h-0">
              <Title className="mb-4">Pinned Tasks</Title>
              <div className="overflow-y-auto max-h-full">
                <PinCardList
                  tasks={tasks}
                  pinnedTaskIds={pinnedTaskIds}
                  onTogglePin={handleTogglePin}
                  onTaskClick={(task) => handleEditTask(task.id)}
                />
              </div>
            </Card>

              <Card className="flex-1 min-h-0">
              <Title className="mb-4">Statistics</Title>
              <div className="flex justify-center py-2">
                <TaskStatsChart
                  tasks={tasks}
                  width={320}
                  height={260}
                  showLegend={true}
                  showTooltip={true}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
      </Wrapper>

      <TaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleTaskSubmit}
        modalTitle={modalMode === 'edit' ? 'Edit Task' : 'Add New Task'}
        initialValues={
          editingTask
            ? {
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                assignee: editingTask.assignee,
              }
            : undefined
        }
        submitButtonText={modalMode === 'edit' ? 'Update Task' : 'Create Task'}
      />
    </div>
  );
}

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
};

export type TaskFormData = Omit<Task, 'id' | 'status' | 'createdAt'>;
