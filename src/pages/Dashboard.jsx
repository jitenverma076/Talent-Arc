import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Award,
    ListTodo,
    Briefcase,
    Settings,
    LogOut,
    User,
    ChevronRight,
    Clock,
    Trophy,
    Star,
    BadgeCheck,
    BarChart4
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { collection, doc, getDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2 } from 'lucide-react';

// Dashboard Overview component
function Overview() {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                // Simulate API call with timeout
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock user data
                setUserData({
                    name: user?.displayName || user?.email?.split('@')[0] || 'User',
                    completedChallenges: 3,
                    experiencePoints: 450,
                    skillsVerified: 5
                });

                // Mock activity data
                setActivities([
                    { id: 1, type: 'challenge', title: 'Completed React Todo App Challenge', date: '2 days ago' },
                    { id: 2, type: 'skill', title: 'Verified React.js Skill', date: '5 days ago' },
                    { id: 3, type: 'challenge', title: 'Started API Integration Challenge', date: '1 week ago' }
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 rounded-xl bg-background/50">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-xl bg-primary/5 border border-border/50">
                <h1 className="text-2xl font-bold">Welcome, {userData.name}!</h1>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card rounded-xl p-6 flex items-center shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                        <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Challenges Completed</p>
                        <p className="text-2xl font-bold">{userData.completedChallenges}</p>
                    </div>
                </div>

                <div className="card rounded-xl p-6 flex items-center shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                        <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Experience Points</p>
                        <p className="text-2xl font-bold">{userData.experiencePoints}</p>
                    </div>
                </div>

                <div className="card rounded-xl p-6 flex items-center shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                        <BadgeCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Skills Verified</p>
                        <p className="text-2xl font-bold">{userData.skillsVerified}</p>
                    </div>
                </div>
            </div>

            {/* Recent activity */}
            <div className="card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-border bg-secondary/30">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                </div>

                <div className="divide-y divide-border">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start p-6 hover:bg-secondary/10 transition-colors">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${activity.type === 'challenge'
                                ? 'bg-blue-100 dark:bg-blue-900'
                                : 'bg-green-100 dark:bg-green-900'
                                }`}>
                                {activity.type === 'challenge'
                                    ? <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    : <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                }
                            </div>
                            <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Challenges component
function Challenges() {
    const navigate = useNavigate();

    const challenges = [
        {
            id: 1,
            title: 'Build a Todo App',
            description: 'Create a simple todo application with React',
            difficulty: 'Beginner',
            duration: '3 days',
            skills: ['React', 'JavaScript'],
            status: 'completed',
            score: 95
        },
        {
            id: 2,
            title: 'API Integration',
            description: 'Build a dashboard that integrates with a REST API',
            difficulty: 'Intermediate',
            duration: '1 week',
            skills: ['React', 'API', 'Async'],
            status: 'in-progress'
        },
        {
            id: 3,
            title: 'Authentication System',
            description: 'Implement a complete auth system with JWT',
            difficulty: 'Advanced',
            duration: '2 weeks',
            skills: ['React', 'Security', 'Backend'],
            status: 'available'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center p-6 rounded-xl bg-primary/5 border border-border/50">
                <h1 className="text-2xl font-bold">Your Challenges</h1>
                <Link
                    to="/challenges"
                    className="text-sm font-medium text-primary hover:underline flex items-center rounded-xl px-4 py-2 hover:bg-primary/10 transition-colors"
                >
                    View all challenges
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
            </div>

            {/* Challenges grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map(challenge => (
                    <div key={challenge.id} className="card rounded-xl overflow-hidden border border-border/50 transition-all hover:shadow-md hover:border-primary/30">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold">{challenge.title}</h3>
                                <span className={`px-3 py-1 text-xs font-medium rounded-xl ${challenge.status === 'completed'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : challenge.status === 'in-progress'
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                    }`}>
                                    {challenge.status === 'completed' ? 'Completed' :
                                        challenge.status === 'in-progress' ? 'In Progress' : 'Available'}
                                </span>
                            </div>

                            <p className="text-muted-foreground text-sm mb-4">{challenge.description}</p>

                            <div className="flex items-center justify-between mb-4 p-2 bg-secondary/20 rounded-xl">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-4 w-4" />
                                    <span>{challenge.duration}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <BarChart4 className="mr-1 h-4 w-4" />
                                    <span>{challenge.difficulty}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {challenge.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-secondary text-foreground text-xs rounded-xl">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {challenge.status === 'completed' && (
                                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium">Your score</span>
                                    <span className="font-bold">{challenge.score}/100</span>
                                </div>
                            )}

                            <div className="mt-4">
                                {challenge.status === 'completed' ? (
                                    <button className="btn btn-secondary w-full rounded-xl py-3 hover:shadow-sm transition-all">View Submission</button>
                                ) : challenge.status === 'in-progress' ? (
                                    <button className="btn btn-primary w-full rounded-xl py-3 hover:shadow-sm transition-all">Continue Challenge</button>
                                ) : (
                                    <button className="btn btn-primary w-full rounded-xl py-3 hover:shadow-sm transition-all">Start Challenge</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Navigation items - removed Profile and Settings
    const navItems = [
        { to: '/dashboard', icon: <LayoutDashboard size={20} />, text: 'Overview' },
        { to: '/dashboard/challenges', icon: <Award size={20} />, text: 'Challenges' }
    ];

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="card sticky top-20 rounded-xl shadow-sm border border-border/50">
                            <div className="mb-6 p-6 border-b border-border rounded-t-xl bg-secondary/30">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-4">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">{user?.displayName || user?.email?.split('@')[0] || 'User'}</p>
                                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="space-y-2 p-4">
                                {navItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        end={item.to === '/dashboard'}
                                        className={({ isActive }) => `
                      flex items-center py-3 px-4 rounded-xl
                      ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'}
                      transition-colors
                    `}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </NavLink>
                                ))}

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center py-3 px-4 rounded-xl text-foreground hover:bg-secondary transition-colors"
                                >
                                    <span className="mr-3"><LogOut size={20} /></span>
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 rounded-xl overflow-hidden bg-background border border-border/10 shadow-sm p-6">
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="/challenges" element={<Challenges />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
} 