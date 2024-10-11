import React, { useState, useEffect } from 'react';
import { Person, Project, Task } from './types';
import ClientList from './components/PersonList';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import AddClientForm from './components/AddPersonForm';
import AddProjectForm from './components/AddProjectForm';
import AddTaskForm from './components/AddTaskForm';
import { PlusCircle } from 'lucide-react';
import { supabase } from './supabaseClient';

function App() {
  const [clients, setClients] = useState<Person[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  async function fetchClients() {
    const { data, error } = await supabase.from('people').select('*');
    if (error) console.error('Error fetching clients:', error);
    else setClients(data);
  }

  async function fetchProjects() {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data);
  }

  const handleSelectProject = async (projectId: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        setSelectedProject({ ...project, tasks: data });
      }
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (selectedProject) {
      const taskToUpdate = selectedProject.tasks.find((t) => t.id === taskId);
      if (taskToUpdate) {
        const { error } = await supabase
          .from('tasks')
          .update({ completed: !taskToUpdate.completed })
          .eq('id', taskId);

        if (error) {
          console.error('Error updating task:', error);
        } else {
          setSelectedProject({
            ...selectedProject,
            tasks: selectedProject.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          });
        }
      }
    }
  };

  const handleSelectClient = (clientId: string) => {
    console.log(`Selected client: ${clientId}`);
  };

  const handleAddClient = async (name: string, email: string, phone: string) => {
    const { data, error } = await supabase
      .from('people')
      .insert({ name, email, phone })
      .select();

    if (error) {
      console.error('Error adding client:', error);
    } else if (data) {
      setClients([...clients, data[0]]);
    }
  };

  const handleEditClient = async (clientId: string, updatedClient: Partial<Person>) => {
    const { error } = await supabase
      .from('people')
      .update(updatedClient)
      .eq('id', clientId);

    if (error) {
      console.error('Error updating client:', error);
    } else {
      const updatedClients = clients.map((client) =>
        client.id === clientId ? { ...client, ...updatedClient } : client
      );
      setClients(updatedClients);

      if (updatedClient.name) {
        const oldName = clients.find(c => c.id === clientId)?.name;
        const { error: taskUpdateError } = await supabase
          .from('tasks')
          .update({ assigned_to: updatedClient.name })
          .eq('assigned_to', oldName);

        if (taskUpdateError) {
          console.error('Error updating tasks:', taskUpdateError);
        } else if (selectedProject) {
          setSelectedProject({
            ...selectedProject,
            tasks: selectedProject.tasks.map((task) =>
              task.assignedTo === oldName ? { ...task, assignedTo: updatedClient.name! } : task
            ),
          });
        }
      }
    }
  };

  const handleAddTask = async (title: string, description: string, assignedTo: string) => {
    if (selectedProject) {
      const newTask = {
        title,
        description,
        assigned_to: assignedTo,
        completed: false,
        project_id: selectedProject.id
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert(newTask)
        .select();

      if (error) {
        console.error('Error adding task:', error);
      } else if (data) {
        setSelectedProject({
          ...selectedProject,
          tasks: [...selectedProject.tasks, data[0]]
        });
        setShowAddTaskForm(false);
      }
    }
  };

  const handleAddProject = async (name: string) => {
    const { data, error } = await supabase
      .from('projects')
      .insert({ name })
      .select();

    if (error) {
      console.error('Error adding project:', error);
    } else if (data) {
      setProjects([...projects, data[0]]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Personal Project Planner</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <ClientList
              clients={clients}
              onSelectClient={handleSelectClient}
              onEditClient={handleEditClient}
            />
            <AddClientForm onAddClient={handleAddClient} />
            <ProjectList projects={projects} onSelectProject={handleSelectProject} />
            <AddProjectForm onAddProject={handleAddProject} />
          </div>
          <div className="md:col-span-2">
            {selectedProject ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
                <TaskList tasks={selectedProject.tasks} onToggleTask={handleToggleTask} />
                {showAddTaskForm ? (
                  <AddTaskForm onAddTask={handleAddTask} clients={clients} />
                ) : (
                  <button
                    onClick={() => setShowAddTaskForm(true)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <PlusCircle className="mr-2" />
                    Add New Task
                  </button>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">Select a project to view and manage tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;