import React from 'react';
import { Project } from '../types';
import { Folder } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Projects</h2>
        <p className="text-gray-500">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Projects</h2>
      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="flex items-center w-full bg-white hover:bg-gray-50 text-left px-4 py-2 rounded-lg shadow"
          >
            <Folder className="mr-2 text-yellow-500" />
            <span>{project.name}</span>
            <span className="ml-auto text-sm text-gray-500">
              {project.tasks ? project.tasks.length : 0} tasks
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;