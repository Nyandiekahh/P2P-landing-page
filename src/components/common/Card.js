import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 16px;
`;

const CardText = styled(motion.p)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const Card = ({ title, children, ...props }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: '0 12px 40px rgba(31, 38, 135, 0.5)' },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <StyledCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      {...props}
    >
      <CardContent variants={contentVariants}>
        {title && <CardTitle variants={itemVariants}>{title}</CardTitle>}
        <CardText variants={itemVariants}>{children}</CardText>
      </CardContent>
    </StyledCard>
  );
};

// Additional card variations

export const FeatureCard = styled(Card)`
  text-align: center;
  padding: 32px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #ff6b6b);
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

export const PricingCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  & > * {
    margin-bottom: 16px;
  }

  &::before {
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  }
`;

export const TestimonialCard = styled(Card)`
  padding: 32px;
  
  &::before {
    background: radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  }
`;

// Usage example:
// <Card title="Basic Card">This is a basic card component.</Card>
// <FeatureCard title="Feature">This card highlights a feature.</FeatureCard>
// <PricingCard title="Basic Plan">$9.99/month</PricingCard>
// <TestimonialCard>"Great service!" - John Doe</TestimonialCard>