import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AdminDashboard() {
    const { user, userData } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <p className="text-blue-700">
                            Welcome, {user?.displayName || 'Admin'}! This is the admin dashboard.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <h2 className="font-semibold text-lg mb-2">User Management</h2>
                            <p className="text-gray-600 mb-4">Manage users, permissions and roles</p>
                            <button className="text-blue-600 hover:text-blue-800">
                                Manage Users →
                            </button>
                        </div>

                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <h2 className="font-semibold text-lg mb-2">Content Management</h2>
                            <p className="text-gray-600 mb-4">Manage challenges, resources and content</p>
                            <button className="text-blue-600 hover:text-blue-800">
                                Manage Content →
                            </button>
                        </div>

                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <h2 className="font-semibold text-lg mb-2">Analytics</h2>
                            <p className="text-gray-600 mb-4">View system analytics and reports</p>
                            <button className="text-blue-600 hover:text-blue-800">
                                View Reports →
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h2 className="font-semibold text-lg mb-2">System Status</h2>
                        <p className="text-gray-600">All systems operational</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 