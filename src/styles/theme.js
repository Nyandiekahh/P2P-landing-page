import { css } from 'styled-components';

const theme = {
  colors: {
    primary: '#1e3c72',
    secondary: '#2a5298',
    accent: '#ffd700',
    background: '#f4f4f4',
    text: '#333333',
    textLight: '#ffffff',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  fonts: {
    main: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    short: '0.2s ease-in-out',
    medium: '0.3s ease-in-out',
    long: '0.5s ease-in-out',
  },
  gradients: {
    primary: `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`,
    secondary: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
  },
  zIndex: {
    low: 10,
    medium: 100,
    high: 1000,
  },
};

export const media = Object.keys(theme.breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.breakpoints[label]}) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const rgba = (hexColor, alpha) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default theme;