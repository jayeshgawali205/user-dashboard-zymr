import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import UserModal from './components/UserModal';
import { API_URL, DEFAULT_AVATARS } from './constants';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    phone: ''
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setFormData({ name: '', email: '', avatar: '', phone: '' });
    setModalMode('create');
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      phone: user.phone || ''
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalMode('view');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...formData,
        createdAt: new Date().toISOString()
      };

      if (modalMode === 'create') {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        const newUser = await response.json();
        setUsers(prev => [...prev, newUser]);
      } else if (modalMode === 'edit') {
        const response = await fetch(`${API_URL}/${selectedUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const updatedUser = await response.json();
        setUsers(prev => prev.map(u => u.id === selectedUser.id ? updatedUser : u));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardPage 
            users={users}
            formatDate={formatDate} 
          />
        )}

        {activeTab === 'users' && (
          <UsersPage 
            users={users}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleCreateUser={handleCreateUser}
            formatDate={formatDate}
            handleViewUser={handleViewUser}
            handleEditUser={handleEditUser}
          />
        )}
      </main>

      <UserModal 
        showModal={showModal}
        setShowModal={setShowModal}
        modalMode={modalMode}
        selectedUser={selectedUser}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleEditUser={handleEditUser}
        formatDate={formatDate}
      />
    </div>
  );
};

export default UserDashboard;