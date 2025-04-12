import { db } from '../lib/firebase';
import { collection, doc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';

// Individual candidate data with distinct challenge history
export const mockCandidatesData = {
    "user1": {
        id: "user1",
        name: "Alex Johnson",
        title: "Senior Full Stack Developer",
        email: "alex.johnson@example.com",
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "GraphQL", "AWS"],
        rating: 4.9,
        location: "San Francisco, CA",
        availability: "Immediate",
        experience: "7 years",
        bio: "Full stack developer with expertise in building scalable web applications using modern JavaScript frameworks.",
        challenges: [
            {
                id: "c1",
                name: "E-commerce API",
                description: "Built a RESTful API for an e-commerce platform",
                techStack: ["Node.js", "Express", "MongoDB"],
                score: 95,
                complexity: "Advanced",
                completedAt: "2023-11-15"
            },
            {
                id: "c2",
                name: "React Dashboard",
                description: "Created a data visualization dashboard with React",
                techStack: ["React", "D3.js", "Material UI"],
                score: 92,
                complexity: "Intermediate",
                completedAt: "2023-12-10"
            },
            {
                id: "c3",
                name: "Authentication System",
                description: "Implemented JWT authentication for a web application",
                techStack: ["Node.js", "JWT", "Auth0"],
                score: 98,
                complexity: "Intermediate",
                completedAt: "2024-01-05"
            },
            {
                id: "c4",
                name: "Real-time Chat App",
                description: "Built a real-time chat application with WebSockets",
                techStack: ["React", "Socket.io", "Express"],
                score: 94,
                complexity: "Advanced",
                completedAt: "2024-02-15"
            },
            {
                id: "c5",
                name: "CI/CD Pipeline",
                description: "Set up continuous integration and deployment pipeline",
                techStack: ["GitHub Actions", "Docker", "AWS"],
                score: 97,
                complexity: "Advanced",
                completedAt: "2024-03-10"
            },
            {
                id: "c6",
                name: "GraphQL API",
                description: "Converted a REST API to GraphQL",
                techStack: ["GraphQL", "Apollo", "Node.js"],
                score: 96,
                complexity: "Advanced",
                completedAt: "2024-04-01"
            },
            {
                id: "c7",
                name: "Serverless Function",
                description: "Implemented serverless functions for image processing",
                techStack: ["AWS Lambda", "S3", "Serverless Framework"],
                score: 93,
                complexity: "Intermediate",
                completedAt: "2024-05-05"
            },
            {
                id: "c8",
                name: "State Management",
                description: "Refactored large React application with Redux Toolkit",
                techStack: ["React", "Redux Toolkit", "TypeScript"],
                score: 91,
                complexity: "Advanced",
                completedAt: "2024-06-10"
            }
        ],
        aiGeneratedOverview: ""
    },
    "user2": {
        id: "user2",
        name: "Maya Patel",
        title: "Frontend Developer",
        email: "maya.patel@example.com",
        skills: ["React", "JavaScript", "CSS", "HTML", "UI/UX", "Figma", "Responsive Design"],
        rating: 4.7,
        location: "New York, NY",
        availability: "2 weeks",
        experience: "4 years",
        bio: "Frontend developer passionate about creating beautiful and accessible user interfaces.",
        challenges: [
            {
                id: "c1",
                name: "Responsive E-commerce Site",
                description: "Implemented responsive design for an e-commerce site",
                techStack: ["HTML", "CSS", "JavaScript"],
                score: 94,
                complexity: "Intermediate",
                completedAt: "2023-10-05"
            },
            {
                id: "c2",
                name: "React Component Library",
                description: "Created a reusable component library with Storybook",
                techStack: ["React", "Storybook", "Styled Components"],
                score: 92,
                complexity: "Intermediate",
                completedAt: "2023-11-25"
            },
            {
                id: "c3",
                name: "Animation Challenge",
                description: "Implemented complex UI animations for a web app",
                techStack: ["CSS", "GSAP", "React"],
                score: 96,
                complexity: "Advanced",
                completedAt: "2024-01-15"
            },
            {
                id: "c4",
                name: "Accessibility Upgrade",
                description: "Improved accessibility of an existing web application",
                techStack: ["HTML", "ARIA", "JavaScript"],
                score: 98,
                complexity: "Intermediate",
                completedAt: "2024-02-28"
            },
            {
                id: "c5",
                name: "Performance Optimization",
                description: "Optimized performance of a React application",
                techStack: ["React", "Webpack", "Lighthouse"],
                score: 90,
                complexity: "Advanced",
                completedAt: "2024-04-10"
            }
        ],
        aiGeneratedOverview: ""
    },
    "user3": {
        id: "user3",
        name: "David Kim",
        title: "Backend Engineer",
        email: "david.kim@example.com",
        skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker", "Microservices"],
        rating: 4.8,
        location: "Austin, TX",
        availability: "Immediate",
        experience: "5 years",
        bio: "Backend developer specializing in building scalable and maintainable server-side applications.",
        challenges: [
            {
                id: "c1",
                name: "API Design",
                description: "Designed and implemented a RESTful API for a social network",
                techStack: ["Python", "Django REST Framework", "PostgreSQL"],
                score: 95,
                complexity: "Advanced",
                completedAt: "2023-09-10"
            },
            {
                id: "c2",
                name: "Microservice Migration",
                description: "Refactored monolithic application into microservices",
                techStack: ["Python", "Docker", "Kubernetes"],
                score: 91,
                complexity: "Expert",
                completedAt: "2023-11-05"
            },
            {
                id: "c3",
                name: "Database Optimization",
                description: "Optimized database queries and schema for performance",
                techStack: ["PostgreSQL", "SQL", "Indexing"],
                score: 97,
                complexity: "Advanced",
                completedAt: "2024-01-20"
            },
            {
                id: "c4",
                name: "Authentication System",
                description: "Implemented OAuth2 authentication for an application",
                techStack: ["Python", "OAuth2", "JWT"],
                score: 93,
                complexity: "Intermediate",
                completedAt: "2024-03-15"
            },
            {
                id: "c5",
                name: "Data Processing Pipeline",
                description: "Built a data processing pipeline with Celery",
                techStack: ["Python", "Celery", "Redis"],
                score: 94,
                complexity: "Advanced",
                completedAt: "2024-05-01"
            },
            {
                id: "c6",
                name: "Caching System",
                description: "Implemented distributed caching for a web application",
                techStack: ["Redis", "Python", "Django"],
                score: 96,
                complexity: "Intermediate",
                completedAt: "2024-06-15"
            },
            {
                id: "c7",
                name: "Testing Framework",
                description: "Set up comprehensive testing framework for backend services",
                techStack: ["Pytest", "CI/CD", "Python"],
                score: 92,
                complexity: "Intermediate",
                completedAt: "2024-07-20"
            }
        ],
        aiGeneratedOverview: ""
    },
    "user4": {
        id: "user4",
        name: "Sarah Wilson",
        title: "DevOps Engineer",
        email: "sarah.wilson@example.com",
        skills: ["Kubernetes", "Docker", "CI/CD", "Terraform", "AWS", "Jenkins", "Monitoring"],
        rating: 4.9,
        location: "Seattle, WA",
        availability: "1 month",
        experience: "6 years",
        bio: "DevOps engineer focused on automating infrastructure and streamlining deployment processes.",
        challenges: [
            {
                id: "c1",
                name: "Kubernetes Migration",
                description: "Migrated applications from VMs to Kubernetes",
                techStack: ["Kubernetes", "Docker", "Helm"],
                score: 97,
                complexity: "Expert",
                completedAt: "2023-08-15"
            },
            {
                id: "c2",
                name: "Infrastructure as Code",
                description: "Implemented infrastructure as code with Terraform",
                techStack: ["Terraform", "AWS", "GitOps"],
                score: 95,
                complexity: "Advanced",
                completedAt: "2023-10-20"
            },
            {
                id: "c3",
                name: "CI/CD Pipeline",
                description: "Built a complete CI/CD pipeline for microservices",
                techStack: ["Jenkins", "Docker", "Kubernetes"],
                score: 96,
                complexity: "Advanced",
                completedAt: "2023-12-10"
            },
            {
                id: "c4",
                name: "Monitoring Solution",
                description: "Set up comprehensive monitoring and alerting",
                techStack: ["Prometheus", "Grafana", "ELK Stack"],
                score: 94,
                complexity: "Advanced",
                completedAt: "2024-02-05"
            },
            {
                id: "c5",
                name: "Security Automation",
                description: "Implemented automated security scanning in CI/CD",
                techStack: ["OWASP ZAP", "Jenkins", "Docker"],
                score: 92,
                complexity: "Expert",
                completedAt: "2024-04-15"
            },
            {
                id: "c6",
                name: "Cost Optimization",
                description: "Reduced cloud infrastructure costs by 30%",
                techStack: ["AWS", "Terraform", "Cost Explorer"],
                score: 98,
                complexity: "Intermediate",
                completedAt: "2024-06-20"
            }
        ],
        aiGeneratedOverview: ""
    },
    "user5": {
        id: "user5",
        name: "Omar Hassan",
        title: "Mobile Developer",
        email: "omar.hassan@example.com",
        skills: ["React Native", "iOS", "Android", "Firebase", "TypeScript", "Redux"],
        rating: 4.6,
        location: "Chicago, IL",
        availability: "2 weeks",
        experience: "3 years",
        bio: "Mobile developer specialized in cross-platform app development with React Native.",
        challenges: [
            {
                id: "c1",
                name: "E-commerce App",
                description: "Developed a cross-platform e-commerce mobile app",
                techStack: ["React Native", "Redux", "Firebase"],
                score: 91,
                complexity: "Intermediate",
                completedAt: "2023-09-05"
            },
            {
                id: "c2",
                name: "Push Notifications",
                description: "Implemented push notifications system for a mobile app",
                techStack: ["React Native", "Firebase Cloud Messaging", "Node.js"],
                score: 88,
                complexity: "Intermediate",
                completedAt: "2023-11-15"
            },
            {
                id: "c3",
                name: "Offline Mode",
                description: "Added offline functionality to a mobile application",
                techStack: ["React Native", "Redux Persist", "AsyncStorage"],
                score: 93,
                complexity: "Advanced",
                completedAt: "2024-01-10"
            },
            {
                id: "c4",
                name: "App Performance",
                description: "Optimized performance of a React Native application",
                techStack: ["React Native", "Profiling", "Optimization"],
                score: 89,
                complexity: "Advanced",
                completedAt: "2024-03-05"
            },
            {
                id: "c5",
                name: "Native Modules",
                description: "Integrated native functionality via custom modules",
                techStack: ["React Native", "Java", "Swift"],
                score: 85,
                complexity: "Expert",
                completedAt: "2024-05-15"
            }
        ],
        aiGeneratedOverview: ""
    },
    "user6": {
        id: "user6",
        name: "Lena Chen",
        title: "Data Scientist",
        email: "lena.chen@example.com",
        skills: ["Python", "TensorFlow", "SQL", "Machine Learning", "Data Visualization", "Statistical Analysis"],
        rating: 4.8,
        location: "Boston, MA",
        availability: "Immediate",
        experience: "4 years",
        bio: "Data scientist with expertise in machine learning and predictive modeling.",
        challenges: [
            {
                id: "c1",
                name: "Predictive Model",
                description: "Built a customer churn prediction model",
                techStack: ["Python", "Scikit-learn", "Pandas"],
                score: 96,
                complexity: "Advanced",
                completedAt: "2023-08-20"
            },
            {
                id: "c2",
                name: "NLP Classification",
                description: "Developed a text classification system using NLP",
                techStack: ["Python", "NLTK", "TensorFlow"],
                score: 94,
                complexity: "Advanced",
                completedAt: "2023-10-15"
            },
            {
                id: "c3",
                name: "Time Series Analysis",
                description: "Created a time series forecasting model for financial data",
                techStack: ["Python", "Pandas", "Prophet"],
                score: 92,
                complexity: "Expert",
                completedAt: "2023-12-05"
            },
            {
                id: "c4",
                name: "Recommendation System",
                description: "Built a collaborative filtering recommendation system",
                techStack: ["Python", "TensorFlow", "SQL"],
                score: 95,
                complexity: "Advanced",
                completedAt: "2024-02-10"
            },
            {
                id: "c5",
                name: "Data Pipeline",
                description: "Designed an ETL pipeline for large datasets",
                techStack: ["Python", "Airflow", "PostgreSQL"],
                score: 91,
                complexity: "Intermediate",
                completedAt: "2024-04-05"
            },
            {
                id: "c6",
                name: "Data Visualization",
                description: "Created interactive dashboards for business metrics",
                techStack: ["Python", "Dash", "Plotly"],
                score: 93,
                complexity: "Intermediate",
                completedAt: "2024-06-15"
            }
        ],
        aiGeneratedOverview: ""
    }
};

