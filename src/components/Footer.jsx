import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-foreground font-semibold">
                            TalentArc
                        </Link>
                        <nav className="flex gap-6">
                            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                                How it Works
                            </Link>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                Terms
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://twitter.com/TalentArc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://github.com/TalentArc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/company/TalentArc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    © {currentYear} TalentArc. All rights reserved.
                </div>
            </div>
        </footer>
    );
} 