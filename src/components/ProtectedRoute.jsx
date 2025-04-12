import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
    const { user, loading, isFirebaseConfigured, authError } = useAuth();
    const location = useLocation();

    // Show loading state while authentication is being checked
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    // If Firebase is not configured, show a warning message
    if (isFirebaseConfigured === false) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-center rounded-full bg-yellow-100 w-12 h-12 mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Authentication Not Configured</h2>
                    <p className="text-gray-600 text-center mb-4">
                        Firebase authentication is not properly configured. Please check your environment variables and set up Firebase credentials.
                    </p>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-500 mb-2">Error details:</p>
                        <div className="bg-gray-50 p-2 rounded text-sm text-gray-700 font-mono">
                            {authError || "Missing Firebase configuration"}
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                        >
                            Go to Home Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // If user is not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If permissions are required, check if user has them
    if (requiredPermissions.length > 0) {
        const hasRequiredPermissions = requiredPermissions.every(permission =>
            user.permissions?.includes(permission)
        );

        if (!hasRequiredPermissions) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // User is authenticated and has required permissions
    return children;
};

export default ProtectedRoute; 