import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Diamond } from 'lucide-react';
import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(20, 20, 20, 0.98) 50%, rgba(0, 0, 0, 1) 100%),
    radial-gradient(ellipse at 30% 40%, rgba(253, 195, 14, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 60%, rgba(253, 195, 14, 0.08) 0%, transparent 50%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23fdc30e" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat,
      linear-gradient(45deg, transparent 49%, rgba(253, 195, 14, 0.02) 50%, transparent 51%);
    opacity: 0.6;
    animation: gridMove 20s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      rgba(253, 195, 14, 0.05) 60deg,
      transparent 120deg,
      rgba(253, 195, 14, 0.08) 180deg,
      transparent 240deg,
      rgba(253, 195, 14, 0.03) 300deg,
      transparent 360deg
    );
    animation: rotateBackground 30s linear infinite;
    pointer-events: none;
  }
  
  @keyframes gridMove {
    from { transform: translate(0, 0); }
    to { transform: translate(100px, 100px); }
  }
  
  @keyframes rotateBackground {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

const HeroText = styled.div`
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 6.5rem;
  font-weight: 900;
  line-height: 0.8;
  margin-bottom: 50px;
  letter-spacing: -4px;
  perspective: 1000px;
  transform-style: preserve-3d;
  
  @media (max-width: 1024px) {
    font-size: 5rem;
    letter-spacing: -3px;
  }
  
  @media (max-width: 768px) {
    font-size: 4rem;
    letter-spacing: -2px;
  }
  
  @media (max-width: 480px) {
    font-size: 3.2rem;
    letter-spacing: -1px;
  }
`;

const TitleLine = styled(motion.span)`
  display: block;
  color: #ffffff;
  margin-bottom: 20px;
  position: relative;
  transform-style: preserve-3d;
  
  &.diamond-text {
    background: linear-gradient(
      135deg,
      #fdc30e 0%,
      #ffffff 20%,
      #ffdb4d 40%,
      #ffffff 60%,
      #fdc30e 80%,
      #ffffff 100%
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: advancedShimmer 4s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(253, 195, 14, 0.6));
    
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(135deg, #fdc30e, #ffdb4d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(-10px);
      opacity: 0.3;
      filter: blur(2px);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 6px;
      background: linear-gradient(
        90deg,
        #fdc30e 0%,
        #ffdb4d 50%,
        transparent 100%
      );
      border-radius: 3px;
      box-shadow: 0 0 20px rgba(253, 195, 14, 0.5);
    }
  }
  
  &.accent-text {
    background: linear-gradient(
      135deg,
      #fdc30e 0%,
      #ffdb4d 25%,
      #ffffff 50%,
      #ffdb4d 75%,
      #fdc30e 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientPulse 3s ease-in-out infinite;
    filter: drop-shadow(0 0 40px rgba(253, 195, 14, 0.8));
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 100%
      );
      animation: lightSweep 4s infinite;
      z-index: 2;
    }
  }
  
  &:hover {
    transform: translateZ(20px) rotateX(5deg);
    transition: transform 0.3s ease;
  }
  
  @keyframes advancedShimmer {
    0%, 100% { 
      background-position: 0% 50%;
      transform: translateZ(0px);
    }
    25% { 
      background-position: 100% 0%;
      transform: translateZ(5px);
    }
    50% { 
      background-position: 200% 50%;
      transform: translateZ(10px);
    }
    75% { 
      background-position: 300% 100%;
      transform: translateZ(5px);
    }
  }
  
  @keyframes gradientPulse {
    0%, 100% { 
      background-position: 0% 50%;
      filter: drop-shadow(0 0 40px rgba(253, 195, 14, 0.8));
    }
    50% { 
      background-position: 100% 50%;
      filter: drop-shadow(0 0 60px rgba(253, 195, 14, 1));
    }
  }
  
  @keyframes lightSweep {
    0% { left: -100%; opacity: 0; }
    50% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 50px;
  line-height: 1.8;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 400px;
    order: -1;
  }
`;

const JewelryShowcase = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JewelryItem = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  backdrop-filter: blur(25px);
  border: 3px solid rgba(253, 195, 14, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(253, 195, 14, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: conic-gradient(
      from 0deg,
      #fdc30e 0deg,
      #ffdb4d 90deg,
      #fdc30e 180deg,
      #ffdb4d 270deg,
      #fdc30e 360deg
    );
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: borderRotate 3s linear infinite;
  }
  
  &:hover {
    transform: scale(1.1) rotateY(10deg);
    box-shadow: 
      0 35px 70px rgba(253, 195, 14, 0.3),
      0 0 0 2px rgba(253, 195, 14, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.large {
    width: 250px;
    height: 250px;
    border: 4px solid rgba(253, 195, 14, 0.5);
    
    &:hover {
      transform: scale(1.05) rotateY(5deg);
    }
  }
  
  @keyframes borderRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
    
    &.large {
      width: 180px;
      height: 180px;
    }
  }
`;

const JewelryImage = styled.div`
  width: 140px;
  height: 140px;
  background: url(${props => props.src}) center/cover;
  border-radius: 50%;
  position: relative;
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 30%,
      rgba(253, 195, 14, 0.1) 70%,
      rgba(253, 195, 14, 0.3) 100%
    );
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(253, 195, 14, 0.3) 90deg,
      transparent 180deg,
      rgba(253, 195, 14, 0.2) 270deg,
      transparent 360deg
    );
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: imageGlow 2s ease-in-out infinite;
  }
  
  ${JewelryItem}:hover & {
    transform: scale(1.1);
    
    &::before,
    &::after {
      opacity: 1;
    }
  }
  
  @keyframes imageGlow {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.6; }
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  
  span {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

const ScrollArrow = styled(motion.div)`
  width: 30px;
  height: 30px;
  border: 2px solid #fdc30e;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
`;

// Jewelry data with placeholder images (you can replace with real jewelry images)
const jewelryItems = [
  { 
    id: 1, 
    type: 'ring', 
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center',
    position: { top: '10%', left: '10%' }
  },
  { 
    id: 2, 
    type: 'necklace', 
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center',
    position: { top: '30%', right: '15%' },
    size: 'large'
  },
  { 
    id: 3, 
    type: 'earring', 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    position: { bottom: '20%', left: '25%' }
  }
];

const Hero = () => {
  const [activeJewelry, setActiveJewelry] = useState(null);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const jewelryVariants = {
    hidden: { scale: 0, rotate: 180, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: 1 + i * 0.2,
        duration: 0.8,
        ease: "backOut"
      }
    }),
    hover: {
      scale: 1.1,
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const scrollToNext = () => {
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      <HeroContent>
        <HeroText>
          <HeroTitle
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <TitleLine 
              variants={lineVariants}
              whileHover={{ 
                scale: 1.05,
                rotateX: 10,
                transition: { duration: 0.3 }
              }}
            >
              WHERE
            </TitleLine>
            <TitleLine 
              variants={lineVariants} 
              className="diamond-text"
              data-text="DIAMONDS"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              DIAMONDS
            </TitleLine>
            <TitleLine 
              variants={lineVariants} 
              className="accent-text"
              whileHover={{ 
                scale: 1.05,
                rotateZ: 2,
                transition: { duration: 0.3 }
              }}
            >
              SPEAK
            </TitleLine>
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            Discover an exclusive collection of premium jewelry that tells a story of beauty, elegance, and timeless sophistication
          </HeroSubtitle>

          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
          >
            <button className="btn btn-primary">
              <Sparkles size={18} />
              Explore Collection
            </button>
            <button className="btn btn-secondary">
              <Diamond size={18} />
              View Catalog
            </button>
          </HeroButtons>
        </HeroText>

        <HeroVisual>
          <JewelryShowcase>
            {jewelryItems.map((item, index) => (
              <JewelryItem
                key={item.id}
                style={item.position}
                variants={jewelryVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                onHoverStart={() => setActiveJewelry(item.id)}
                onHoverEnd={() => setActiveJewelry(null)}
                className={item.size === 'large' ? 'large' : ''}
              >
                <JewelryImage src={item.image} />
              </JewelryItem>
            ))}
          </JewelryShowcase>
        </HeroVisual>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
        onClick={scrollToNext}
      >
        <span>Scroll to explore</span>
        <ScrollArrow
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
