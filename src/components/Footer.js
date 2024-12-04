import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { styled, alpha, keyframes } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { Link } from 'react-router-dom';

// Animation keyframes for dynamic effects
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 15px rgba(227, 134, 125, 0.4); }
  50% { text-shadow: 0 0 25px rgba(227, 134, 125, 0.7), 0 0 40px rgba(227, 134, 125, 0.3); }
`;

// Styled components with modern design aesthetics
const StyledFooter = styled('footer')(({ theme }) => ({
  background: alpha('#030014', 0.9),
  backdropFilter: 'blur(12px)',
  position: 'relative',
  padding: theme.spacing(3),
  marginTop: 'auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${alpha('#E3867D', 0.2)}, transparent)`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  }
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
});

const BrandContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    '&:hover .icon': {
      transform: 'rotate(360deg) scale(1.2)',
    }
  }
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontWeight: 800,
  background: 'linear-gradient(90deg, #E3867D, #FF3864, #E3867D)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 3s linear infinite`,
  letterSpacing: '0.1em',
  fontSize: '1.8rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  }
}));

const StyledIcon = styled(LocalBarIcon)(({ theme }) => ({
  color: '#E3867D',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${glow} 2s infinite ease-in-out`,
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  }
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: alpha('#fff', 0.7),
  fontWeight: 500,
  letterSpacing: '0.05em',
  transition: 'color 0.3s ease',
  fontSize: '1rem',
  '&:hover': {
    color: '#E3867D',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  }
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: alpha('#fff', 0.7),
  padding: theme.spacing(1.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.up('md')]: {
    '& svg': {
      fontSize: '1.5rem',
    },
  },
  '&:hover': {
    color: '#E3867D',
    background: alpha('#E3867D', 0.1),
    transform: 'translateY(-3px)',
    boxShadow: `0 0 30px ${alpha('#E3867D', 0.3)}`,
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 2),
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    textAlign: 'center',
  }
}));

const TextGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    '&:hover': {
      transform: 'translateX(10px)',
      transition: 'transform 0.3s ease',
    }
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  }
}));

const SocialGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    '&:hover': {
      transform: 'translateX(-10px)',
      transition: 'transform 0.3s ease',
    }
  }
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="xl">
        <ContentWrapper>
          <TextGroup>
            <StyledLink to="/">
              <BrandContainer>
                <StyledIcon className="icon" />
                <BrandText>
                  MIXOLOGY
                </BrandText>
              </BrandContainer>
            </StyledLink>
            <CopyrightText>
              © 2024 Aaradhya Lamsal (Sparky Sky)
            </CopyrightText>
          </TextGroup>

          <SocialGroup>
            <SocialIcon
              aria-label="github"
              href="https://github.com/aaradhyaaaronmaths555"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </SocialIcon>
            <SocialIcon
              aria-label="linkedin"
              href="https://www.linkedin.com/in/aaradhya-lamsal-b19a731b8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </SocialIcon>
          </SocialGroup>
        </ContentWrapper>
      </Container>
    </StyledFooter>
  );
};

export default Footer;