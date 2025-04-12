import { useState, useEffect, useContext } from 'react';
import {
    ArrowRight,
    CheckCircle,
    Building2,
    Users,
    Zap,
    BarChart3,
    DollarSign,
    Search,
    Filter,
    Code,
    Star,
    Briefcase,
    Trophy,
    BadgeCheck,
    Calendar,
    FileText,
    Map
} from 'lucide-react';
import { ModalContext } from '../context/ModalContext';
import { useAuth } from '../hooks/useAuth';
import { getAllCandidates, getCandidateData } from '../utils/candidateData';

// Company landing page content
const benefits = [
    {
        icon: <Users className="w-12 h-12 text-primary" />,
        title: "Quality Candidates",
        description: "Access pre-vetted talent who have demonstrated their skills through real-world challenges."
    },
    {
        icon: <Zap className="w-12 h-12 text-primary" />,
        title: "Faster Hiring",
        description: "Reduce your time-to-hire by up to 50% with pre-qualified candidates."
    },
    {
        icon: <DollarSign className="w-12 h-12 text-primary" />,
        title: "Cost Effective",
        description: "Pay only for successful hires, not for lengthy recruiting processes."
    },
    {
        icon: <BarChart3 className="w-12 h-12 text-primary" />,
        title: "Data-Driven Matches",
        description: "Our AI matching algorithm ensures candidates fit your specific requirements."
    }
];

const testimonials = [
    {
        company: "TechSolutions",
        author: "Sarah Johnson",
        role: "CTO",
        quote: "TalentArc helped us find qualified developers in half the time it used to take. The quality of candidates has been consistently high.",
        logo: "TS"
    },
    {
        company: "GrowthStartup",
        author: "Michael Chen",
        role: "Head of Engineering",
        quote: "As a growing startup, we needed to hire quickly without sacrificing quality. TalentArc delivered exceptional candidates that hit the ground running.",
        logo: "GS"
    },
    {
        company: "EnterpriseNow",
        author: "Jessica Miller",
        role: "VP of Talent",
        quote: "The skill-based approach has significantly improved our hiring success rate and reduced turnover in technical roles.",
        logo: "EN"
    }
];

function TestimonialCard({ testimonial }) {
    return (
        <div className="card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-4">
                    {testimonial.logo}
                </div>
                <div>
                    <h4 className="font-semibold">{testimonial.company}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.author}, {testimonial.role}</p>
                </div>
            </div>
            <p className="text-muted-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
        </div>
    );
}

