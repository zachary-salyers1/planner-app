export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  completed: boolean;
  project_id: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}