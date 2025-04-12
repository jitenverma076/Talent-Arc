import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';
import { setDocument } from './firestore';

const googleProvider = new GoogleAuthProvider();

/**
 * Register a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {object} userData - Additional user data to store in Firestore
 */
export const registerWithEmail = async (email, password, userData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDocument('users', user.uid, {
            email: user.email,
            uid: user.uid,
            ...userData
        });

        // Send email verification
        await sendEmailVerification(user);

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 */
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Store user data in Firestore
        await setDocument('users', user.uid, {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        }, true);

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Log out the current user
 */
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

/**
 * Send a password reset email
 * @param {string} email - User email
 */
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

/**
 * Update user profile
 * @param {object} profileData - Profile data to update (displayName, photoURL)
 */
export const updateUserProfile = async (profileData) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is signed in');

        await updateProfile(user, profileData);

        // Update Firestore user data
        await setDocument('users', user.uid, profileData, true);

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Update user email
 * @param {string} newEmail - New email address
 * @param {string} password - Current password for verification
 */
export const changeEmail = async (newEmail, password) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is signed in');

        // Re-authenticate user before changing email
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        await updateEmail(user, newEmail);

        // Update Firestore user data
        await setDocument('users', user.uid, { email: newEmail }, true);

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Update user password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 */
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is signed in');

        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Listen to auth state changes
 * @param {function} callback - Callback function with user object
 * @returns {function} - Unsubscribe function
 */
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}; 