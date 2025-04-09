import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Tabs, Tab, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
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
    setError('');

    if (activeTab === 0) { // Sign Up
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // Here you would typically make an API call to register the user
      console.log('Sign Up:', formData);
      setIsAuthenticated(true);
      navigate('/');
    } else { // Login
      // Here you would typically make an API call to authenticate the user
      console.log('Login:', { email: formData.email, password: formData.password });
      setIsAuthenticated(true);
      navigate('/');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1a2a6c', fontWeight: 'bold' }}>
              Welcome to Travel Buddy
            </Typography>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{ mb: 3 }}
            >
              <Tab label="Sign Up" />
              <Tab label="Login" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {activeTab === 0 && (
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              )}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              {activeTab === 0 && (
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: '#1a2a6c',
                  '&:hover': {
                    bgcolor: '#0d1b4c'
                  }
                }}
              >
                {activeTab === 0 ? 'Sign Up' : 'Login'}
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Auth; 