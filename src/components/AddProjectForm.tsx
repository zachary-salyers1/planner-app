import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';

interface AddProjectFormProps {
  onAddProject: (name: string) => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddProject(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Add New Project</h3>
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <FolderPlus className="mr-2" size={20} />
          Add Project
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;