// Function to generate AI-powered overview using Gemini API
export const generateAIOverview = async (candidateData) => {
    try {
        // Format the candidate data for AI analysis
        const promptData = {
            name: candidateData.name,
            title: candidateData.title,
            skills: candidateData.skills,
            experience: candidateData.experience,
            challenges: candidateData.challenges.map(c => ({
                name: c.name,
                score: c.score,
                techStack: c.techStack,
                complexity: c.complexity
            }))
        };

        // Check if API key is available
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.includes('your-gemini')) {
            console.warn('Gemini API key not configured. Using fallback analysis.');
            return generateFallbackAnalysis(candidateData);
        }

        // Call Gemini API
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Please analyze this developer profile and provide a concise professional overview highlighting their key strengths, skill level based on challenge results, and potential fit for hiring. Keep it under at least under 150 words:
                        
                        Name: ${promptData.name}
                        Title: ${promptData.title}
                        Experience: ${promptData.experience}
                        Skills: ${promptData.skills.join(', ')}
                        
                        Completed Challenges:
                        ${promptData.challenges.map(c =>
                            `- ${c.name} (${c.complexity} complexity): ${c.score}/100 [${c.techStack.join(', ')}]`
                        ).join('\n')}
                        
                        Focus on concrete evidence of skills demonstrated through their challenges.`
                    }]
                }],
                generationConfig: {
                    temperature: 0.2,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 200,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Check for valid response structure
        if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Invalid response structure from Gemini API');
        }

        // Extract the generated text from the response
        const generatedText = data.candidates[0].content.parts[0].text;

        return generatedText;
    } catch (error) {
        console.error("Error generating AI overview:", error);
        return generateFallbackAnalysis(candidateData);
    }
};

// Fallback function to generate an analysis without the API
function generateFallbackAnalysis(candidateData) {
    // Calculate average score
    const avgScore = candidateData.challenges.reduce((sum, c) => sum + c.score, 0) / candidateData.challenges.length;

    // Count complexity levels
    const complexityCount = candidateData.challenges.reduce((acc, c) => {
        acc[c.complexity] = (acc[c.complexity] || 0) + 1;
        return acc;
    }, {});

    // Get highest complexity level
    const complexityLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    let highestComplexity = 'Beginner';
    for (const level of complexityLevels) {
        if (complexityCount[level]) highestComplexity = level;
    }

    // Generate primary skills based on frequency in challenges
    const skillCount = {};
    candidateData.challenges.forEach(c => {
        c.techStack.forEach(tech => {
            skillCount[tech] = (skillCount[tech] || 0) + 1;
        });
    });

    // Sort skills by frequency
    const primarySkills = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([skill]) => skill);

    return `${candidateData.name} is a ${candidateData.title} with ${candidateData.experience} of professional experience. 
    They demonstrate strong proficiency in ${primarySkills.join(', ')}, with an impressive average score of ${avgScore.toFixed(1)} 
    across ${candidateData.challenges.length} technical challenges, including ${complexityCount['Advanced'] || 0} advanced and 
    ${complexityCount['Expert'] || 0} expert-level tasks. Their performance shows particular strength in ${candidateData.challenges[0].name} 
    (scoring ${candidateData.challenges[0].score}/100), and they have successfully handled ${highestComplexity.toLowerCase()}-complexity projects.
    Based on their challenge results, ${candidateData.name} would be a valuable addition to teams needing expertise in 
    ${candidateData.skills.slice(0, 3).join(', ')}.`;
}

// Function to get candidate data
export const getCandidateData = async (userId) => {
    try {
        // In a real app, this would fetch from Firestore
        // For now, we'll use our mock data
        const mockData = mockCandidatesData[userId];
        if (!mockData) {
            throw new Error("Candidate not found");
        }

        // If there's no AI overview yet, generate one
        if (!mockData.aiGeneratedOverview) {
            mockData.aiGeneratedOverview = await generateAIOverview(mockData);
            // In a real app, we would update Firestore here
        }

        return mockData;
    } catch (error) {
        console.error("Error fetching candidate data:", error);
        throw error;
    }
};

// Function to get all candidates (for browsing)
export const getAllCandidates = async () => {
    // In a real app, this would fetch from Firestore with pagination
    // For now, return simplified data from our mock candidates
    return Object.values(mockCandidatesData).map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        title: candidate.title,
        skills: candidate.skills,
        rating: candidate.rating,
        completedChallenges: candidate.challenges.length,
        match: calculateMatchPercentage(candidate),
        location: candidate.location,
        availability: candidate.availability,
        experience: candidate.experience
    }));
};

// Helper function to calculate "match percentage" based on challenge scores and other factors
function calculateMatchPercentage(candidate) {
    // Simple calculation based on average challenge scores
    const avgScore = candidate.challenges.reduce((sum, challenge) => sum + challenge.score, 0) /
        candidate.challenges.length;

    // Adjust based on number of completed challenges (more is better)
    const challengeBonus = Math.min(candidate.challenges.length * 2, 10);

    // Calculate a score between 75-98%
    return Math.min(Math.round(avgScore - 10 + challengeBonus), 98);
} 