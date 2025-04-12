import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './components/ThemeProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import your pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import AdminDashboard from './pages/AdminDashboard';
import HowItWorks from './pages/HowItWorks';
import Challenges from './pages/Challenges';
import Companies from './pages/Companies';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ModalProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route
                    path="/dashboard/*"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requiredPermissions={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </ModalProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
