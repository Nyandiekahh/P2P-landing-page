import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const FeatureSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  position: relative;
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  filter: blur(20px);
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
`;

const statsAnimation = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  margin: 20px;
  animation: ${statsAnimation} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  opacity: 0;
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Features = ({ features }) => {
  // Move the hooks to the top of the component
  const [inView, ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const orbSpring = useSpring({
    from: { x: -100, y: -100 },
    to: async (next) => {
      while (true) {
        await next({ x: 100, y: 100, rotateZ: 180 });
        await next({ x: -100, y: 100, rotateZ: 0 });
        await next({ x: 100, y: -100, rotateZ: 180 });
        await next({ x: -100, y: -100, rotateZ: 0 });
      }
    },
    config: { duration: 10000 },
  });

  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    if (inView) {
      setAnimatedStats(true);
    }
  }, [inView]);

  if (!features) {
    return <div>Loading features...</div>;
  }

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

  return (
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={0.5}>
        <FeatureSection ref={ref} id="features">
          <GlowingOrb style={orbSpring} />
          <Container>
            <SectionTitle
              variants={titleVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              Revolutionizing Peer-to-Peer Transactions
            </SectionTitle>
            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper>
                    <feature.icon />
                  </IconWrapper>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeatureGrid>
            <StatsContainer>
              <StatItem delay={0.2}>
                <StatValue>
                  {animatedStats && (
                    <CountUp end={1000000} duration={2.5} separator="," />
                  )}
                  +
                </StatValue>
                <StatLabel>Active Users</StatLabel>
              </StatItem>
              <StatItem delay={0.4}>
                <StatValue>
                  {animatedStats && (
                    <CountUp end={50} duration={2.5} />
                  )}
                  +
                </StatValue>
                <StatLabel>Countries Served</StatLabel>
              </StatItem>
              <StatItem delay={0.6}>
                <StatValue>
                  $
                  {animatedStats && (
                    <CountUp end={500} duration={2.5} decimals={2} />
                  )}
                  M
                </StatValue>
                <StatLabel>Transaction Volume</StatLabel>
              </StatItem>
              <StatItem delay={0.8}>
                <StatValue>
                  {animatedStats && (
                    <CountUp end={99.99} duration={2.5} decimals={2} suffix="%" />
                  )}
                </StatValue>
                <StatLabel>Uptime</StatLabel>
              </StatItem>
            </StatsContainer>
          </Container>
        </FeatureSection>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={1.5} style={{ pointerEvents: 'none' }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            background: 'url(path_to_your_image.jpg) center center / cover no-repeat',
            scale,
            y,
          }}
        />
      </ParallaxLayer>
    </Parallax>
  );
};

export default Features;