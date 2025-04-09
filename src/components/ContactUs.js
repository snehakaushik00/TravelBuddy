import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: 'url("/ticket1.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  maxWidth: '600px',
  width: '100%',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: 'linear-gradient(45deg, #1a2a6c 30%, #b21f1f 90%)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1a2a6c 30%, #b21f1f 90%)',
    opacity: 0.9,
  },
}));

function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <BackgroundBox>
      <Container maxWidth="sm">
        <StyledPaper elevation={3}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton 
              onClick={handleGoBack}
              sx={{ 
                color: '#1a2a6c',
                '&:hover': {
                  backgroundColor: 'rgba(26, 42, 108, 0.1)',
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography component="h1" variant="h4" sx={{ color: '#1a2a6c', fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
              Contact Us
            </Typography>
            <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
          </Box>
          <Typography variant="body1" sx={{ mb: 3, color: '#666', textAlign: 'center' }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="message"
              label="Message"
              type="text"
              id="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Send Message
            </SubmitButton>
          </StyledForm>
        </StyledPaper>
      </Container>
    </BackgroundBox>
  );
}

export default ContactUs; 