import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const UserContext = createContext();

const ACTIONS = {
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_MODAL_CLOSED: 'SET_MODAL_CLOSED',
  SET_EDITING_USER: 'SET_EDITING_USER',
  SET_SORT: 'SET_SORT',
  SET_PAGE: 'SET_PAGE',
  SET_ROWS_PER_PAGE: 'SET_ROWS_PER_PAGE',
  SET_SNACKBAR: 'SET_SNACKBAR',
  CLOSE_SNACKBAR: 'CLOSE_SNACKBAR'
};

const initialState = {
  users: [],
  loading: true,
  searchTerm: '',
  modalOpen: false,
  modalMode: 'create',
  modalTitle: '',
  editingUser: null,
  page: 0,
  rowsPerPage: 5,
  sortBy: '',
  sortOrder: 'asc',
  snackbar: {
    open: false,
    message: '',
    severity: 'success'
  }
};

function userReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload };
    
    case ACTIONS.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload.data } : user
        )
      };
    
    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload, page: 0 };
    
    case ACTIONS.SET_MODAL_OPEN:
      return {
        ...state,
        modalOpen: true,
        modalMode: action.payload.mode,
        modalTitle: action.payload.title,
        editingUser: action.payload.user || null
      };
    
    case ACTIONS.SET_MODAL_CLOSED:
      return {
        ...state,
        modalOpen: false,
        editingUser: null
      };
    
    case ACTIONS.SET_EDITING_USER:
      return { ...state, editingUser: action.payload };
    
    case ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };
    
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    
    case ACTIONS.SET_ROWS_PER_PAGE:
      return { ...state, rowsPerPage: action.payload, page: 0 };
    
    case ACTIONS.SET_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity
        }
      };
    
    case ACTIONS.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false }
      };
    
    default:
      return state;
  }
}

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const response = await fetch('/user.json');
        let data = await response.json();
        dispatch({ type: ACTIONS.SET_USERS, payload: data });
      } catch (error) {
        console.error('Error fetching users:', error);
        showSnackbar('Lỗi khi tải danh sách người dùng!', 'error');
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    };

    fetchUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    return state.users
      .filter(user =>
        user.hoTen.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.vaiTro.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (!state.sortBy) return 0;

        const aValue = a[state.sortBy].toLowerCase();
        const bValue = b[state.sortBy].toLowerCase();

        if (state.sortOrder === 'asc') {
          return aValue.localeCompare(bValue, 'vi');
        } else {
          return bValue.localeCompare(aValue, 'vi');
        }
      });
  }, [state.users, state.searchTerm, state.sortBy, state.sortOrder]);

  const paginatedUsers = useMemo(() => {
    return filteredAndSortedUsers.slice(
      state.page * state.rowsPerPage,
      state.page * state.rowsPerPage + state.rowsPerPage
    );
  }, [filteredAndSortedUsers, state.page, state.rowsPerPage]);

  const showSnackbar = (message, severity = 'success') => {
    dispatch({
      type: ACTIONS.SET_SNACKBAR,
      payload: { message, severity }
    });
  };

  const closeSnackbar = () => {
    dispatch({ type: ACTIONS.CLOSE_SNACKBAR });
  };

  const handleAddUser = (userData) => {
    try {
      const newUser = {
        id: Math.max(0, ...state.users.map(user => user.id)) + 1,
        ...userData
      };
      dispatch({ type: ACTIONS.ADD_USER, payload: newUser });
      dispatch({ type: ACTIONS.SET_MODAL_CLOSED });
      showSnackbar('Thêm người dùng thành công!', 'success');
      return true;
    } catch (error) {
      showSnackbar('Lỗi khi thêm người dùng!', 'error');
      return false;
    }
  };

  const handleUpdateUser = (id, userData) => {
    try {
      dispatch({
        type: ACTIONS.UPDATE_USER,
        payload: { id, data: userData }
      });
      dispatch({ type: ACTIONS.SET_MODAL_CLOSED });
      showSnackbar('Cập nhật người dùng thành công!', 'success');
      return true;
    } catch (error) {
      showSnackbar('Lỗi khi cập nhật người dùng!', 'error');
      return false;
    }
  };

  const handleDeleteUser = (id) => {
    try {
      dispatch({ type: ACTIONS.DELETE_USER, payload: id });
      showSnackbar('Xóa người dùng thành công!', 'success');
    } catch (error) {
      showSnackbar('Lỗi khi xóa người dùng!', 'error');
    }
  };

  const openCreateModal = () => {
    dispatch({
      type: ACTIONS.SET_MODAL_OPEN,
      payload: {
        mode: 'create',
        title: 'Thêm người dùng mới',
        user: null
      }
    });
  };

  const openEditModal = (user) => {
    dispatch({
      type: ACTIONS.SET_MODAL_OPEN,
      payload: {
        mode: 'edit',
        title: 'Chỉnh sửa người dùng',
        user: user
      }
    });
  };

  const closeModal = () => {
    dispatch({ type: ACTIONS.SET_MODAL_CLOSED });
  };

  const handleSort = (column) => {
    const newSortOrder = state.sortBy === column && state.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch({
      type: ACTIONS.SET_SORT,
      payload: { sortBy: column, sortOrder: newSortOrder }
    });
  };

  const handleChangePage = (event, newPage) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch({ type: ACTIONS.SET_ROWS_PER_PAGE, payload: parseInt(event.target.value, 10) });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  };

  const value = {
    users: state.users,
    loading: state.loading,
    searchTerm: state.searchTerm,
    modalOpen: state.modalOpen,
    modalMode: state.modalMode,
    modalTitle: state.modalTitle,
    editingUser: state.editingUser,
    page: state.page,
    rowsPerPage: state.rowsPerPage,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    snackbar: state.snackbar,
    filteredAndSortedUsers,
    paginatedUsers,
    
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    setSearchTerm,
    showSnackbar,
    closeSnackbar
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};