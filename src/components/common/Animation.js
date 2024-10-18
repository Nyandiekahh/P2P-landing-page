import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AnimatedElement = styled(motion.div)`
  animation: ${({ animationType }) => {
    switch (animationType) {
      case 'pulse':
        return pulseAnimation;
      case 'float':
        return floatAnimation;
      case 'spin':
        return spinAnimation;
      default:
        return 'none';
    }
  }} ${({ duration }) => duration || '2s'} infinite ease-in-out;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

export const AnimatedBackground = () => {
  const shapes = [
    { size: 100, top: '10%', left: '10%', delay: 0 },
    { size: 150, top: '70%', right: '15%', delay: 1 },
    { size: 80, top: '40%', left: '60%', delay: 0.5 },
    { size: 120, bottom: '20%', left: '5%', delay: 1.5 },
  ];

  return (
    <BackgroundContainer>
      {shapes.map((shape, index) => (
        <BackgroundShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{
            duration: 2,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export const PulsingElement = ({ children, ...props }) => (
  <AnimatedElement animationType="pulse" {...props}>
    {children}
  </AnimatedElement>
);

export const FloatingElement = ({ children, ...props }) => (
  <AnimatedElement animationType="float" {...props}>
    {children}
  </AnimatedElement>
);

export const SpinningElement = ({ children, ...props }) => (
  <AnimatedElement animationType="spin" {...props}>
    {children}
  </AnimatedElement>
);