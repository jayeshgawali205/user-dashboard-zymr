import React from 'react';

const RecentUsersCard = ({ users, formatDate }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Joined Users</h3>
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4 p-3 rounded-lg border bg-blue-50 hover:bg-gray-50">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(user.createdAt)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentUsersCard;