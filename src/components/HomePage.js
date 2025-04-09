import React from 'react';
import { Box, Typography, Button, Container, Grid, AppBar, Toolbar, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HotelIcon from '@mui/icons-material/Hotel';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExploreIcon from '@mui/icons-material/Explore';

const HomePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/auth');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleExploreClick = () => {
    navigate('/explore');
  };

  const travelThoughts = [
    {
      icon: <FlightTakeoffIcon sx={{ fontSize: 40 }} />,
      title: "Explore the World",
      description: "Discover new destinations and create unforgettable memories"
    },
    {
      icon: <BeachAccessIcon sx={{ fontSize: 40 }} />,
      title: "Relax & Recharge",
      description: "Find your perfect getaway and unwind in paradise"
    },
    {
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      title: "Luxury Stays",
      description: "Experience world-class accommodations and hospitality"
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
      color: 'white',
      pt: 8
    }}>
      <AppBar position="fixed" sx={{ bgcolor: 'rgba(26, 42, 108, 0.9)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Buddy
          </Typography>
          <Button
            color="inherit"
            startIcon={<ExploreIcon />}
            onClick={handleExploreClick}
            sx={{ 
              mr: 2,
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Explore Spots
          </Button>
          <Button
            color="inherit"
            startIcon={<ContactMailIcon />}
            onClick={handleContactClick}
            sx={{ 
              mr: 2,
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Contact Us
          </Button>
          <IconButton 
            color="inherit" 
            onClick={handleLogout}
            sx={{ 
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
                transition: 'transform 0.2s'
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Your Journey Begins Here
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 6, opacity: 0.9 }}>
            Discover the world's most amazing destinations with our easy booking system
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {travelThoughts.map((thought, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    }
                  }}
                >
                  {thought.icon}
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    {thought.title}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {thought.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/booking')}
              sx={{
                bgcolor: 'white',
                color: '#1a2a6c',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Start Booking Now
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 