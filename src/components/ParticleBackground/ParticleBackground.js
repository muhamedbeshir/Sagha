import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FloatingDiamonds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Diamond = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fdc30e;
  clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
  opacity: 0.4;
`;

const GoldSparkles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fdc30e, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(253, 195, 14, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fdc30e, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(253, 195, 14, 0.6), transparent);
  background-repeat: repeat;
  background-size: 200px 150px;
  animation: sparkle-move 15s linear infinite;
  opacity: 0.3;
  
  @keyframes sparkle-move {
    from { transform: translateX(-200px); }
    to { transform: translateX(200px); }
  }
`;

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life = Math.random() * 200 + 100;
    this.maxLife = this.life;
    this.color = `rgba(253, 195, 14, ${this.opacity})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    
    // Fade out as life decreases
    this.opacity = (this.life / this.maxLife) * 0.5;
    this.color = `rgba(253, 195, 14, ${this.opacity})`;
    
    // Wrap around screen
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
    
    return this.life > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    
    // Draw diamond shape
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    
    // Add glow effect
    ctx.shadowColor = '#fdc30e';
    ctx.shadowBlur = 10;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    
    ctx.restore();
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = particlesRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return new Particle(canvas);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles periodically
      if (Math.random() < 0.3 && particles.length < 50) {
        particles.push(createParticle());
      }
      
      // Update and draw particles
      particles = particles.filter(particle => {
        const alive = particle.update();
        if (alive) {
          particle.draw(ctx);
        }
        return alive;
      });
      
      particlesRef.current = particles;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Generate floating diamonds
  const floatingDiamonds = Array.from({ length: 20 }, (_, i) => (
    <Diamond
      key={i}
      initial={{
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        opacity: 0,
        rotate: 0
      }}
      animate={{
        y: -50,
        opacity: [0, 0.6, 0.4, 0],
        rotate: 360,
        x: Math.random() * window.innerWidth
      }}
      transition={{
        duration: 8 + Math.random() * 5,
        repeat: Infinity,
        delay: Math.random() * 8,
        ease: "linear"
      }}
      style={{
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 5 + 's'
      }}
    />
  ));

  return (
    <ParticleContainer>
      {/* Canvas for dynamic particles */}
      <ParticleCanvas ref={canvasRef} />
      
      {/* CSS-based sparkles */}
      <GoldSparkles />
      
      {/* Floating diamonds */}
      <FloatingDiamonds>
        {floatingDiamonds}
      </FloatingDiamonds>
    </ParticleContainer>
  );
};

export default ParticleBackground;
