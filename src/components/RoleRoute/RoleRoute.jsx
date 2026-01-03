import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthProvider";

const RoleRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

  return children;
};

export default RoleRoute;
