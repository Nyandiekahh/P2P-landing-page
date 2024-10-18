import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    background-color: #f4f4f4;
    color: #333;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1 0 auto;
  }

  body > *:last-child {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Custom selection color */
  ::selection {
    background-color: #ffd700;
    color: #1e3c72;
  }

  /* Accessibility: Focus styles */
  *:focus {
    outline: 2px solid #ffd700;
    outline-offset: 2px;
  }

  /* Responsive font sizes */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 12px;
    }
  }

  /* Animation for link underlines */
  a {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: currentColor;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease-out;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  /* Custom styles for form elements */
  input, textarea, select {
    appearance: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #ffd700;
    }
  }

  /* Keyframes for various animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes slideInFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  /* Utility classes for animations */
  .animate-fadeIn { animation: fadeIn 1s ease-out; }
  .animate-slideInLeft { animation: slideInFromLeft 1s ease-out; }
  .animate-slideInRight { animation: slideInFromRight 1s ease-out; }
  .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
  .animate-rotate { animation: rotate 2s linear infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }

  /* Custom styles for buttons */
  button {
    background-color: #ffd700;
    color: #1e3c72;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background-color: #1e3c72;
      color: #ffd700;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  }

  /* Responsive grid system */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .col {
    flex: 1;
    padding: 0 15px;
  }

  /* Responsive breakpoints */
  @media (max-width: 1200px) {
    .container {
      max-width: 960px;
    }
  }

  @media (max-width: 992px) {
    .container {
      max-width: 720px;
    }
  }

  @media (max-width: 768px) {
    .container {
      max-width: 540px;
    }
    .col {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 576px) {
    .container {
      max-width: none;
    }
  }

  /* Typography styles */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p {
    margin-bottom: 1rem;
  }

  /* Accessibility: Skip to main content link */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: #ffd700;
    color: #1e3c72;
    padding: 8px;
    z-index: 100;
    transition: top 0.3s;

    &:focus {
      top: 0;
    }
  }

  /* Print styles */
  @media print {
    body {
      font-size: 12pt;
    }

    .no-print {
      display: none;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }
  }

  /* Footer styles to prevent unwanted space */
  .footer {
    flex-shrink: 0;
  }
`;

export default GlobalStyles;