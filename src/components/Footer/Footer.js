import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: #000000;
  border-top: 1px solid rgba(253, 195, 14, 0.3);
  padding: 60px 0 30px;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
`;

const FooterLogo = styled(motion.div)`
  text-align: center;
  
  h3 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #fdc30e;
    letter-spacing: 4px;
    text-shadow: 0 0 30px rgba(253, 195, 14, 0.5);
    margin-bottom: 8px;
    font-family: 'Source Serif 4', serif;
  }
  
  span {
    font-size: 1rem;
    color: #ffffff;
    letter-spacing: 2px;
    display: block;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  background: linear-gradient(145deg, rgba(253, 195, 14, 0.1), rgba(253, 195, 14, 0.05));
  border: 2px solid rgba(253, 195, 14, 0.3);
  border-radius: 50%;
  color: #fdc30e;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.3rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #fdc30e, #ffdb4d);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 15px 35px rgba(253, 195, 14, 0.4);
    border-color: #fdc30e;
    
    &::before {
      opacity: 1;
    }
    
    svg {
      color: #000000;
      z-index: 2;
      position: relative;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(253, 195, 14, 0.2);
  position: relative;
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const MadeWithLove = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  
  svg {
    color: #ff6b6b;
    animation: heartbeat 2s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const FloatingDiamonds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const Diamond = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fdc30e;
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  opacity: 0.3;
`;

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

const Footer = () => {
  const logoVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const socialVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Generate floating diamonds
  const floatingDiamonds = Array.from({ length: 12 }, (_, i) => (
    <Diamond
      key={i}
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * 200,
        opacity: 0
      }}
      animate={{
        y: [null, -50, -100],
        opacity: [0, 0.3, 0],
        rotate: 360
      }}
      transition={{
        duration: 6 + Math.random() * 3,
        repeat: Infinity,
        delay: Math.random() * 3,
        ease: "easeInOut"
      }}
    />
  ));

  return (
    <FooterSection>
      <FloatingDiamonds>
        {floatingDiamonds}
      </FloatingDiamonds>
      
      <Container>
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FooterContent>
            <FooterLogo variants={logoVariants}>
              <h3>SOGHA</h3>
              <span>Jewelry</span>
              <p>WHERE DIAMONDS SPEAK</p>
            </FooterLogo>

            <SocialLinks>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <SocialLink
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    variants={socialVariants}
                    whileHover="hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent size={22} />
                  </SocialLink>
                );
              })}
            </SocialLinks>
          </FooterContent>

          <FooterBottom>
            <Copyright>
              <span>&copy; 2024 SOGHA Jewelry. All rights reserved.</span>
              <MadeWithLove>
                Made with <Heart size={16} /> for luxury jewelry lovers
              </MadeWithLove>
            </Copyright>
          </FooterBottom>
        </motion.div>
      </Container>
    </FooterSection>
  );
};

export default Footer;
