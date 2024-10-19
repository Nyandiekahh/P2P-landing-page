import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const TestimonialSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const neonGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de; }
  50% { text-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff, 0 0 50px #00ffff; }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 3px;
  animation: ${neonGlow} 3s infinite alternate;

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
`;

const TestimonialContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  perspective: 1000px;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const cardFlip = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  width: 80%;
  max-width: 600px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &:hover {
    animation: ${cardFlip} 1s forwards;
  }

  @media (max-width: 768px) {
    padding: 20px;
    height: 300px;
  }
`;

const Quote = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.6;
  font-style: italic;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const glowAnimation = keyframes`
  0%, 100% { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff; }
  50% { text-shadow: 0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de; }
`;

const Author = styled.p`
  font-size: 1.1rem;
  color: #ffd700;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'Orbitron', sans-serif;
  animation: ${glowAnimation} 2s infinite;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 15px;
  }
`;

const NavButton = styled(motion.button)`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 5px;
  }
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

const progressAnimation = keyframes`
  0% { width: 0%; background-position: 0% 50%; }
  100% { width: 100%; background-position: 100% 50%; }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff00de, #00ffff, #ff00de);
  background-size: 200% 200%;
  animation: ${progressAnimation} 5s linear infinite;
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255,0,222,0.8) 0%, rgba(0,255,255,0.8) 100%);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.5;
  animation: ${floatingAnimation} 6s infinite ease-in-out;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const testimonials = [
  {
    quote: "Our P2P app journey was like coding a rollercoaster – thrilling, challenging, and unforgettable!",
    author: "Cynthia 'Team Lead' Otara"
  },
  {
    quote: "Leaving Moringa feels like deploying our lives to production. Can't wait to debug the future!",
    author: "Ivy 'The Bug Squasher' Jepkemboi"
  },
  {
    quote: "The sunset is gone, at least it's worth to watch. Until our next eclipse",
    author: "Einstein 'Top Plug' Mokua"
  },
  {
    quote: "Our team sprinted through challenges like pro athletes. Now we're ready for the tech Olympics!",
    author: "Daniel 'Data Dynamo' Joel"
  },
  {
    quote: "This project turned us from code newbies to P2P pioneers. Watch out, Silicon Valley!",
    author: "Fiona 'API Queen' Ombura"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -180 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, rotateY: 180, transition: { duration: 0.8 } },
  };

  return (
    <TestimonialSection ref={ref}>
      <FloatingShape style={{ top: '10%', left: '5%' }} />
      <FloatingShape style={{ top: '70%', right: '10%' }} />
      <FloatingShape style={{ top: '40%', left: '80%' }} />
      <SectionTitle
        variants={titleVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        Farewell Bytes
      </SectionTitle>
      <TestimonialContainer>
        <AnimatePresence mode="wait">
          <TestimonialCard
            key={currentIndex}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Quote>"{testimonials[currentIndex].quote}"</Quote>
            <Author>- {testimonials[currentIndex].author}</Author>
            <ProgressBar
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 8, ease: 'linear' }}
            />
          </TestimonialCard>
        </AnimatePresence>
        <PrevButton onClick={prevTestimonial} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FiArrowLeft />
        </PrevButton>
        <NextButton onClick={nextTestimonial} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FiArrowRight />
        </NextButton>
      </TestimonialContainer>
    </TestimonialSection>
  );
};

export default Testimonials;