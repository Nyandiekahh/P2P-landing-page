import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const ContactSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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

const ContactWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ContactForm = styled(motion.form)`
  flex-basis: 60%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);

  @media (max-width: 768px) {
    flex-basis: 100%;
    margin-bottom: 40px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #ffffff;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e3c72;
  background-color: #ffd700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ffed4a;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ContactInfo = styled.div`
  flex-basis: 35%;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  margin-bottom: 20px;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #e0e0e0;
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 15px;
  color: #ffd700;
`;

const MapContainer = styled(motion.div)`
  width: 100%;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

const MapPin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: #ffd700;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const FloatingShape = styled(animated.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
`;

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture({
    onMove: ({ xy: [px, py] }) => set({ x: px, y: py }),
    onHover: ({ hovering }) => !hovering && set({ x: 0, y: 0 }),
  });

  return (
    <ContactSection ref={ref} id="contact">
      <Container>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Get in Touch
        </SectionTitle>
        <ContactWrapper>
          <ContactForm
            variants={formVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea id="message" name="message" required />
            </FormGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
          <ContactInfo>
            <ContactCard
              variants={infoVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <ContactTitle>Contact Information</ContactTitle>
              <ContactDetail>
                <ContactIcon><FiMail /></ContactIcon>
                info@p2peer.com
              </ContactDetail>
              <ContactDetail>
                <ContactIcon><FiPhone /></ContactIcon>
                +1 (555) 123-4567
              </ContactDetail>
              <ContactDetail>
                <ContactIcon><FiMapPin /></ContactIcon>
                123 P2P Street, Digital City, 12345
              </ContactDetail>
            </ContactCard>
            <MapContainer
              style={{ scale }}
              {...bind()}
            >
              <animated.div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#2a5298',
                  transform: x.to(x => `perspective(600px) rotateY(${x / 60}deg)`),
                }}
              />
              <MapPin />
            </MapContainer>
          </ContactInfo>
        </ContactWrapper>
      </Container>
      <FloatingShape
        style={{
          width: 100,
          height: 100,
          top: '10%',
          left: '5%',
          transform: x.to(x => `translate3d(${x / 10}px, ${y / 10}px, 0)`),
        }}
      />
      <FloatingShape
        style={{
          width: 150,
          height: 150,
          bottom: '15%',
          right: '10%',
          transform: x.to(x => `translate3d(${-x / 15}px, ${-y / 15}px, 0)`),
        }}
      />
    </ContactSection>
  );
};

export default Contact;