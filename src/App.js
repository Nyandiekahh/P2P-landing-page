import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlobalStyles from './styles/GlobalStyles';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1 0 auto;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled(motion.h1)`
  color: #ffffff;
  font-size: 2rem;
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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const textVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 } }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } }
  };

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <AnimatePresence mode="wait">
          {loading && (
            <LoadingScreen
              variants={loadingVariants}
              initial="initial"
              exit="exit"
            >
              <LoadingText
                variants={textVariants}
                initial="initial"
                animate="animate"
              >
                Loading P2Peer...
              </LoadingText>
            </LoadingScreen>
          )}
        </AnimatePresence>
        {!loading && (
          <>
            <Header />
            <MainContent>
              <Hero />
              <Features />
              <HowItWorks />
              <Pricing />
              <Contact />
            </MainContent>
            <Footer />
            <AnimatePresence>
              {showScrollButton && (
                <ScrollToTopButton
                  onClick={scrollToTop}
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ↑
                </ScrollToTopButton>
              )}
            </AnimatePresence>
          </>
        )}
      </AppWrapper>
    </>
  );
};

export default App;