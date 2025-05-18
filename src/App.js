import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import About from './pages/About';
import CaseStudy from './pages/CaseStudy';
import CreateTrustChain from './pages/CreateTrustChain';
import AnimatedSteps from './AnimatedSteps';
import DomainCard from './components/DomainCard';

const trustTitles = [
  "Start your chain of trust.",
  "Your journey, securely linked.",
  "Track truth from the beginning.",
  "Build your verified story.",
  "Chain your moments. Trust forever.",
  "One chain. Endless transparency.",
  "Secure the past. Trust the future.",
  "Every link matters. Make yours.",
  "Create and prove your legacy.",
  "From events to proof — start here."
];

const getRandomTitle = () => {
  const index = Math.floor(Math.random() * trustTitles.length);
  return trustTitles[index];
};

const Layout = () => {
  const location = useLocation();

  // Проверяем наличие ключевых фраз в тексте страницы
  const bodyText = typeof document !== 'undefined' ? document.body.innerText : '';
  const hideGuide = bodyText.includes('Review Your TrustChain') || bodyText.includes('Create a TrustChain');

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: 'white',
    color: '#333'
  };

  const headerStyle = {
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const navStyle = {
    display: 'flex',
    gap: '16px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#3b82f6',
    fontWeight: '500',
    transition: 'color 0.2s',
  };

  return (
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2563eb' }}>
            <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>TrustChain</Link>
          </h1>
          <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Create</Link>
            <Link to="/about" style={linkStyle}>About</Link>
            <Link to="/case-study" style={linkStyle}>Case Study</Link>
          </nav>
        </header>

        {location.pathname === '/' && !hideGuide && (
            <>
              <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2563eb' }}>
                  {getRandomTitle()}
                </h2>
              </div>
              <AnimatedSteps />
            </>
        )}

        <main style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<CreateTrustChain />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-study" element={<CaseStudy />} />
          </Routes>
          <DomainCard />  {}
        </main>

        <footer style={{ textAlign: 'center', padding: '16px', color: '#666' }}>
          <p>
            Follow us on Twitter: <a href="https://x.com/trustchainx" target="_blank" rel="noopener noreferrer">@TrustChainX</a>
          </p>
          <p>
            Made by <a href="https://stacklead.pro" target="_blank" rel="noreferrer noopener">Stacklead.pro</a>
          </p>
        </footer>
      </div>
  );
};

const App = () => (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
);

export default App;
