import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Collections from './components/Collections/Collections';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle scroll to update current section
    const handleScroll = () => {
      const sections = ['home', 'collections', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { opacity: 0 }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="main-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Background Effects */}
            <ParticleBackground />
            
            {/* Navigation */}
            <Navbar currentSection={currentSection} />
            
            {/* Main Sections */}
            <main>
              <Hero />
              <Collections />
              <About />
              <Contact />
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Scroll to Top */}
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
