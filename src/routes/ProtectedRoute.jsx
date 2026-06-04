import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { session } = useAuth();

  if (!session) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    const rolePaths = {
      patient: '/patient',
      reception: '/reception',
      doctor: '/doctor',
      admin: '/admin',
    };
    return <Navigate to={rolePaths[session.role] || '/login'} replace />;
  }

  return children;
}
