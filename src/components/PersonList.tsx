import React, { useState } from 'react';
import { Person } from '../types';
import { UserCircle, Edit2, Check, X, Mail, Phone } from 'lucide-react';

interface ClientListProps {
  clients: Person[];
  onSelectClient: (clientId: string) => void;
  onEditClient: (clientId: string, updatedClient: Partial<Person>) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onSelectClient, onEditClient }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const startEditing = (client: Person) => {
    setEditingId(client.id);
    setEditName(client.name);
    setEditEmail(client.email);
    setEditPhone(client.phone);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
    setEditPhone('');
  };

  const saveEdit = (clientId: string) => {
    if (editName.trim()) {
      onEditClient(clientId, {
        name: editName.trim(),
        email: editEmail.trim(),
        phone: editPhone.trim(),
      });
      setEditingId(null);
      setEditName('');
      setEditEmail('');
      setEditPhone('');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Clients</h2>
      <div className="space-y-2">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow p-4">
            {editingId === client.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => saveEdit(client.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <UserCircle className="mr-2 text-blue-500" size={24} />
                    <span className="font-semibold">{client.name}</span>
                  </div>
                  <button
                    onClick={() => startEditing(client)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Mail className="mr-2" size={16} />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2" size={16} />
                    <span>{client.phone}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;