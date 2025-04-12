import { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { ModalContext } from '../context/ModalContext';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { openAuthModal } = useContext(ModalContext);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            openAuthModal();
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20">
                <div className="container-lg">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                            Find Your Perfect Tech Role
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                            Skip the resume screening and showcase your real skills. TalentArc uses AI to match you with companies that value what you can do, not just what you've done.
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="btn-primary text-base flex items-center rounded-xl"
                        >
                            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'} <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-secondary">
                <div className="container-lg">
                    <h2 className="text-3xl font-bold text-center mb-16">How TalentArc Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card rounded-xl">
                            <h3 className="text-xl font-semibold mb-4">Skill-Based Challenges</h3>
                            <p className="text-muted-foreground">Complete real-world coding tasks that showcase your abilities, not just your background.</p>
                        </div>

                        <div className="card rounded-xl">
                            <h3 className="text-xl font-semibold mb-4">AI-Powered Matching</h3>
                            <p className="text-muted-foreground">Our technology connects you with companies seeking your exact skill set.</p>
                        </div>

                        <div className="card rounded-xl">
                            <h3 className="text-xl font-semibold mb-4">Skip the Line</h3>
                            <p className="text-muted-foreground">Go straight to meaningful conversations with companies that are already interested in you.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container-lg text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to transform your job search?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Join thousands of tech professionals who found their dream roles through TalentArc.
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="btn-primary rounded-xl"
                    >
                        {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                    </button>
                </div>
            </section>
        </div>
    );
} 