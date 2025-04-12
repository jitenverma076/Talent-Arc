import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { register, login } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        if (!isLogin && !formData.name) {
            setError('Please provide your name');
            setIsLoading(false);
            return;
        }

        try {
            if (isLogin) {
                // Login with Firebase
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    setSuccess('Login successful!');
                    onClose();
                    navigate('/dashboard');
                } else {
                    setError(result.error || 'Login failed');
                }
            } else {
                // Signup with Firebase
                const result = await register(formData.name, formData.email, formData.password);
                if (result.success) {
                    setSuccess('Account created successfully!');
                    onClose();
                    navigate('/dashboard');
                } else {
                    setError(result.error || 'Registration failed');
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
            let errorMessage = 'An error occurred. Please try again.';

            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email is already in use. Please use a different email or login.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger password.';
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password.';
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="card w-full max-w-md m-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="text-muted-foreground">
                        {isLogin ? 'Sign in to your account' : 'Sign up for TalentArc'}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                        {success}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="input"
                                placeholder="John Doe"
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="you@example.com"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="mr-2 animate-spin" />
                                {isLogin ? 'Signing in...' : 'Creating account...'}
                            </>
                        ) : (
                            isLogin ? 'Sign in' : 'Sign up'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setSuccess('');
                        }}
                        className="link-muted text-sm"
                        disabled={isLoading}
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
} 