import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, Phone, Globe } from 'lucide-react';
import styled from 'styled-components';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &.scrolled {
    backdrop-filter: blur(40px);
    background: linear-gradient(
      135deg, 
      rgba(0, 0, 0, 0.95) 0%,
      rgba(20, 20, 20, 0.98) 50%,
      rgba(0, 0, 0, 0.95) 100%
    );
    border-bottom: 1px solid rgba(253, 195, 14, 0.2);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(253, 195, 14, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(253, 195, 14, 0.05) 20%,
      rgba(253, 195, 14, 0.1) 50%,
      rgba(253, 195, 14, 0.05) 80%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &.scrolled::before {
    opacity: 1;
  }
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 32px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 40px;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px 16px;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(20, 20, 20, 0.95) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    backdrop-filter: blur(30px);
    border-bottom: 1px solid rgba(253, 195, 14, 0.2);
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(253, 195, 14, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(253, 195, 14, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 8px;
  }
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(
    135deg,
    #fdc30e 0%,
    #ffdb4d 25%,
    #ffffff 50%,
    #ffdb4d 75%,
    #fdc30e 100%
  );
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  position: relative;
  animation: logoRotate 8s linear infinite;
  filter: drop-shadow(0 0 20px rgba(253, 195, 14, 0.6));
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background: #000000;
    clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  }
  
  @keyframes logoRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LogoBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const LogoText = styled.h1`
  font-size: 2.4rem;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    #fdc30e 0%,
    #ffffff 25%,
    #fdc30e 50%,
    #ffffff 75%,
    #fdc30e 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  margin: 0;
  font-family: 'Source Serif 4', serif;
  animation: logoGradient 4s ease-in-out infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #fdc30e, transparent);
    border-radius: 1px;
  }
  
  @keyframes logoGradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }
`;

const LogoSubtitle = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: -4px;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    letter-spacing: 2px;
  }
`;

const NavMenu = styled(motion.ul)`
  display: flex;
  list-style: none;
  gap: 8px;
  margin: 0;
  padding: 8px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(253, 195, 14, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(253, 195, 14, 0.05),
      transparent
    );
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    position: static;
    flex-direction: row;
    gap: 4px;
    padding: 6px 8px;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 100%
    );
    backdrop-filter: blur(25px);
    border-radius: 16px;
    border: 1px solid rgba(253, 195, 14, 0.2);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
    height: auto;
    transition: none;
    
    &::before {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(253, 195, 14, 0.08),
        transparent
      );
      opacity: 1;
    }
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: ${props => props.isActive ? '#000000' : '#ffffff'};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  padding: 14px 24px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(15px);
  text-shadow: ${props => props.isActive 
    ? 'none' 
    : '0 2px 4px rgba(0, 0, 0, 0.5)'
  };
  
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #fdc30e 0%, #ffdb4d 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))'
  };
  
  box-shadow: ${props => props.isActive 
    ? '0 10px 30px rgba(253, 195, 14, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.4)'
    : '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(253, 195, 14, 0.2),
      transparent
    );
    transition: left 0.6s ease;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #fdc30e, #ffdb4d);
    transition: width 0.4s ease;
    border-radius: 1px;
    z-index: 2;
  }
  
  &:hover {
    color: ${props => props.isActive ? '#000000' : '#fdc30e'};
    text-shadow: ${props => props.isActive 
      ? 'none' 
      : '0 0 20px rgba(253, 195, 14, 0.8), 0 2px 4px rgba(0, 0, 0, 0.5)'
    };
    transform: translateY(-3px) scale(1.02);
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #ffdb4d 0%, #fdc30e 100%)'
      : 'linear-gradient(135deg, rgba(253, 195, 14, 0.2), rgba(253, 195, 14, 0.1))'
    };
    box-shadow: ${props => props.isActive 
      ? '0 15px 40px rgba(253, 195, 14, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.5)'
      : '0 12px 35px rgba(253, 195, 14, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
    };
    
    &::before {
      left: 100%;
    }
    
    &::after {
      width: 90%;
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 8px 12px;
    color: ${props => props.isActive ? '#000000' : '#ffffff'};
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #fdc30e 0%, #ffdb4d 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))'
    };
    border: 1px solid ${props => props.isActive 
      ? 'rgba(253, 195, 14, 0.6)'
      : 'rgba(255, 255, 255, 0.2)'
    };
    text-shadow: ${props => props.isActive 
      ? 'none' 
      : '0 2px 4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(253, 195, 14, 0.4)'
    };
    box-shadow: ${props => props.isActive 
      ? '0 8px 20px rgba(253, 195, 14, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
      : '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    };
    letter-spacing: 0.5px;
    min-width: 60px;
    text-align: center;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled(motion.button)`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(253, 195, 14, 0.15);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #fdc30e, #ffdb4d);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }
  
  &:hover {
    color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(253, 195, 14, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      z-index: 2;
      position: relative;
    }
  }
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  width: 48px;
  height: 48px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(253, 195, 14, 0.2);
  border-radius: 16px;
  color: #fdc30e;
  cursor: pointer;
  z-index: 1001;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #fdc30e, #ffdb4d);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }
  
  &:hover {
    color: #000000;
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(253, 195, 14, 0.4);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      z-index: 2;
      position: relative;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navbar = ({ currentSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'collections', label: 'Collections', icon: null },
    { id: 'about', label: 'About', icon: null },
    { id: 'contact', label: 'Contact', icon: null }
  ];

  const actionButtons = [
    { icon: Search, label: 'Search' },
    { icon: User, label: 'Account' },
    { icon: ShoppingBag, label: 'Cart' }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } }
    }
  };

  return (
    <NavContainer
      ref={navRef}
      className={isScrolled ? 'scrolled' : ''}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        opacity: navOpacity,
        scale: navScale,
        background: isScrolled 
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(253, 195, 14, 0.1) 0%, transparent 50%)`
          : 'transparent'
      }}
    >
      <NavContent>
        {/* Logo */}
        <Logo
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('home')}
        >
          <LogoIcon />
          <LogoBrand>
            <LogoText>SOGHA</LogoText>
            <LogoSubtitle>Jewelry</LogoSubtitle>
          </LogoBrand>
        </Logo>

        {/* Navigation Menu */}
        <NavMenu
          isOpen={isMobileMenuOpen}
          variants={menuVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
        >
          {navItems.map((item, index) => (
            <NavItem
              key={item.id}
              variants={itemVariants}
            >
              <NavLink
                isActive={currentSection === item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 }
                }}
              >
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </NavMenu>

        {/* Action Buttons */}
        <ActionButtons>
          {actionButtons.map((button, index) => {
            const IconComponent = button.icon;
            return (
              <ActionButton
                key={button.label}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }
                }}
                aria-label={button.label}
                title={button.label}
              >
                <IconComponent size={20} />
              </ActionButton>
            );
          })}
        </ActionButtons>

        {/* Mobile Menu Button */}
        <HamburgerButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </HamburgerButton>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
