import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../features/auth/authService";
import { useGetProfileQuery } from '../features/settings/settingApi';

const ProtectedRoute = ({ children }) => {
  const { data, isLoading: profileGetLoading, refetch } = useGetProfileQuery();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  // Only redirect to pricing if user is NOT subscribed AND doesn't have access
  if (data?.data && !data.data.isSubscribed && !data.data.hasAccess) {
    return <Navigate to="/pricing-plans" replace />;
  }

  if (profileGetLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;