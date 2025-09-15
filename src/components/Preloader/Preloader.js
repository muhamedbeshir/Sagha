import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PreloaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DiamondContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const Diamond = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #fdc30e, #ffffff, #fdc30e, #ffdb4d);
  background-size: 400% 400%;
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, #fdc30e, transparent, #fdc30e);
    clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
    z-index: -1;
    filter: blur(20px);
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: #ffffff;
    clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
    animation: inner-sparkle 2s ease-in-out infinite;
  }

  @keyframes inner-sparkle {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
  }
`;

const LoadingText = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 800;
  color: #fdc30e;
  letter-spacing: 8px;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(253, 195, 14, 0.5);
  font-family: 'Source Serif 4', serif;
`;

const LoadingSubtext = styled(motion.p)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 2px;
  background: rgba(253, 195, 14, 0.2);
  border-radius: 1px;
  overflow: hidden;
  margin-top: 30px;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #fdc30e, #ffdb4d);
  border-radius: 1px;
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fdc30e;
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
`;

const Preloader = () => {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const diamondVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: { 
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
    }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: { duration: 2.5, ease: "easeInOut" }
    }
  };

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => (
    <Particle
      key={i}
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0
      }}
      animate={{
        y: [null, -100, -200],
        opacity: [0, 1, 0],
        rotate: 360
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeOut"
      }}
      style={{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%'
      }}
    />
  ));

  return (
    <PreloaderContainer
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <FloatingParticles>
        {particles}
      </FloatingParticles>
      
      <DiamondContainer>
        <Diamond
          variants={diamondVariants}
          initial="initial"
          animate="animate"
        />
      </DiamondContainer>
      
      <LoadingText
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        SOGHA
      </LoadingText>
      
      <LoadingSubtext
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        Where Diamonds Speak
      </LoadingSubtext>
      
      <ProgressBar>
        <ProgressFill
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </ProgressBar>
    </PreloaderContainer>
  );
};

export default Preloader;
