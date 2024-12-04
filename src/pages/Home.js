import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import bottle3d from '../assets/images/3dpic.jpg';

// Synchronized base animation timing - keeping these as constants makes it easier to maintain consistency
const ROTATION_DURATION = '12s';
const FLOAT_DURATION = '6s';

// Animation definitions
const rotate3D = keyframes`
  0% {
    transform: perspective(2000px) rotateY(0deg) rotateX(10deg) rotateZ(-5deg);
  }
  50% {
    transform: perspective(2000px) rotateY(180deg) rotateX(10deg) rotateZ(5deg);
  }
  100% {
    transform: perspective(2000px) rotateY(360deg) rotateX(10deg) rotateZ(-5deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.02);
  }
`;

const glowText = keyframes`
  0%, 100% { 
    text-shadow: 0 0 20px rgba(227, 134, 125, 0.5);
    opacity: 1;
  }
  50% { 
    text-shadow: 0 0 40px rgba(227, 134, 125, 0.8), 0 0 80px rgba(227, 134, 125, 0.3);
    opacity: 0.8;
  }
`;

const neonGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 25px rgba(227, 134, 125, 0.3);
  }
  50% { 
    box-shadow: 0 0 40px rgba(227, 134, 125, 0.5);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4, 0),
  background: 'linear-gradient(135deg, #030014 0%, #0A0A0F 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(227, 134, 125, 0.05), transparent 70%)',
    pointerEvents: 'none'
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(8),
  minHeight: '80vh',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(6),
    padding: theme.spacing(4)
  }
}));

const TextGradient = styled('span')({
  background: 'linear-gradient(135deg, #E3867D 0%, #962E2A 50%, #E3867D 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  animation: `${shimmer} ${ROTATION_DURATION} linear infinite`
});

const NeonTextContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(20, 20, 25, 0.98))',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  position: 'relative',
  backdropFilter: 'blur(10px)',
  animation: `${neonGlow} ${FLOAT_DURATION} ease-in-out infinite`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 0 50px rgba(227, 134, 125, 0.4)'
  }
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E3867D, #962E2A)',
  color: 'white',
  padding: '14px 36px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(227, 134, 125, 0.3)',
  animation: `${float} ${FLOAT_DURATION} ease-in-out infinite`,
  '&:hover': {
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 8px 25px rgba(227, 134, 125, 0.5)',
    background: 'linear-gradient(135deg, #E3867D, #962E2A)', // Maintain gradient on hover
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.98)'
  }
}));

const StyledAutoAwesomeIcon = styled(AutoAwesomeIcon)({
  color: '#E3867D',
  fontSize: '2rem',
  animation: `${glowText} ${FLOAT_DURATION} ease-in-out infinite`
});

const Rotating3DImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  animation: `${rotate3D} ${ROTATION_DURATION} linear infinite, ${float} ${FLOAT_DURATION} ease-in-out infinite`,
  filter: 'drop-shadow(0 0 30px rgba(227, 134, 125, 0.3))',
  mixBlendMode: 'luminosity',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    filter: 'drop-shadow(0 0 50px rgba(227, 134, 125, 0.5))',
    mixBlendMode: 'normal'
  },
  [theme.breakpoints.up('md')]: {
    width: '500px',
  },
  [theme.breakpoints.down('md')]: {
    width: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  perspective: '2000px',
  transformStyle: 'preserve-3d',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  flex: 1,
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    height: '500px',
  }
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2)
  }
}));

const Home = () => {
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // Handler function for the Start Mixing button
  const handleStartMixing = () => {
    navigate('/search'); // Navigate to the search page when clicked
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#030014' }}>
      <HeroSection>
        <Container maxWidth="xl">
          <ContentWrapper>
            <ContentContainer>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                <StyledAutoAwesomeIcon />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#E3867D',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    animation: `${glowText} ${FLOAT_DURATION} ease-in-out infinite`
                  }}
                >
                  AI-Powered Mixology
                </Typography>
              </Box>
              
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  mb: 3,
                  animation: `${glowText} ${FLOAT_DURATION} ease-in-out infinite`,
                  lineHeight: 1.2
                }}
              >
                Make Cocktails <TextGradient>Like a Pro</TextGradient>
              </Typography>

              <NeonTextContainer>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    mb: 0,
                    lineHeight: 1.8,
                    fontWeight: 500
                  }}
                >
                  Discover the art of mixology with our AI-powered recipe generator. 
                  Create stunning cocktails with expert precision.
                </Typography>
              </NeonTextContainer>

              <Box sx={{ mt: 4 }}>
                <GlowingButton
                  startIcon={<LocalBarIcon sx={{ fontSize: '1.5rem' }} />}
                  onClick={handleStartMixing} // Add the click handler here
                >
                  Start Mixing
                </GlowingButton>
              </Box>
            </ContentContainer>

            <ImageContainer>
              <Rotating3DImage
                src={bottle3d}
                alt="3D Cocktail"
                sx={{
                  maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)'
                }}
              />
              
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(227, 134, 125, 0.2) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                  opacity: 0.3,
                  animation: `${float} ${FLOAT_DURATION} ease-in-out infinite reverse`
                }}
              />
            </ImageContainer>
          </ContentWrapper>
        </Container>
      </HeroSection>
    </Box>
  );
};

export default Home;