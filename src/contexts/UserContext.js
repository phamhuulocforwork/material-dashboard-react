import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      hoTen: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      vaiTro: "Admin"
    },
    {
      id: 2,
      hoTen: "Trần Thị B",
      email: "tranthib@gmail.com",
      vaiTro: "User"
    }
  ]);

  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    vaiTro: ""
  });

  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    if (formData.hoTen && formData.email && formData.vaiTro) {
      const newUser = {
        id: Math.max(0, ...users.map(user => user.id)) + 1,
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
      setFormData({ hoTen: "", email: "", vaiTro: "" });
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      hoTen: user.hoTen,
      email: user.email,
      vaiTro: user.vaiTro
    });
  };

  const handleSaveEdit = () => {
    if (formData.hoTen && formData.email && formData.vaiTro) {
      setUsers(prev => prev.map(user =>
        user.id === editingUser.id
          ? { ...user, ...formData }
          : user
      ));
      setEditingUser(null);
      setFormData({ hoTen: "", email: "", vaiTro: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({ hoTen: "", email: "", vaiTro: "" });
  };

  const value = {
    users,
    setUsers,
    formData,
    setFormData,
    editingUser,
    setEditingUser,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    handleInputChange,
    handleAddUser,
    handleDeleteUser,
    handleEditUser,
    handleSaveEdit,
    handleCancelEdit
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
