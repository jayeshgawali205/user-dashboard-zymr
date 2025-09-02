import React from 'react';
import { Mail, Phone, Calendar, X } from 'lucide-react';
import { DEFAULT_AVATARS } from '../constants';

const UserModal = ({ 
  showModal, 
  setShowModal, 
  modalMode, 
  selectedUser, 
  formData, 
  setFormData, 
  handleSubmit, 
  handleEditUser, 
  formatDate 
}) => {
  if (!showModal) return null;

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatar
    }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div 
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {modalMode === 'view' ? 'User Details' : modalMode === 'edit' ? 'Edit User' : 'Create User'}
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {modalMode === 'view' && selectedUser ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold">
                {selectedUser.avatar ? (
                  <img src={selectedUser.avatar} alt={selectedUser.name} className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  selectedUser.name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                <p className="text-gray-500">ID: {selectedUser.id}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{selectedUser.email}</span>
              </div>
              {selectedUser.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">Joined {formatDate(selectedUser.createdAt)}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button
                onClick={() => handleEditUser(selectedUser)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit User
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose Avatar</label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {DEFAULT_AVATARS.map((avatar, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`h-12 w-12 rounded-full border-2 transition-colors ${
                      formData.avatar === avatar
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img src={avatar} alt={`Avatar ${index + 1}`} className="h-full w-full rounded-full object-cover" />
                  </button>
                ))}
              </div>
              {formData.avatar && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Selected:</span>
                  <img src={formData.avatar} alt="Selected avatar" className="h-8 w-8 rounded-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {modalMode === 'create' ? 'Create User' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserModal;