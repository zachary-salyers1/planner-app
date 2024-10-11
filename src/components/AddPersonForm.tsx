import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface AddClientFormProps {
  onAddClient: (name: string, email: string, phone: string) => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onAddClient }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && phone.trim()) {
      onAddClient(name.trim(), email.trim(), phone.trim());
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Add New Client</h3>
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <UserPlus className="mr-2" size={20} />
          Add Client
        </button>
      </div>
    </form>
  );
};

export default AddClientForm;