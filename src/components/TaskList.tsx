import React from 'react';
import { Task } from '../types';
import { CheckCircle, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center bg-white p-3 rounded-lg shadow"
          >
            <button
              onClick={() => onToggleTask(task.id)}
              className="mr-2 focus:outline-none"
            >
              {task.completed ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
            </button>
            <div className="flex-grow">
              <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <span className="text-sm text-blue-600">Assigned to: {task.assignedTo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;