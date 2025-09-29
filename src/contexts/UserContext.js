import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    vaiTro: ""
  });

  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [modalTitle, setModalTitle] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [sortBy, setSortBy] = useState('hoTen');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/user.json');
        let data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
        setShowLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredAndSortedUsers = users
    .filter(user =>
      user.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.vaiTro.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy].toLowerCase();
      const bValue = b[sortBy].toLowerCase();

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue, 'vi');
      } else {
        return bValue.localeCompare(aValue, 'vi');
      }
    });

  const paginatedUsers = filteredAndSortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openCreateModal = () => {
    setModalMode('create');
    setModalTitle('Thêm người dùng mới');
    setFormData({ hoTen: "", email: "", vaiTro: "" });
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalMode('edit');
    setModalTitle('Chỉnh sửa người dùng');
    setEditingUser(user);
    setFormData({
      hoTen: user.hoTen,
      email: user.email,
      vaiTro: user.vaiTro
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
    setFormData({ hoTen: "", email: "", vaiTro: "" });
  };

  const handleAddUser = () => {
    const newUser = {
      id: Math.max(0, ...users.map(user => user.id)) + 1,
      ...formData
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleEditUser = (user) => {
    openEditModal(user);
  };

  const handleSaveEdit = () => {
    setUsers(prev => prev.map(user =>
      user.id === editingUser.id
        ? { ...user, ...formData }
        : user
    ));
  };

  const handleCancelEdit = () => {
    closeModal();
  };

  const value = {
    users,
    setUsers,
    loading,
    showLoading,
    formData,
    setFormData,
    editingUser,
    setEditingUser,
    searchTerm,
    setSearchTerm,
    filteredAndSortedUsers,
    paginatedUsers,
    page,
    rowsPerPage,
    sortBy,
    sortOrder,
    modalOpen,
    modalMode,
    modalTitle,
    handleInputChange,
    handleAddUser,
    handleDeleteUser,
    handleEditUser,
    handleSaveEdit,
    handleCancelEdit,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    openCreateModal,
    openEditModal,
    closeModal
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
