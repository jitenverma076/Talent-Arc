import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Create a new document or update an existing one
 * @param {string} collectionName - The name of the collection
 * @param {string} id - Document ID
 * @param {object} data - Document data
 * @param {boolean} merge - Whether to merge with existing data
 */
export const setDocument = async (collectionName, id, data, merge = true) => {
    const docRef = doc(db, collectionName, id);
    return setDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
        ...(merge ? {} : { createdAt: serverTimestamp() })
    }, { merge });
};

/**
 * Create a new document with auto-generated ID
 * @param {string} collectionName - The name of the collection
 * @param {object} data - Document data
 */
export const createDocument = async (collectionName, data) => {
    const docRef = doc(collection(db, collectionName));
    await setDoc(docRef, {
        ...data,
        id: docRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    return docRef.id;
};

/**
 * Get a document by ID
 * @param {string} collectionName - The name of the collection
 * @param {string} id - Document ID
 */
export const getDocument = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Update an existing document
 * @param {string} collectionName - The name of the collection
 * @param {string} id - Document ID
 * @param {object} data - Document data to update
 */
export const updateDocument = async (collectionName, id, data) => {
    const docRef = doc(db, collectionName, id);
    return updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
};

/**
 * Delete a document
 * @param {string} collectionName - The name of the collection
 * @param {string} id - Document ID
 */
export const deleteDocument = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    return deleteDoc(docRef);
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - The name of the collection
 */
export const getCollection = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Query documents with filters
 * @param {string} collectionName - The name of the collection
 * @param {array} conditions - Array of where conditions: [field, operator, value]
 * @param {array} sortBy - Array of orderBy conditions: [field, direction]
 * @param {number} limitTo - Number of documents to limit to
 */
export const queryDocuments = async (collectionName, conditions = [], sortBy = [], limitTo = null) => {
    let collectionRef = collection(db, collectionName);

    // Build query
    const queryConstraints = [];

    // Add where conditions
    conditions.forEach(([field, operator, value]) => {
        queryConstraints.push(where(field, operator, value));
    });

    // Add orderBy
    sortBy.forEach(([field, direction]) => {
        queryConstraints.push(orderBy(field, direction));
    });

    // Add limit
    if (limitTo) {
        queryConstraints.push(limit(limitTo));
    }

    const q = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}; 