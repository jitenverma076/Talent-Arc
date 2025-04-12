import { createContext, useState } from 'react';
import AuthModal from '../components/AuthModal';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <ModalContext.Provider value={{ isAuthModalOpen, openAuthModal, closeAuthModal }}>
            {children}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
            />
        </ModalContext.Provider>
    );
}; 