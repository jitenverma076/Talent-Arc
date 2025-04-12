import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // You can also log the error to an error reporting service here
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                    <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong</h2>
                        <p className="text-muted-foreground mb-4">
                            We're sorry, but something went wrong. Please try refreshing the page or contact support if the problem persists.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Refresh Page
                        </button>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-4">
                                <details className="text-sm text-muted-foreground">
                                    <summary className="cursor-pointer">Error Details</summary>
                                    <pre className="mt-2 p-4 bg-muted rounded-md overflow-auto">
                                        {this.state.error && this.state.error.toString()}
                                        <br />
                                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 