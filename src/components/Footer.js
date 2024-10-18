import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiFacebook, FiMail, FiPhone, FiMapPin, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-scroll';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FooterWrapper = styled.footer`
  background: linear-gradient(45deg, #1e3c72, #2a5298, #4a00e0);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: #ffffff;
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
`;

const FooterColumn = styled(motion.div)`
  flex: 1;
  margin-bottom: 30px;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 40px;
    height: 3px;
    background-color: #ffd700;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 60px;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #e0e0e0;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ffd700;
    transform: translateX(5px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 20px;
`;

const SocialIcon = styled(motion.a)`
  color: #ffffff;
  font-size: 1.8rem;
  margin-right: 20px;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

const Copyright = styled(motion.div)`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 80%);
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 20px;
`;

const NewsletterInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  font-size: 1rem;
`;

const NewsletterButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #ffd700;
  color: #1e3c72;
  border: none;
  border-radius: 0 5px 5px 0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffed4a;
  }
`;

const ContactInfo = styled.div`
  margin-top: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  svg {
    margin-right: 10px;
    color: #ffd700;
  }
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffd700;
  color: #1e3c72;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Footer = () => {
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const socialIconVariants = {
    hover: { scale: 1.2, rotate: 15, y: -5 }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsNewsletterSubmitted(true);
    setTimeout(() => setIsNewsletterSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterWrapper>
      <FooterBackground />
      <FooterContent>
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterTitle>P2Peer</FooterTitle>
          <p>Revolutionizing peer-to-peer transactions with cutting-edge blockchain technology.</p>
          <SocialIcons>
            {[
              { icon: FiGithub, href: "https://github.com" },
              { icon: FiTwitter, href: "https://twitter.com" },
              { icon: FiLinkedin, href: "https://linkedin.com" },
              { icon: FiFacebook, href: "https://facebook.com" }
            ].map((social, index) => (
              <SocialIcon 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <social.icon />
              </SocialIcon>
            ))}
          </SocialIcons>
        </FooterColumn>
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterTitle>Quick Links</FooterTitle>
          {['Home', 'Features', 'How It Works', 'Pricing', 'Contact'].map((item, index) => (
            <FooterLink key={index} to={item.toLowerCase().replace(' ', '-')} smooth={true} duration={500}>
              {item}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterTitle>Resources</FooterTitle>
          {['Documentation', 'API Reference', 'Blog', 'Community Forum', 'FAQ', 'Support Center'].map((item, index) => (
            <FooterLink key={index} as="a" href="#">{item}</FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterTitle>Legal</FooterTitle>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance', 'Security', 'Accessibility'].map((item, index) => (
            <FooterLink key={index} as="a" href="#">{item}</FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          animate="visible"
        >
          <FooterTitle>Stay Connected</FooterTitle>
          <p>Subscribe to our newsletter for updates and exclusive offers.</p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput type="email" placeholder="Enter your email" required />
            <NewsletterButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
          <AnimatePresence>
            {isNewsletterSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ color: '#4CAF50', marginTop: '10px' }}
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </AnimatePresence>
          <ContactInfo>
            <ContactItem>
              <FiMail />
              <span>support@p2peer.com</span>
            </ContactItem>
            <ContactItem>
              <FiPhone />
              <span>+1 (555) 123-4567</span>
            </ContactItem>
            <ContactItem>
              <FiMapPin />
              <span>123 Blockchain Street, Crypto City, 12345</span>
            </ContactItem>
          </ContactInfo>
        </FooterColumn>
      </FooterContent>
      <Copyright
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>&copy; {new Date().getFullYear()} P2Peer. All rights reserved.</p>
      </Copyright>
      <ScrollToTopButton
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiChevronUp />
      </ScrollToTopButton>
    </FooterWrapper>
  );
};

export default Footer;