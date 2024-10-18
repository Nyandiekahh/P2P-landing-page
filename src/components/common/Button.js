import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: ${props => props.backgroundColor || '#ffd700'};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ButtonText = styled(motion.span)`
  position: relative;
  z-index: 1;
`;

export const Button = ({ children, backgroundColor, ...props }) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const textVariants = {
    hover: { y: -2 },
    tap: { y: 0 },
  };

  return (
    <StyledButton
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      backgroundColor={backgroundColor}
      {...props}
    >
      <ButtonText variants={textVariants}>{children}</ButtonText>
    </StyledButton>
  );
};