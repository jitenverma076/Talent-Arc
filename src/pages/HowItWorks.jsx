import { CheckCircle, Code, Users, Zap } from 'lucide-react';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

export default function HowItWorks() {
    const { openAuthModal } = useContext(ModalContext);

    const steps = [
        {
            icon: <Code className="w-12 h-12 text-primary" />,
            title: "Take the Challenge",
            description: "Complete skill-based coding challenges designed to showcase your real abilities."
        },
        {
            icon: <Zap className="w-12 h-12 text-primary" />,
            title: "AI-Powered Matching",
            description: "Our AI analyzes your skills and matches you with companies looking for your exact talents."
        },
        {
            icon: <Users className="w-12 h-12 text-primary" />,
            title: "Connect with Companies",
            description: "Get introduced to companies that value your skills and are excited to meet you."
        },
        {
            icon: <CheckCircle className="w-12 h-12 text-primary" />,
            title: "Land Your Dream Role",
            description: "Skip the traditional resume screening and get straight to meaningful conversations."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
            <div className="container-lg py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                        How TalentArc Works
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're revolutionizing tech hiring by focusing on what truly matters - your skills and potential.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="card group relative"
                        >
                            <div className="mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <div className="w-8 h-0.5 bg-border group-hover:bg-primary transition-colors duration-300"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
                    <button
                        onClick={openAuthModal}
                        className="btn-primary"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
} 