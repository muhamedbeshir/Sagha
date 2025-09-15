import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Globe, Clock, Send, Phone, Mail } from 'lucide-react';
import styled from 'styled-components';

const ContactSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, rgba(253, 195, 14, 0.05), rgba(0, 0, 0, 0.9));
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
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
  margin-bottom: 10px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    text-shadow: 0 10px 20px rgba(253, 195, 14, 0.5);
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const ContactInfo = styled.div`
  padding: 20px 0;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: 20px;
  border: 1px solid rgba(253, 195, 14, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(253, 195, 14, 0.1);
    transform: translateX(10px);
    border-color: rgba(253, 195, 14, 0.4);
    box-shadow: 0 10px 30px rgba(253, 195, 14, 0.2);
  }
`;

const InfoIcon = styled.div`
  font-size: 2.2rem;
  color: #fdc30e;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContent = styled.div`
  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
    font-family: 'Source Serif 4', serif;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
  }
`;

const ContactForm = styled(motion.form)`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  padding: 50px 40px;
  border-radius: 30px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(253, 195, 14, 0.2);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 18px 24px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(253, 195, 14, 0.3);
  border-radius: 15px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #fdc30e;
    background: rgba(253, 195, 14, 0.1);
    box-shadow: 0 0 25px rgba(253, 195, 14, 0.2);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 18px 24px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(253, 195, 14, 0.3);
  border-radius: 15px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #fdc30e;
    background: rgba(253, 195, 14, 0.1);
    box-shadow: 0 0 25px rgba(253, 195, 14, 0.2);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 18px 36px;
  background: linear-gradient(135deg, #fdc30e 0%, #ffdb4d 50%, #fdc30e 100%);
  background-size: 200% 200%;
  color: #000000;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
  box-shadow: 
    0 12px 35px rgba(253, 195, 14, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  animation: gradient-shift 3s ease infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 20px 45px rgba(253, 195, 14, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fdc30e;
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  opacity: 0.6;
`;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: 'Ritzy Plaza, Sheikh Zayed City, Egypt'
  },
  {
    icon: Globe,
    title: 'Website',
    content: 'www.sogha.com'
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    content: 'Saturday - Thursday: 10:00 AM - 10:00 PM'
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+20 123 456 7890'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@sogha.com'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
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

  // Generate floating particles
  const floatingParticles = Array.from({ length: 15 }, (_, i) => (
    <FloatingParticle
      key={i}
      initial={{
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        opacity: 0
      }}
      animate={{
        y: -50,
        opacity: [0, 0.6, 0],
        rotate: 360
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "linear"
      }}
    />
  ));

  return (
    <ContactSection id="contact" ref={ref}>
      <FloatingElements>
        {floatingParticles}
      </FloatingElements>
      
      <Container>
        <SectionHeader>
          <SectionTitle
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <TitleWord variants={wordVariants}>GET</TitleWord>
            <TitleWord variants={wordVariants}>IN</TitleWord>
            <TitleWord variants={wordVariants}>TOUCH</TitleWord>
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            We're here to serve you and make your jewelry dreams come true
          </SectionSubtitle>
        </SectionHeader>

        <ContactContent>
          <ContactInfo>
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <InfoItem
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                >
                  <InfoIcon>
                    <IconComponent />
                  </InfoIcon>
                  <InfoContent>
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                  </InfoContent>
                </InfoItem>
              );
            })}
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your jewelry needs..."
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting || isSubmitted}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : isSubmitted ? (
                <>Message Sent ✓</>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
