import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import BookingPage from './pages/BookingPage';
import Profile from './pages/Profile';
import AuthModal from './components/AuthModal';
import './styles/index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Banquet from './pages/Banquet';
import Dining from './pages/Dining';
import Facilities from './pages/Facilities';
import Attractions from './pages/Attractions';
import Gallery from './pages/Gallery';

// Placeholder components for each section
const Section = ({ id, title, children }) => (
  <section id={id} className="py-16 px-4 max-w-5xl mx-auto scroll-mt-24" data-aos="fade-up">
    <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-wider">{title}</h2>
    <div className="text-lg leading-relaxed">{children}</div>
  </section>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-elitestay-white">
        <Navbar user={user} onOpenAuthModal={() => setAuthModalOpen(true)} />
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/banquet" element={<Banquet />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 