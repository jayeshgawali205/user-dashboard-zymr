import React, { useMemo } from 'react';
import UserControls from '../components/UserControls';
import UsersTable from '../components/UsersTable';
import Pagination from '../components/Pagination';

const UsersPage = ({ 
  users,
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder,
  currentPage,
  setCurrentPage,
  handleCreateUser,
  formatDate,
  handleViewUser,
  handleEditUser
}) => {
  const usersPerPage = 15;

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      if (!searchTerm.trim()) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      if (sortBy === 'name') {
        aValue = a.name?.toLowerCase() || '';
        bValue = b.name?.toLowerCase() || '';
      } else if (sortBy === 'date') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [users, searchTerm, sortBy, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + usersPerPage);
  }, [filteredAndSortedUsers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

  return (
    <div className="space-y-6">
      <UserControls 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setCurrentPage={setCurrentPage}
        handleCreateUser={handleCreateUser}
      />

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <UsersTable 
          users={paginatedUsers}
          formatDate={formatDate}
          handleViewUser={handleViewUser}
          handleEditUser={handleEditUser}
        />
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          usersPerPage={usersPerPage}
          totalUsers={filteredAndSortedUsers.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersPage;