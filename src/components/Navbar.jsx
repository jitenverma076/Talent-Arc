import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { ModalContext } from '../context/ModalContext';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
    const { openAuthModal } = useContext(ModalContext);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            setShowDropdown(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header className="sticky top-4 z-50 mx-4">
            <div className="max-w-7xl mx-auto bg-card border border-border rounded-2xl backdrop-blur-sm shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold text-foreground">
                                TalentArc
                            </Link>
                        </div>

                        <div className="flex-grow">
                            <nav className="hidden md:flex items-center justify-center gap-8">
                                <Link to="/how-it-works" className="link-muted">
                                    How it Works
                                </Link>
                                <Link to="/companies" className="link-muted">
                                    For Companies
                                </Link>
                                <Link to="/contact" className="link-muted">
                                    Contact Us
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl transition-colors hover:bg-secondary/80"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                        </div>
                                        <span className="hidden sm:inline">{user?.displayName || user?.email?.split('@')[0] || 'User'}</span>
                                        <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                                            <div className="py-2">
                                                <div className="px-4 py-2 text-sm font-medium border-b border-border mb-2">
                                                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                                                </div>
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center px-4 py-2 hover:bg-secondary transition-colors"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    <LayoutDashboard size={16} className="mr-2" />
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center px-4 py-2 hover:bg-secondary transition-colors text-left"
                                                >
                                                    <LogOut size={16} className="mr-2" />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={openAuthModal}
                                    className="btn-primary"
                                >
                                    <User size={18} className="mr-2" />
                                    Account
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 