import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from './common/Button';
import { AnimatedBackground } from './common/Animation';
import { FiArrowRight, FiPlay, FiX } from 'react-icons/fi';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
`;

const ContentWrapper = styled(motion.div)`
  text-align: center;
  z-index: 2;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const glowAnimation = keyframes`
  0% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de; }
  100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de; }
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out, ${glowAnimation} 2s ease-in-out infinite alternate;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  color: #e0e0e0;
  margin-bottom: 2rem;
  animation: ${slideIn} 1s ease-out 0.5s both;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Button)`
  animation: ${fadeIn} 1s ease-out 1s both;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const VideoButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: #ffffff;
    color: #1e3c72;
  }
`;

const floatingAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${floatingAnimation} 6s ease-in-out infinite;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-size: 0.9rem;
`;

const ScrollLine = styled(motion.div)`
  width: 2px;
  height: 60px;
  background-color: #ffffff;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const VideoModal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        style={{
          width: '80%',
          maxWidth: '800px',
          background: '#fff',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative' }}>
          <video
            width="100%"
            controls
            autoPlay
            style={{ display: 'block' }}
          >
            <source src="/p2p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
  };

  const shapeVariants = {
    hover: { scale: 1.1, rotate: 90, transition: { duration: 0.3 } }
  };

  const scrollLineVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }
      }
    }
  };

  return (
    <HeroSection>
      <AnimatedBackground />
      <FloatingShape 
        style={{ top: '10%', left: '10%', width: '100px', height: '100px' }}
        variants={shapeVariants}
        whileHover="hover"
      />
      <FloatingShape 
        style={{ top: '70%', right: '15%', width: '150px', height: '150px' }}
        variants={shapeVariants}
        whileHover="hover"
      />
      <ContentWrapper
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Welcome to P2Peer
        </Title>
        <Subtitle
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          Revolutionizing peer-to-peer transactions with cutting-edge blockchain technology
        </Subtitle>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <FiArrowRight />
        </CTAButton>
        <VideoButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVideoModalOpen(true)}
        >
          <FiPlay /> Watch Demo
        </VideoButton>
      </ContentWrapper>
      <ScrollIndicator style={{ opacity }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Scroll to explore
        </motion.span>
        <ScrollLine
          variants={scrollLineVariants}
          animate="animate"
        />
      </ScrollIndicator>
      <AnimatePresence>
        {isVideoModalOpen && (
          <VideoModal onClose={() => setIsVideoModalOpen(false)} />
        )}
      </AnimatePresence>
    </HeroSection>
  );
};

export default Hero;