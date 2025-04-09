import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './components/HomePage';
import BookingChat from './components/BookingChat';
import Auth from './components/Auth';
import ContactUs from './components/ContactUs';
import ExploreSpots from './components/ExploreSpots';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a2a6c',
    },
    secondary: {
      main: '#fdbb2d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize state from localStorage
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // Update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={
            <PrivateRoute>
              <HomePage setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          } />
          <Route path="/booking" element={
            <PrivateRoute>
              <BookingChat />
            </PrivateRoute>
          } />
          <Route path="/contact" element={
            <PrivateRoute>
              <ContactUs />
            </PrivateRoute>
          } />
          <Route path="/explore" element={
            <PrivateRoute>
              <ExploreSpots />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
