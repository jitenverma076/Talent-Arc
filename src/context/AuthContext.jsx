import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up with email/password
    async function signup(email, password, name) {
        try {
            // Create the user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's profile with their name
            await updateProfile(user, { displayName: name });

            // Create a user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,  // Include UID to match security rules
                name,
                displayName: name,
                email,
                createdAt: serverTimestamp(),
                role: 'user'
            }, { merge: true });  // Use merge option to handle potential conflicts

            return user;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    }

    // Sign in with email/password
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Sign out
    function logout() {
        return signOut(auth);
    }

    // Subscribe to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
} 