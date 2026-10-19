import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { authService } from '@/services/auth';
import { useAuthStore } from '@/stores/auth-store';

interface ProtectedAuthRouteProps {
  children: React.ReactNode;
}

export function ProtectedAuthRoute({ children }: ProtectedAuthRouteProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading, isInitialized } = useAuthStore();

  useEffect(() => {
    // Initialize auth on first load
    if (!isInitialized) {
      void authService.initialize();
    }
  }, [isInitialized]);

  // Show loading state while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
