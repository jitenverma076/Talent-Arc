import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function Unauthorized() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto text-center p-8">
                <div className="mb-6 flex justify-center">
                    <AlertTriangle size={64} className="text-yellow-500" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
                <p className="text-gray-600 mb-8">
                    You don't have permission to access this page. If you believe this is an error,
                    please contact support.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className="px-4 py-2 bg-secondary text-gray-800 rounded hover:bg-secondary/90"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
} 