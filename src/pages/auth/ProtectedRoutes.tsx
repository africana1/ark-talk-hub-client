import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
interface ProtectedRouteAndAccessAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRouteAndAccessAuth: React.FC<ProtectedRouteAndAccessAuthProps> = ({
  allowedRoles,
  children,
}) => {
  const {user} = useAuth();

  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (!allowedRoles.includes(user.role || '')) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
export default ProtectedRouteAndAccessAuth;
