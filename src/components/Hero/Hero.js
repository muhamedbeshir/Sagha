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
  background: linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(20, 20, 20, 0.98) 50%, rgba(0, 0, 0, 1) 100%);
  
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
  font-size: 4rem;
  font-weight: 900;
  line-height: 0.9;
  margin-bottom: 30px;
  letter-spacing: -1px;
  
  @media (max-width: 1024px) {
    font-size: 3.5rem;
    letter-spacing: 0px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    letter-spacing: 0px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    letter-spacing: 0px;
  }
`;

const TitleLine = styled(motion.span)`
  display: block;
  color: #ffffff;
  margin-bottom: 20px;
  position: relative;
  transform-style: preserve-3d;
  
  &.diamond-text {
    background: linear-gradient(135deg, #fdc30e 0%, #ffffff 50%, #fdc30e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &.accent-text {
    background: linear-gradient(135deg, #fdc30e 0%, #ffffff 50%, #fdc30e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
  gap: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    
    .btn {
      width: 100%;
      max-width: 260px;
      padding: 14px 28px;
      font-size: 0.9rem;
    }
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
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(253, 195, 14, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    border-color: rgba(253, 195, 14, 0.6);
    box-shadow: 0 20px 40px rgba(253, 195, 14, 0.2);
  }
  
  &.large {
    width: 220px;
    height: 220px;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    
    &.large {
      width: 150px;
      height: 150px;
    }
  }
`;

const JewelryImage = styled.div`
  width: 120px;
  height: 120px;
  background: url(${props => props.src}) center/cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
  
  ${JewelryItem}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
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
