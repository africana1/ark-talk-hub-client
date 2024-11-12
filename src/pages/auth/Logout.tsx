// src/pages/LogoutRoute.tsx
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout as logoutAction} from '../../store/slices/authSlice';

const LogoutRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the logout action to reset auth state
    dispatch(logoutAction());

    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login
    navigate('/login', {replace: true});
  }, [navigate, dispatch]);

  return null;
};

export default LogoutRoute;
