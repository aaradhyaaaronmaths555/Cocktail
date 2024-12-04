import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CloseIcon from '@mui/icons-material/Close';

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  transition: 'all 0.3s',
  '&.scrolled': {
    background: alpha('#0a0a0f', 0.95),
    backdropFilter: 'blur(12px)',
  }
}));

const NavItem = styled(Button)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textTransform: 'none',
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '12px',
  transition: 'all 0.3s',
  '&:hover': {
    color: '#E3867D',
    background: alpha('#E3867D', 0.1),
    transform: 'translateY(-2px)',
    boxShadow: '0 0 20px rgba(227, 134, 125, 0.2)',
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: alpha('#0a0a0f', 0.98),
    backdropFilter: 'blur(12px)',
    width: 280,
    borderRight: `1px solid ${alpha('#E3867D', 0.1)}`,
  }
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Search Cocktails', icon: <LocalBarIcon />, path: '/search' },
  ];

  return (
    <StyledAppBar position="fixed" className={isScrolled ? 'scrolled' : ''}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <StyledLink to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: '#E3867D',
                textDecoration: 'none',
                textShadow: '0 0 10px rgba(227, 134, 125, 0.5)',
              }}
            >
              MIXOLOGY
            </Typography>
          </StyledLink>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 3 }}>
            {menuItems.map((item) => (
              <StyledLink to={item.path} key={item.text}>
                <NavItem
                  startIcon={item.icon}
                >
                  {item.text}
                </NavItem>
              </StyledLink>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={toggleDrawer}
              sx={{ 
                color: '#E3867D',
                '&:hover': {
                  background: alpha('#E3867D', 0.1),
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Drawer */}
          <StyledDrawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleDrawer}
            variant="temporary"
          >
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <StyledLink to="/" onClick={toggleDrawer}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#E3867D',
                      textShadow: '0 0 10px rgba(227, 134, 125, 0.5)',
                    }}
                  >
                    MIXOLOGY
                  </Typography>
                </StyledLink>
                <IconButton 
                  onClick={toggleDrawer} 
                  sx={{ 
                    color: '#E3867D',
                    '&:hover': {
                      background: alpha('#E3867D', 0.1),
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                {menuItems.map((item) => (
                  <StyledLink to={item.path} key={item.text} onClick={toggleDrawer}>
                    <ListItem 
                      button 
                      sx={{
                        borderRadius: '12px',
                        mb: 2,
                        '&:hover': {
                          backgroundColor: alpha('#E3867D', 0.1),
                          transform: 'translateX(8px)',
                          transition: 'all 0.3s',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: '#E3867D' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        sx={{ 
                          color: 'white',
                          '& .MuiListItemText-primary': {
                            fontSize: '1.1rem',
                          }
                        }}
                      />
                    </ListItem>
                  </StyledLink>
                ))}
              </List>
            </Box>
          </StyledDrawer>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;