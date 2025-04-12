import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
    const { user, userData, loading, error, updateProfile, updateEmail, updatePassword, logout } = useAuth();

    const [profileForm, setProfileForm] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

    const [emailForm, setEmailForm] = useState({
        newEmail: user?.email || '',
        password: ''
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [formError, setFormError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Handle profile form changes
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle email form changes
    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle password form changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };

    // Submit profile update
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage(null);

        try {
            await updateProfile({
                displayName: profileForm.displayName,
                photoURL: profileForm.photoURL
            });
            setSuccessMessage('Profile updated successfully');
        } catch (err) {
            setFormError(err.message || 'Failed to update profile');
        }
    };

    // Submit email update
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage(null);

        try {
            await updateEmail(emailForm.newEmail, emailForm.password);
            setSuccessMessage('Email updated successfully');
            setEmailForm(prev => ({ ...prev, password: '' }));
        } catch (err) {
            setFormError(err.message || 'Failed to update email');
        }
    };

    // Submit password update
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage(null);

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        try {
            await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
            setSuccessMessage('Password updated successfully');
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setFormError(err.message || 'Failed to update password');
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            setFormError(err.message || 'Failed to logout');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!user) {
        return <div className="text-center p-4">You must be logged in to view this page</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>

            {/* User info */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center space-x-4">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xl">{user.displayName?.[0] || user.email?.[0]}</span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-semibold">{user.displayName || 'User'}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {userData && (
                    <div className="mt-4 border-t pt-4">
                        <h3 className="font-medium mb-2">Additional Information</h3>
                        <p>Member since: {userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleDateString() : 'N/A'}</p>
                    </div>
                )}
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            {(formError || error) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {formError || error}
                </div>
            )}

            {/* Update Profile Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                <form onSubmit={handleProfileSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="displayName">
                            Display Name
                        </label>
                        <input
                            id="displayName"
                            name="displayName"
                            type="text"
                            value={profileForm.displayName}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="photoURL">
                            Profile Photo URL
                        </label>
                        <input
                            id="photoURL"
                            name="photoURL"
                            type="url"
                            value={profileForm.photoURL}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Profile
                    </button>
                </form>
            </div>

            {/* Update Email Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Update Email</h2>
                <form onSubmit={handleEmailSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="newEmail">
                            New Email
                        </label>
                        <input
                            id="newEmail"
                            name="newEmail"
                            type="email"
                            value={emailForm.newEmail}
                            onChange={handleEmailChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="emailPassword">
                            Current Password
                        </label>
                        <input
                            id="emailPassword"
                            name="password"
                            type="password"
                            value={emailForm.password}
                            onChange={handleEmailChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Email
                    </button>
                </form>
            </div>

            {/* Update Password Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Update Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Password
                    </button>
                </form>
            </div>

            {/* Logout Button */}
            <div className="text-center">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile; 