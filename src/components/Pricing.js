import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheck, FiX } from 'react-icons/fi';
import { Flipper, Flipped } from 'react-flip-toolkit';

const PricingSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const ToggleOption = styled.span`
  font-size: 1.2rem;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const ToggleSwitch = styled(motion.div)`
  width: 60px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 15px;
  border-radius: 15px;
  padding: 3px;
  cursor: pointer;
`;

const ToggleKnob = styled(motion.div)`
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  perspective: 1000px;
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const PricingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: ${shimmer} 6s infinite linear;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px) rotateY(5deg);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
  }
`;

const PlanName = styled.h3`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 20px;
`;

const PlanFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 30px;
`;

const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: #e0e0e0;
`;

const FeatureIcon = styled.span`
  margin-right: 10px;
  color: ${props => props.available ? '#4CAF50' : '#F44336'};
`;

const CTAButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #ff6b6b;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ff8787;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PopularBadge = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: -30px;
  background-color: #ffd700;
  color: #1e3c72;
  padding: 5px 30px;
  font-weight: bold;
  transform: rotate(45deg);
`;

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setPercentage(prev => {
          if (prev < 100) return prev + 1;
          clearInterval(timer);
          return 100;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [inView]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
    }),
  };

  const toggleVariants = {
    monthly: { x: 0 },
    yearly: { x: 30 },
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } },
  };

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: '$9.99',
      yearlyPrice: '$99.99',
      features: ['100 Transactions/month', 'Basic Support', '2% Transaction Fee', 'Mobile App Access'],
    },
    {
      name: 'Pro',
      monthlyPrice: '$24.99',
      yearlyPrice: '$249.99',
      features: ['Unlimited Transactions', 'Priority Support', '1% Transaction Fee', 'Advanced Analytics', 'Multi-Currency Support'],
      popular: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      features: ['Unlimited Transactions', 'Dedicated Account Manager', 'Custom Fee Structure', 'API Access', 'White-label Solution'],
    },
  ];

  return (
    <PricingSection ref={ref} id="pricing">
      <Container>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Choose Your Plan
        </SectionTitle>
        <PricingToggle>
          <ToggleOption active={!isYearly} onClick={() => setIsYearly(false)}>Monthly</ToggleOption>
          <ToggleSwitch
            onClick={() => setIsYearly(!isYearly)}
            animate={isYearly ? 'yearly' : 'monthly'}
            variants={toggleVariants}
          >
            <ToggleKnob layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
          </ToggleSwitch>
          <ToggleOption active={isYearly} onClick={() => setIsYearly(true)}>Yearly</ToggleOption>
        </PricingToggle>
        <Flipper flipKey={isYearly}>
          <PricingGrid>
            {plans.map((plan, index) => (
              <Flipped key={plan.name} flipId={plan.name}>
                <PricingCard
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.popular && (
                    <PopularBadge
                      variants={badgeVariants}
                      initial="initial"
                      animate="animate"
                    >
                      Popular
                    </PopularBadge>
                  )}
                  <PlanName>{plan.name}</PlanName>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PlanPrice>
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        {plan.name !== 'Enterprise' && <span style={{ fontSize: '1rem' }}>{isYearly ? '/year' : '/month'}</span>}
                      </PlanPrice>
                    </motion.div>
                  </AnimatePresence>
                  <PlanFeatures>
                    {plan.features.map((feature, featureIndex) => (
                      <PlanFeature key={featureIndex}>
                        <FeatureIcon available={true}><FiCheck /></FeatureIcon>
                        {feature}
                      </PlanFeature>
                    ))}
                    {plan.name === 'Basic' && (
                      <PlanFeature>
                        <FeatureIcon available={false}><FiX /></FeatureIcon>
                        Multi-Currency Support
                      </PlanFeature>
                    )}
                  </PlanFeatures>
                  <CTAButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </CTAButton>
                </PricingCard>
              </Flipped>
            ))}
          </PricingGrid>
        </Flipper>
      </Container>
      <motion.div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '2rem',
        color: '#ffd700',
        fontWeight: 'bold',
      }}>
        {/* {percentage}% Faster Than Traditional Banking */}
      </motion.div>
    </PricingSection>
  );
};

export default Pricing;