import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 120px 0;
  background: #000000;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const AboutText = styled.div`
  z-index: 2;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  color: #fdc30e;
  margin-bottom: 40px;
  text-shadow: 0 0 30px rgba(253, 195, 14, 0.3);
  line-height: 1;
  letter-spacing: -2px;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
    text-align: center;
  }
`;

const TitleWord = styled(motion.span)`
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    text-shadow: 0 10px 20px rgba(253, 195, 14, 0.5);
  }
`;

const AboutParagraph = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 30px;
  line-height: 1.8;
  font-family: 'Inter', sans-serif;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 30px;
  background: rgba(253, 195, 14, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(253, 195, 14, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(253, 195, 14, 0.15);
    border-color: rgba(253, 195, 14, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(253, 195, 14, 0.2);
  }
`;

const StatNumber = styled.span`
  font-size: 3rem;
  font-weight: 800;
  color: #fdc30e;
  display: block;
  text-shadow: 0 0 20px rgba(253, 195, 14, 0.5);
  font-family: 'Source Serif 4', serif;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
  display: block;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AboutVisual = styled.div`
  position: relative;
  height: 500px;
  
  @media (max-width: 768px) {
    height: 400px;
    order: -1;
  }
`;

const VisualContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandShowcase = styled(motion.div)`
  text-align: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  padding: 60px 40px;
  border-radius: 30px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(253, 195, 14, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(253, 195, 14, 0.1), transparent);
    animation: rotate 10s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const BrandLogo = styled.div`
  position: relative;
  z-index: 2;
  
  h3 {
    font-size: 3.5rem;
    font-weight: 800;
    color: #fdc30e;
    letter-spacing: 6px;
    text-shadow: 0 0 40px rgba(253, 195, 14, 0.5);
    margin-bottom: 10px;
    font-family: 'Source Serif 4', serif;
  }
  
  span {
    font-size: 1.3rem;
    color: #ffffff;
    letter-spacing: 3px;
    display: block;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
  }
`;

const BrandSlogan = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 30px;
  letter-spacing: 2px;
  font-style: italic;
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 2;
`;

const FloatingDiamonds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Diamond = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fdc30e;
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  opacity: 0.8;
`;

const stats = [
  { number: 1000, label: 'Jewelry Pieces', suffix: '+' },
  { number: 500, label: 'Happy Clients', suffix: '+' },
  { number: 10, label: 'Years Experience', suffix: '' }
];

const About = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(timer);
          }
          
          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = Math.floor(current);
            return newNumbers;
          });
        }, duration / steps);
      });
    }
  }, [inView]);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingDiamonds = Array.from({ length: 8 }, (_, i) => (
    <Diamond
      key={i}
      initial={{
        x: Math.random() * 400,
        y: Math.random() * 400,
        rotate: 0,
        opacity: 0.4
      }}
      animate={{
        y: [null, -50, -100],
        rotate: 360,
        opacity: [0.4, 0.8, 0.4]
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeInOut"
      }}
    />
  ));

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <AboutContent>
          <AboutText>
            <AboutTitle
              variants={titleVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <TitleWord variants={wordVariants}>THE</TitleWord>
              <TitleWord variants={wordVariants}>SOGHA</TitleWord>
              <TitleWord variants={wordVariants}>STORY</TitleWord>
            </AboutTitle>

            <AboutParagraph
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              In the world of jewelry, SOGHA stands as a symbol of luxury and exceptional quality. We believe that every piece of jewelry tells a unique story and reflects the personality of its wearer.
            </AboutParagraph>

            <AboutParagraph
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              Since our founding, we have been committed to delivering the finest jewelry crafted with superior artisanship and innovative designs that blend authentic heritage with contemporary modernity.
            </AboutParagraph>

            <StatsContainer>
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                >
                  <StatNumber>
                    {animatedNumbers[index]}{stat.suffix}
                  </StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsContainer>
          </AboutText>

          <AboutVisual>
            <VisualContainer>
              <FloatingDiamonds>
                {floatingDiamonds}
              </FloatingDiamonds>
              
              <BrandShowcase
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={inView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0 
                } : { 
                  opacity: 0, 
                  scale: 0.8, 
                  rotateY: 45 
                }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              >
                <BrandLogo>
                  <h3>SOGHA</h3>
                  <span>Jewelry</span>
                </BrandLogo>
                <BrandSlogan>WHERE DIAMONDS SPEAK</BrandSlogan>
              </BrandShowcase>
            </VisualContainer>
          </AboutVisual>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
