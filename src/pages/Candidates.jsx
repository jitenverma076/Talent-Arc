import { motion } from 'framer-motion';

const ChallengeCard = ({ title, description, difficulty, timeEstimate }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm"
    >
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex gap-4 text-sm text-gray-600">
            <span>Difficulty: {difficulty}</span>
            <span>Est. Time: {timeEstimate}</span>
        </div>
        <button className="mt-4 bg-secondary text-primary px-6 py-2 rounded-md font-medium hover:bg-secondary-dark transition-colors">
            Start Challenge
        </button>
    </motion.div>
);

export default function Candidates() {
    const challenges = [
        {
            title: "Full Stack Web Application",
            description: "Build a responsive web app with user authentication and data persistence",
            difficulty: "Advanced",
            timeEstimate: "3 hours"
        },
        {
            title: "API Integration",
            description: "Create a service that integrates with external APIs and handles data transformation",
            difficulty: "Intermediate",
            timeEstimate: "2 hours"
        },
        {
            title: "Frontend Development",
            description: "Implement a pixel-perfect UI from provided designs using modern frameworks",
            difficulty: "Intermediate",
            timeEstimate: "2.5 hours"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Showcase Your Skills
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Complete skill-based challenges to match with companies looking for your talents
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-lg shadow-sm"
                    >
                        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2">Skills Verified</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm">
                                        React
                                    </span>
                                    <span className="bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm">
                                        Node.js
                                    </span>
                                    <span className="bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm">
                                        TypeScript
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2">Challenges Completed</h3>
                                <p className="text-3xl font-bold text-primary">5</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2">Match Score</h3>
                                <p className="text-3xl font-bold text-primary">92/100</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-lg shadow-sm"
                    >
                        <h2 className="text-2xl font-bold mb-6">Company Matches</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium">Tech Innovators Inc.</h3>
                                    <p className="text-gray-600">Full Stack Developer</p>
                                </div>
                                <span className="text-2xl font-bold text-primary">95%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium">Future Systems</h3>
                                    <p className="text-gray-600">Frontend Engineer</p>
                                </div>
                                <span className="text-2xl font-bold text-primary">88%</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <section>
                    <h2 className="text-2xl font-bold mb-8">Available Challenges</h2>
                    <div className="grid grid-cols-3 gap-8">
                        {challenges.map((challenge, index) => (
                            <ChallengeCard
                                key={index}
                                {...challenge}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
} 