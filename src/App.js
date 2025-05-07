import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import About from './pages/About';
import CaseStudy from './pages/CaseStudy';
import CreateTrustChain from './pages/CreateTrustChain';
import AnimatedSteps from './AnimatedSteps';

const Layout = () => {
  const location = useLocation();

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

        {/* Показываем анимацию только на главной */}
        {location.pathname === '/' && <AnimatedSteps />}

        <main style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<CreateTrustChain />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-study" element={<CaseStudy />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>
            Follow us on Twitter: <a href="https://x.com/trustchainx" target="_blank" rel="noreferrer">@TrustChainX</a>
          </p>
          <p>
            Made by <a href="https://stacklead.pro" target="_blank" rel="noreferrer">Stacklead.pro</a>
          </p>
        </footer>
      </div>
  );
};

const App = () => (
    <Router>
      <Layout />
    </Router>
);

export default App;
