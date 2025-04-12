import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

export default function Contact() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Add the form data to Firestore
            await addDoc(collection(db, 'contacts'), {
                ...formData,
                userId: user?.uid || null,
                userEmail: user?.email || null,
                createdAt: serverTimestamp(),
                status: 'new'
            });

            setIsSubmitting(false);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Error submitting contact form:', err);
            setIsSubmitting(false);
            setError('There was an error submitting your message. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6 text-foreground">Contact Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions about TalentArc? We're here to help with your talent matching needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Information */}
                    <div>
                        <div className="card p-8 bg-primary/5 dark:bg-primary/10 border border-border/50 shadow-sm rounded-xl">
                            <h2 className="text-2xl font-bold mb-8 text-foreground">Get in Touch</h2>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                        <MapPin className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">Our Location</h3>
                                        <p className="text-muted-foreground">
                                            Available for remote collaboration
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                        <Mail className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">Email Us</h3>
                                        <p className="text-muted-foreground">
                                            jitenverma076@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                        <Phone className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">Call Us</h3>
                                        <p className="text-muted-foreground">
                                            +91 xxxxx-xxxxx<br />
                                            Mon-Fri: 9AM to 5PM IST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="card p-8 border border-border/50 shadow-sm rounded-xl">
                            <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h2>

                            {success ? (
                                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-6 rounded-xl mb-6 text-center">
                                    <p className="text-lg font-medium">Thank you for your message!</p>
                                    <p>We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-xl">
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="input w-full bg-background border border-border/70 p-2.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input w-full bg-background border border-border/70 p-2.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="input w-full bg-background border border-border/70 p-2.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="8"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="input w-full bg-background border border-border/70 p-2.5 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                                            placeholder="Your message here..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full flex items-center justify-center py-3 transition-all rounded-xl"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </div>
                                        ) : (
                                            <>
                                                Send Message <Send size={16} className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 