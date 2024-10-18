import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUserPlus, FiSearch, FiDollarSign, FiShield, FiArrowRight } from 'react-icons/fi';
import { LinePath } from '@visx/shape';
import { ParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HowItWorksSection = styled(motion.section)`
  padding: 100px 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
`;

const Step = styled(motion.div)`
  flex-basis: calc(25% - 20px);
  text-align: center;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
  }

  @media (max-width: 768px) {
    flex-basis: calc(50% - 20px);
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ffd700;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e3c72;
  margin: 0 auto 20px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;

  ${Step}:hover & {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
`;

const StepIcon = styled.div`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 15px;
  animation: ${pulse} 2s infinite;
  transition: all 0.3s ease;

  ${Step}:hover & {
    transform: scale(1.1) rotate(360deg);
  }
`;

const StepTitle = styled.h3`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  ${Step}:hover & {
    color: #ffd700;
  }
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
  transition: all 0.3s ease;

  ${Step}:hover & {
    color: #ffffff;
  }
`;

const ConnectionLine = styled(motion.div)`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 1;
`;

const floatingAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 10px) rotate(5deg); }
  50% { transform: translate(0, 15px) rotate(0deg); }
  75% { transform: translate(-10px, 10px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  animation: ${floatingAnimation} 15s infinite ease-in-out;
`;

const PercentageIndicator = styled(motion.div)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: #ffd700;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const LearnMoreButton = styled(motion.button)`
  background-color: #ffd700;
  color: #1e3c72;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }

  svg {
    margin-left: 10px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const HowItWorks = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useViewportScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.2 },
    }),
  };

  const steps = [
    { icon: FiUserPlus, title: 'Sign Up', description: 'Create your account in seconds with our streamlined onboarding process. Verify your identity to unlock full platform functionality.' },
    { icon: FiSearch, title: 'Find Peers', description: 'Browse through our global network of verified users. Use advanced filters to find the perfect match for your transaction needs.' },
    { icon: FiDollarSign, title: 'Initiate Transaction', description: 'Set up your transaction with ease. Choose your preferred currency, amount, and payment method. Our smart system suggests optimal rates.' },
    { icon: FiShield, title: 'Secure Transfer', description: 'Complete your transaction with peace of mind. Our escrow service and multi-factor authentication ensure your funds are always protected.' },
  ];

  const [animationComplete, setAnimationComplete] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setAnimationComplete(true), 2500);
      const timer = setInterval(() => {
        setPercentage(prev => {
          if (prev < 100) return prev + 1;
          clearInterval(timer);
          return 100;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [inView]);

  const renderPath = ({ width, height }) => {
    const points = steps.map((_, i) => ({ x: (i * width) / (steps.length - 1), y: height / 2 }));

    return (
      <svg width={width} height={height}>
        <LinePath
          data={points}
          x={(d) => d.x}
          y={(d) => d.y}
          stroke="rgba(255, 215, 0, 0.5)"
          strokeWidth={3}
          curve={curveMonotoneX}
        />
      </svg>
    );
  };

  return (
    <HowItWorksSection
      ref={ref}
      id="how-it-works"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          How It Works
        </SectionTitle>
        <StepContainer>
          {steps.map((step, index) => (
            <Step
              key={index}
              variants={stepVariants}
              custom={index}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.05 }}
            >
              <StepNumber>{index + 1}</StepNumber>
              <StepIcon>
                <step.icon />
              </StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Step>
          ))}
          <ParentSize>
            {({ width, height }) => (
              <ConnectionLine
                style={{ width, height: 60 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                {renderPath({ width, height: 60 })}
              </ConnectionLine>
            )}
          </ParentSize>
        </StepContainer>
        <motion.div
          style={{ textAlign: 'center', marginTop: '50px' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <LearnMoreButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More <FiArrowRight />
          </LearnMoreButton>
        </motion.div>
      </Container>
      <FloatingShape
        style={{
          width: 200,
          height: 200,
          top: '10%',
          left: '5%',
          opacity: 0.5,
        }}
      />
      <FloatingShape
        style={{
          width: 150,
          height: 150,
          bottom: '15%',
          right: '10%',
          opacity: 0.3,
        }}
      />
      {/* <PercentageIndicator
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
      >
        {percentage}% Faster Than Traditional Banking
      </PercentageIndicator> */}
    </HowItWorksSection>
  );
};

export default HowItWorks;