import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import styled from 'styled-components';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fdc30e 0%, #ffdb4d 50%, #fdc30e 100%);
  background-size: 200% 200%;
  border: none;
  border-radius: 50%;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 10px 30px rgba(253, 195, 14, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  z-index: 1000;
  animation: gradient-shift 3s ease infinite;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 
      0 15px 40px rgba(253, 195, 14, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  
  &:active {
    transform: translateY(-3px) scale(1.05);
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
`;

const ProgressRing = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #fdc30e 0%, #fdc30e ${props => props.progress}%, transparent ${props => props.progress}%, transparent 100%);
  padding: 3px;
  
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 60px;
    height: 60px;
    background: #000000;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    top: -3px;
    left: -3px;
    
    &::before {
      width: 50px;
      height: 50px;
    }
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { 
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ProgressRing progress={scrollProgress} />
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </motion.div>
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
