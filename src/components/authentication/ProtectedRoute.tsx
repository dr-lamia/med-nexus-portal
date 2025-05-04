
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes?: string[];
}

export const ProtectedRoute = ({ 
  children, 
  allowedUserTypes 
}: ProtectedRouteProps) => {
  const { isAuthenticated, userType } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Show toast notification
    toast({
      title: "Authentication required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    
    // Redirect to login page, saving the intended destination
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If specific user types are allowed and the current user type doesn't match
  if (allowedUserTypes && allowedUserTypes.length > 0 && userType && !allowedUserTypes.includes(userType)) {
    const dashboardPath = userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
    
    toast({
      title: "Access restricted",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};
