import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (title: string, description: string, assignedTo: string) => void;
  clients: { id: string; name: string }[];
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, clients }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && assignedTo) {
      onAddTask(title.trim(), description.trim(), assignedTo);
      setTitle('');
      setDescription('');
      setAssignedTo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Assign to...</option>
          <option value="Me">Me</option>
          <optgroup label="Clients">
            {clients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </optgroup>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;