function CandidateCard({ candidate, onViewProfile }) {
    return (
        <div className="card rounded-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p className="text-muted-foreground">{candidate.title}</p>
                </div>
                <div className="flex items-center bg-primary/10 rounded-xl px-3 py-1">
                    <Star className="h-4 w-4 text-primary mr-1" />
                    <span className="font-medium">{candidate.rating}</span>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{candidate.experience}</span>
                </div>
                <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{candidate.completedChallenges} challenges</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                    {candidate.skills.slice(0, 4).map((skill, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-secondary text-xs rounded-xl"
                        >
                            {skill}
                        </span>
                    ))}
                    {candidate.skills.length > 4 && (
                        <span className="px-2 py-1 bg-secondary text-xs rounded-xl">
                            +{candidate.skills.length - 4} more
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <div className="flex items-center">
                    <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">{candidate.match}% Match</span>
                </div>
                <button
                    className="btn btn-primary rounded-xl"
                    onClick={() => onViewProfile(candidate.id)}
                >
                    View Profile
                </button>
            </div>
        </div>
    );
}

function CandidateProfile({ candidateId, onClose }) {
    const [candidateData, setCandidateData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCandidate() {
            try {
                setLoading(true);
                const data = await getCandidateData(candidateId);
                setCandidateData(data);
            } catch (error) {
                console.error("Error loading candidate:", error);
            } finally {
                setLoading(false);
            }
        }

        loadCandidate();
    }, [candidateId]);

    if (loading) {
        return (
            <div className="card rounded-xl p-8 border border-border/50 shadow-md">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
            </div>
        );
    }

    if (!candidateData) {
        return (
            <div className="card rounded-xl p-8 border border-border/50 shadow-md">
                <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">Candidate Not Found</h3>
                    <p className="text-muted-foreground">The requested profile could not be loaded.</p>
                    <button
                        className="btn btn-secondary mt-4 rounded-xl"
                        onClick={onClose}
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card rounded-xl border border-border/50 shadow-md">
            <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-2xl font-bold">Candidate Profile</h2>
                <button
                    className="btn btn-secondary rounded-xl"
                    onClick={onClose}
                >
                    Back to Search
                </button>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Profile Overview */}
                    <div className="md:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mr-4">
                                {candidateData.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{candidateData.name}</h3>
                                <p className="text-muted-foreground">{candidateData.title}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center">
                                <Briefcase className="h-5 w-5 mr-3 text-muted-foreground" />
                                <span>{candidateData.experience} experience</span>
                            </div>
                            <div className="flex items-center">
                                <Map className="h-5 w-5 mr-3 text-muted-foreground" />
                                <span>{candidateData.location}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                                <span>Available: {candidateData.availability}</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="h-5 w-5 mr-3 text-primary" />
                                <span className="font-medium">{candidateData.rating} rating</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {candidateData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-secondary text-xs rounded-xl"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Bio</h4>
                            <p className="text-sm text-muted-foreground">{candidateData.bio}</p>
                        </div>
                    </div>

                    {/* AI-Generated Overview & Challenges */}
                    <div className="md:col-span-2">
                        <div className="card bg-secondary/20 rounded-xl p-6 mb-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                    <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <h4 className="text-lg font-semibold">AI-Generated Overview</h4>
                            </div>
                            <p className="text-muted-foreground">
                                {candidateData.aiGeneratedOverview || "AI analysis is being generated..."}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Completed Challenges ({candidateData.challenges.length})</h4>
                            <div className="space-y-4">
                                {candidateData.challenges.map((challenge, index) => (
                                    <div key={index} className="card rounded-xl p-4 border border-border/50 hover:shadow-sm transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-medium">{challenge.name}</h5>
                                            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-xl text-xs">
                                                {challenge.score}/100
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-1">
                                                {challenge.techStack.map((tech, techIndex) => (
                                                    <span key={techIndex} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-xl">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-xs text-muted-foreground">{challenge.completedAt}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button className="btn btn-primary rounded-xl">
                        Request Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

function TalentBrowser() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        skill: '',
        location: '',
        experience: ''
    });
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            setLoading(true);
            try {
                const candidatesList = await getAllCandidates();
                setCandidates(candidatesList);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleViewProfile = (candidateId) => {
        setSelectedCandidate(candidateId);
    };

    const handleCloseProfile = () => {
        setSelectedCandidate(null);
    };

    const filterCandidates = () => {
        if (!filters.skill && !filters.location && !filters.experience) {
            return candidates;
        }

        return candidates.filter(candidate => {
            const skillMatch = !filters.skill || candidate.skills.some(skill =>
                skill.toLowerCase().includes(filters.skill.toLowerCase())
            );

            const locationMatch = !filters.location ||
                candidate.location.toLowerCase().includes(filters.location.toLowerCase());

            const experienceMatch = !filters.experience ||
                candidate.experience.includes(filters.experience);

            return skillMatch && locationMatch && experienceMatch;
        });
    };

    const filteredCandidates = filterCandidates();

    if (selectedCandidate) {
        return <CandidateProfile candidateId={selectedCandidate} onClose={handleCloseProfile} />;
    }

    return (
        <div className="py-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6">Browse Available Talent</h2>
                <div className="card rounded-xl p-6 border border-border/50 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Skill</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Code className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    type="text"
                                    name="skill"
                                    value={filters.skill}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. React, Python"
                                    className="pl-10 w-full rounded-xl border border-border/70 focus:border-primary focus:ring-1 focus:ring-primary bg-background p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    placeholder="City or Remote"
                                    className="pl-10 w-full rounded-xl border border-border/70 focus:border-primary focus:ring-1 focus:ring-primary bg-background p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Experience</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    type="text"
                                    name="experience"
                                    value={filters.experience}
                                    onChange={handleFilterChange}
                                    placeholder="Years of experience"
                                    className="pl-10 w-full rounded-xl border border-border/70 focus:border-primary focus:ring-1 focus:ring-primary bg-background p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-muted-foreground">
                            Showing {filteredCandidates.length} candidates
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Sort by:</span>
                            <select className="rounded-xl border border-border/70 bg-background p-1.5 text-sm">
                                <option value="match">Match %</option>
                                <option value="rating">Rating</option>
                                <option value="challenges">Challenges</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCandidates.map(candidate => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                onViewProfile={handleViewProfile}
                            />
                        ))}
                    </div>

                    {filteredCandidates.length === 0 && (
                        <div className="text-center p-12 bg-secondary/30 rounded-xl border border-border/50">
                            <p className="text-lg font-medium mb-2">No candidates match your filters</p>
                            <p className="text-muted-foreground">Try adjusting your search criteria</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default function Companies() {
    const { openAuthModal } = useContext(ModalContext);
    const { isAuthenticated } = useAuth();
    const [showTalentBrowser, setShowTalentBrowser] = useState(false);

    const handleGetStarted = () => {
        if (isAuthenticated) {
            setShowTalentBrowser(true);
        } else {
            openAuthModal();
        }
    };

    return (
        <div className="min-h-screen">
            {showTalentBrowser && isAuthenticated ? (
                <div className="container-lg py-12">
                    <TalentBrowser />
                </div>
            ) : (
                <>
                    {/* Hero Section */}
                    <section className="py-20 bg-gradient-to-b from-background to-secondary">
                        <div className="container-lg">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                                        Find Exceptional Tech Talent, Verified by Skills
                                    </h1>
                                    <p className="text-xl text-muted-foreground mb-8">
                                        Stop relying on resumes and interviews alone. Hire candidates who have proven their abilities through real-world challenges.
                                    </p>
                                    <button
                                        onClick={handleGetStarted}
                                        className="btn-primary rounded-xl"
                                    >
                                        {isAuthenticated ? 'Browse Talent' : 'Hire Talent'} <ArrowRight size={18} className="ml-2" />
                                    </button>
                                </div>

                                <div className="p-8 card card-gradient rounded-xl">
                                    <Building2 size={64} className="text-primary mb-6" />
                                    <h2 className="text-2xl font-bold mb-4">For Employers</h2>
                                    <ul className="space-y-4">
                                        {[
                                            "Access to pre-vetted, skilled candidates",
                                            "Reduce time-to-hire by up to 50%",
                                            "Higher retention rates with skill-matched hires",
                                            "Custom challenges based on your requirements"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Benefits Section */}
                    <section className="py-20">
                        <div className="container-lg">
                            <h2 className="text-3xl font-bold text-center mb-2">Why Companies Choose TalentArc</h2>
                            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                                Our skill-based approach to hiring results in better matches and longer-lasting employment.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="card rounded-xl text-center border border-border/50 shadow-sm hover:shadow-md transition-all">
                                        <div className="mx-auto mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-muted-foreground">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section className="py-20 bg-secondary">
                        <div className="container-lg">
                            <h2 className="text-3xl font-bold text-center mb-2">What Our Clients Say</h2>
                            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
                                Join hundreds of companies that have transformed their hiring process.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard key={index} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20">
                        <div className="container-lg text-center">
                            <h2 className="text-3xl font-bold mb-6">Ready to find your next tech star?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                                Create an employer account to start browsing pre-vetted tech talent.
                            </p>
                            <button
                                onClick={handleGetStarted}
                                className="btn-primary rounded-xl"
                            >
                                {isAuthenticated ? 'Browse Talent Now' : 'Get Started'} <ArrowRight size={18} className="ml-2" />
                            </button>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
} 