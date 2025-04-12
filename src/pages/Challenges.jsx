import { useContext } from 'react';
import { ArrowRight, Code, Clock, BadgeCheck, Trophy, Server, Layers, Brain } from 'lucide-react';
import { ModalContext } from '../context/ModalContext';

const challenges = [
    {
        id: 1,
        title: "Frontend Challenge",
        description: "Build a responsive dashboard with React and modern CSS frameworks",
        difficulty: "Intermediate",
        duration: "3-4 hours",
        skills: ["React", "CSS", "UI/UX"],
        icon: <Code className="w-10 h-10 text-primary" />
    },
    {
        id: 2,
        title: "Backend API Development",
        description: "Create a RESTful API with authentication and database integration",
        difficulty: "Advanced",
        duration: "4-5 hours",
        skills: ["Node.js", "Express", "MongoDB"],
        icon: <Server className="w-10 h-10 text-primary" />
    },
    {
        id: 3,
        title: "Full Stack Application",
        description: "Develop a complete web application with frontend and backend integration",
        difficulty: "Advanced",
        duration: "6-8 hours",
        skills: ["React", "Node.js", "Database"],
        icon: <Layers className="w-10 h-10 text-primary" />
    },
    {
        id: 4,
        title: "Algorithmic Problem Solving",
        description: "Solve complex algorithmic challenges to showcase your problem-solving skills",
        difficulty: "Varies",
        duration: "1-2 hours",
        skills: ["Algorithms", "Data Structures", "Optimization"],
        icon: <Brain className="w-10 h-10 text-primary" />
    }
];

function ChallengeCard({ challenge }) {
    const { openAuthModal } = useContext(ModalContext);

    return (
        <div className="card">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                    {challenge.icon}
                </div>
                <span className="text-sm px-3 py-1 bg-secondary rounded-full">
                    {challenge.difficulty}
                </span>
            </div>

            <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
            <p className="text-muted-foreground mb-4">{challenge.description}</p>

            <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock size={16} className="mr-1" />
                <span>{challenge.duration}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {challenge.skills.map((skill, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-full">
                        {skill}
                    </span>
                ))}
            </div>

            <button
                onClick={openAuthModal}
                className="btn-outline w-full"
            >
                Take Challenge
            </button>
        </div>
    );
}

export default function Challenges() {
    const { openAuthModal } = useContext(ModalContext);

    return (
        <div className="min-h-screen">
            <section className="py-20 bg-gradient-to-b from-background to-secondary">
                <div className="container-lg">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                            Showcase Your Real Skills
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Our challenges are designed by industry experts to test real-world skills that matter to employers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card">
                            <BadgeCheck size={48} className="text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Skills That Matter</h3>
                            <p className="text-muted-foreground">
                                Demonstrate your practical abilities with challenges that reflect real work scenarios.
                            </p>
                        </div>

                        <div className="card">
                            <Clock size={48} className="text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Respect Your Time</h3>
                            <p className="text-muted-foreground">
                                Most challenges can be completed in 2-4 hours, respecting your time and commitment.
                            </p>
                        </div>

                        <div className="card">
                            <Trophy size={48} className="text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Stand Out</h3>
                            <p className="text-muted-foreground">
                                Top performers get featured in our talent pool that companies actively browse.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container-lg">
                    <h2 className="text-3xl font-bold text-center mb-2">Available Challenges</h2>
                    <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                        Select a challenge that matches your skills and interests. Complete it on your own time.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {challenges.map(challenge => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-secondary">
                <div className="container-lg text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to showcase your skills?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                        Create an account to start taking challenges and get matched with companies.
                    </p>
                    <button
                        onClick={openAuthModal}
                        className="btn-primary"
                    >
                        Get Started <ArrowRight size={18} className="ml-2" />
                    </button>
                </div>
            </section>
        </div>
    );
} 