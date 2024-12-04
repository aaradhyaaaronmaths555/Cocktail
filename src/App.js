import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import { useEffect, useState } from 'react';

// Neon Spray Background Component
const SprayParticle = ({ style }) => (
  <div 
    className="absolute rounded-full blur-sm animate-spray"
    style={style}
  />
);

const NeonSprayBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const colors = [
        '#FF10F0',  // Hot pink
        '#7B2DFF',  // Purple
        '#14F195',  // Cyan
        '#FF3864'   // Neon red
      ];
      
      const newParticles = Array.from({ length: 50 }, (_, index) => ({
        id: index,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 4,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: -Math.random() * 8,
        opacity: 0.1 + Math.random() * 0.3,
        blur: 8 + Math.random() * 12
      }));
      
      setParticles(newParticles);
    };

    generateParticles();
    const intervalId = setInterval(generateParticles, 8000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030014] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#030014] to-[#030014] z-10" />
      
      {particles.map((particle) => (
        <SprayParticle
          key={particle.id}
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
            boxShadow: `0 0 20px ${particle.color}`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes spray {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0;
          }
          25% {
            opacity: var(--tw-opacity);
          }
          75% {
            opacity: var(--tw-opacity);
          }
          100% {
            transform: scale(1.5) translate(
              ${Math.random() > 0.5 ? '100px' : '-100px'},
              ${Math.random() > 0.5 ? '100px' : '-100px'}
            );
            opacity: 0;
          }
        }
        
        .animate-spray {
          animation: spray var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <Box className="app-container">
      <NeonSprayBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} /> {/* Changed from /SearchPage to /search to match Navbar */}
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;