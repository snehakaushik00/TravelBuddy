import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5002/api/chat';
const PIXABAY_API_KEY = '49683344-ffb9d59bad3c2eff542c65f7a';

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `
    linear-gradient(
      45deg,
      #1a1a2e 0%,
      #16213e 25%,
      #0f3460 50%,
      #1a1a2e 75%,
      #16213e 100%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%
    )
  `,
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    top: '-50%',
    left: '-50%',
    background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
    animation: 'float 20s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
    animation: 'shine 3s linear infinite',
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  '@keyframes float': {
    '0%': {
      transform: 'translate(0, 0) rotate(0deg)',
    },
    '25%': {
      transform: 'translate(50px, 50px) rotate(90deg)',
    },
    '50%': {
      transform: 'translate(0, 100px) rotate(180deg)',
    },
    '75%': {
      transform: 'translate(-50px, 50px) rotate(270deg)',
    },
    '100%': {
      transform: 'translate(0, 0) rotate(360deg)',
    },
  },
  '@keyframes shine': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const SpotCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s',
  backgroundColor: '#f5f5dc',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  '& .MuiCardMedia-root': {
    height: 200,
    objectFit: 'cover',
  },
  '& .MuiCardContent-root': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  '& .MuiTypography-h5': {
    minHeight: '3em',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiTypography-body2': {
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: 'linear-gradient(45deg, #eeaeca 30%, #94bbe9 90%)',
  '&:hover': {
    background: 'linear-gradient(45deg, #eeaeca 30%, #94bbe9 90%)',
    opacity: 0.9,
  },
}));

// Update floating lines to be more subtle
const FloatingLines = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& > div': {
    position: 'absolute',
    background: 'rgba(200, 230, 255, 0.2)',
    animation: 'floatLine 15s linear infinite',
  },
  '& > div:nth-child(1)': {
    width: '100%',
    height: '1px',
    top: '20%',
    left: '0',
    animationDelay: '0s',
  },
  '& > div:nth-child(2)': {
    width: '1px',
    height: '100%',
    top: '0',
    left: '30%',
    animationDelay: '-5s',
  },
  '& > div:nth-child(3)': {
    width: '100%',
    height: '2px',
    top: '60%',
    left: '0',
    animationDelay: '-10s',
  },
  '& > div:nth-child(4)': {
    width: '2px',
    height: '100%',
    top: '0',
    left: '70%',
    animationDelay: '-15s',
  },
  '& > div:nth-child(5)': {
    width: '100%',
    height: '1px',
    top: '80%',
    left: '0',
    animationDelay: '-20s',
  },
  '@keyframes floatLine': {
    '0%': {
      transform: 'translate(0, 0)',
      opacity: 0.3,
    },
    '25%': {
      transform: 'translate(50px, 50px)',
      opacity: 0.6,
    },
    '50%': {
      transform: 'translate(0, 100px)',
      opacity: 0.3,
    },
    '75%': {
      transform: 'translate(-50px, 50px)',
      opacity: 0.6,
    },
    '100%': {
      transform: 'translate(0, 0)',
      opacity: 0.3,
    },
  },
});

// Update floating particles with darker colors
const AnimatedParticles = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& > div': {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'particle 15s linear infinite',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
  },
  '& > div:nth-child(1)': {
    width: '100px',
    height: '100px',
    top: '10%',
    left: '10%',
    animationDelay: '0s',
    background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
  },
  '& > div:nth-child(2)': {
    width: '150px',
    height: '150px',
    top: '30%',
    right: '10%',
    animationDelay: '-5s',
    background: 'linear-gradient(45deg, #16213e, #0f3460)',
  },
  '& > div:nth-child(3)': {
    width: '80px',
    height: '80px',
    bottom: '20%',
    left: '20%',
    animationDelay: '-10s',
    background: 'linear-gradient(45deg, #0f3460, #1a1a2e)',
  },
  '& > div:nth-child(4)': {
    width: '120px',
    height: '120px',
    top: '40%',
    left: '40%',
    animationDelay: '-15s',
    background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
  },
  '& > div:nth-child(5)': {
    width: '60px',
    height: '60px',
    top: '60%',
    right: '30%',
    animationDelay: '-20s',
    background: 'linear-gradient(45deg, #16213e, #0f3460)',
  },
  '& > div:nth-child(6)': {
    width: '90px',
    height: '90px',
    bottom: '40%',
    right: '20%',
    animationDelay: '-25s',
    background: 'linear-gradient(45deg, #0f3460, #1a1a2e)',
  },
  '& > div:nth-child(7)': {
    width: '70px',
    height: '70px',
    top: '20%',
    left: '60%',
    animationDelay: '-30s',
    background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
  },
  '@keyframes particle': {
    '0%': {
      transform: 'translate(0, 0) scale(1)',
      opacity: 0.3,
    },
    '50%': {
      transform: 'translate(50px, 50px) scale(1.2)',
      opacity: 0.6,
    },
    '100%': {
      transform: 'translate(0, 0) scale(1)',
      opacity: 0.3,
    },
  },
});

