import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-8xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="w-64 h-64 mx-auto relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse delay-75"></div>
                    <div className="absolute inset-8 bg-primary/30 rounded-full animate-pulse delay-150"></div>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                    <Home size={20} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
} 