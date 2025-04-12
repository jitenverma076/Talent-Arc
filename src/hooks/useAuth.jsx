import { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase config is properly set
const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey &&
        firebaseConfig.apiKey !== 'your-firebase-api-key' &&
        firebaseConfig.authDomain &&
        firebaseConfig.projectId;
};

// Create the auth context
const AuthContext = createContext(null);

// Create the provider component
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        if (!isFirebaseConfigured()) {
            console.error("Firebase is not properly configured! Authentication will not work.");
            setAuthError("Firebase configuration missing. Please check your .env file.");
            setLoading(false);
            return;
        }

        try {
            // Initialize Firebase only if no app instances exist
            if (!getApps().length) {
                initializeApp(firebaseConfig);
            }
            const auth = getAuth();
            setFirebaseInitialized(true);

            // Listen for auth state changes
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });

            // Cleanup subscription
            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization error:", error);
            setAuthError("Firebase initialization failed: " + error.message);
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        setAuthError(null);

        if (!firebaseInitialized) {
            setAuthError("Firebase is not properly configured. Unable to authenticate.");
            throw new Error("Firebase is not properly configured. Unable to authenticate.");
        }

        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Login error:", error);
            setAuthError(error.message);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        setAuthError(null);

        if (!firebaseInitialized) {
            setAuthError("Firebase is not properly configured. Unable to register.");
            throw new Error("Firebase is not properly configured. Unable to register.");
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // You could update the user profile here to add the name
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Registration error:", error);
            setAuthError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        if (!firebaseInitialized) {
            setUser(null);
            return;
        }

        try {
            const auth = getAuth();
            await signOut(auth);
            // Firebase's onAuthStateChanged will handle setting user to null
        } catch (error) {
            console.error("Logout error:", error);
            setAuthError(error.message);
        }
    };

    // Create the auth context value
    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
        authError,
        isFirebaseConfigured: firebaseInitialized
    };

    // Provide the auth context to children
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Export the useAuth hook
function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Export both components with named exports for better HMR compatibility
export { AuthProvider, useAuth }; 