 import React from 'react';
import { Edit } from 'lucide-react';

const UsersTable = ({ 
  users, 
  formatDate, 
  handleViewUser, 
  handleEditUser 
}) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-blue-300 border-b">
        <tr>
          <th className="px-6 py-4 text-left text-md font-semibold text-black">User</th>
          <th className="px-6 py-4 text-left text-md font-semibold text-black">Contact</th>
          <th className="px-6 py-4 text-left text-md font-semibold text-black">Joined</th>
          <th className="px-6 py-4 text-left text-md font-semibold text-black">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <tr
            key={user.id}
            className="hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleViewUser(user)}
          >
            <td className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">ID: {user.id}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div>
                <p className="text-sm text-gray-500">{user.email}</p>
                {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {formatDate(user.createdAt)}
            </td>
            <td className="px-10 py-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditUser(user);
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersTable;