import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gem, Crown, Star, ArrowRight } from 'lucide-react';
import styled from 'styled-components';

const CollectionsSection = styled.section`
  padding: 120px 0;
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(253, 195, 14, 0.08)),
    radial-gradient(ellipse at top, rgba(253, 195, 14, 0.05) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23fdc30e" fill-opacity="0.02"><polygon points="30,0 60,30 30,60 0,30"/></g></svg>') repeat;
    opacity: 0.3;
    animation: float 20s linear infinite;
  }
  
  @keyframes float {
    from { transform: translateX(-60px); }
    to { transform: translateX(60px); }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 100px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 800;
  color: #fdc30e;
  margin-bottom: 30px;
  text-shadow: 0 0 30px rgba(253, 195, 14, 0.3);
  line-height: 1;
  letter-spacing: -2px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const TitleWord = styled(motion.span)`
  display: inline-block;
  margin-right: 20px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    text-shadow: 0 10px 20px rgba(253, 195, 14, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #fdc30e, transparent);
    transition: width 0.4s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CollectionCard = styled(motion.div)`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(253, 195, 14, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(253, 195, 14, 0.1), transparent);
    transition: left 0.6s ease;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-20px) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(253, 195, 14, 0.25),
      0 0 0 1px rgba(253, 195, 14, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(253, 195, 14, 0.5);
    
    &::before {
      left: 100%;
    }
  }
`;

const CardImage = styled.div`
  height: 300px;
  position: relative;
  background: linear-gradient(45deg, #000000, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  ${CollectionCard}:hover & img {
    transform: scale(1.1);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(253, 195, 14, 0.15));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  
  ${CollectionCard}:hover & {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: #fdc30e;
  text-shadow: 0 0 30px rgba(253, 195, 14, 0.5);
  z-index: 3;
  transition: all 0.4s ease;
  
  ${CollectionCard}:hover & {
    transform: translate(-50%, -50%) scale(1.2) rotate(15deg);
  }
`;

const CardContent = styled.div`
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
  font-family: 'Source Serif 4', serif;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
`;

const CardButton = styled.button`
  background: transparent;
  border: 2px solid #fdc30e;
  color: #fdc30e;
  padding: 12px 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  
  &:hover {
    background: #fdc30e;
    color: #000000;
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(253, 195, 14, 0.3);
  }
`;

const collections = [
  {
    id: 1,
    title: 'Diamond Collection',
    description: 'Stunning pieces featuring pure, brilliant diamonds that capture and reflect light with unmatched brilliance',
    icon: Gem,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 2,
    title: 'Gold Collection',
    description: 'Royal designs crafted from pure gold, embodying luxury and timeless elegance in every piece',
    icon: Crown,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 3,
    title: 'Platinum Collection',
    description: 'Unmatched elegance with premium platinum, offering durability and sophisticated beauty',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&crop=center'
  }
];

const Collections = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <CollectionsSection id="collections" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <TitleWord variants={wordVariants}>EXCLUSIVE</TitleWord>
            <TitleWord variants={wordVariants}>COLLECTIONS</TitleWord>
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Exceptional jewelry pieces crafted with extraordinary care and precision, representing the pinnacle of luxury and artisanship
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <CollectionsGrid>
            {collections.map((collection, index) => {
              const IconComponent = collection.icon;
              return (
                <CollectionCard
                  key={collection.id}
                  variants={cardVariants}
                  onHoverStart={() => setHoveredCard(collection.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardImage>
                    <img src={collection.image} alt={collection.title} />
                    <CardOverlay />
                    <CardIcon>
                      <IconComponent />
                    </CardIcon>
                  </CardImage>
                  
                  <CardContent>
                    <CardTitle>{collection.title}</CardTitle>
                    <CardDescription>{collection.description}</CardDescription>
                    <CardButton>
                      Discover More
                      <ArrowRight size={16} />
                    </CardButton>
                  </CardContent>
                </CollectionCard>
              );
            })}
          </CollectionsGrid>
        </motion.div>
      </Container>
    </CollectionsSection>
  );
};

export default Collections;