function ExploreSpots() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [spots, setSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setIsLoading(true);
    setError('');
    setSpots([]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `What are the top tourist spots to visit in ${location}? Please provide a list with descriptions.`,
          conversationHistory: []
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const spotsList = await parseSpotsResponse(data.text, location);
      setSpots(spotsList);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch tourist spots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseSpotsResponse = async (text, location) => {
    const spots = [];
    const lines = text.split('\n');
    const usedImageUrls = new Set();
    
    for (const line of lines) {
      if (line.trim() && !line.includes('?')) {
        const [name, ...descriptionParts] = line.split(':');
        if (name && descriptionParts.length > 0) {
          const spotName = name.trim();
          try {
            // Fetch image from Pixabay API
            const response = await fetch(
              `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(spotName + ' ' + location + ' landmark')}&image_type=photo&per_page=10`
            );
            const data = await response.json();
            
            // Find the first unique image URL
            let imageUrl = null;
            if (data.hits && data.hits.length > 0) {
              for (const photo of data.hits) {
                if (!usedImageUrls.has(photo.webformatURL)) {
                  imageUrl = photo.webformatURL;
                  usedImageUrls.add(imageUrl);
                  break;
                }
              }
            }
            
            // If no unique image found, use a fallback
            if (!imageUrl) {
              imageUrl = `https://pixabay.com/get/g${Math.floor(Math.random() * 1000000)}.jpg`;
            }
            
            spots.push({
              name: spotName,
              description: descriptionParts.join(':').trim(),
              image: imageUrl
            });
          } catch (error) {
            console.error('Error fetching image:', error);
            // Use a unique fallback for each spot
            spots.push({
              name: spotName,
              description: descriptionParts.join(':').trim(),
              image: `https://pixabay.com/get/g${Math.floor(Math.random() * 1000000)}.jpg`
            });
          }
        }
      }
    }

    return spots;
  };

  const handleImageError = (e, spotName, location) => {
    // Generate a unique fallback image URL
    e.target.src = `https://pixabay.com/get/g${Math.floor(Math.random() * 1000000)}.jpg`;
  };

  return (
    <BackgroundBox>
      <AnimatedParticles>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </AnimatedParticles>
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: 'white',
              textAlign: 'center',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontWeight: 'bold',
            }}
          >
            Explore Tourist Spots
          </Typography>
          
          <SearchPaper elevation={3}>
            <form onSubmit={handleSearch}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Paris, Tokyo, New York"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    background: 'linear-gradient(45deg, #eeaeca 30%, #94bbe9 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #eeaeca 30%, #94bbe9 90%)',
                      opacity: 0.9,
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </form>
          </SearchPaper>

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          )}

          {error && (
            <Typography color="error" align="center" sx={{ mb: 4 }}>
              {error}
            </Typography>
          )}

          <Grid container spacing={3}>
            {spots.map((spot, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SpotCard>
                    <CardMedia
                      component="img"
                      image={spot.image}
                      alt={spot.name}
                      onError={(e) => handleImageError(e, spot.name, location)}
                      sx={{
                        height: 200,
                        objectFit: 'cover',
                        background: 'linear-gradient(45deg, #eeaeca 30%, #94bbe9 90%)',
                        transition: 'opacity 0.3s',
                        '&:hover': {
                          opacity: 0.9,
                        },
                      }}
                    />
                    <CardContent>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                          color: '#2c3e50',
                          fontWeight: 'bold',
                          minHeight: '3em',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {spot.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#34495e',
                          lineHeight: 1.5,
                          flexGrow: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {spot.description}
                      </Typography>
                    </CardContent>
                  </SpotCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </BackgroundBox>
  );
}

export default ExploreSpots; 