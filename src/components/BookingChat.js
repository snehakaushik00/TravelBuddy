import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5002/api/chat';

const BookingChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your travel assistant. How can I help you book your tickets today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const newMessage = {
        text: input,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: input,
            conversationHistory: messages
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Convert the timestamp string to a Date object
        const botMessage = {
          ...data,
          timestamp: new Date(data.timestamp)
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, {
          text: "I'm sorry, I encountered an error. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f5f5f5'
    }}>
      <Box sx={{ 
        p: 2, 
        bgcolor: '#1a2a6c',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <IconButton onClick={() => navigate('/')} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              bgcolor: '#fdbb2d',
              width: 40,
              height: 40,
              mr: 2
            }}
          >
            T
          </Avatar>
          <Box>
            <Typography variant="h6">
              Travel Booking Assistant
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Online
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {message.sender === 'bot' && (
                  <Avatar 
                    sx={{ 
                      bgcolor: '#fdbb2d',
                      width: 32,
                      height: 32,
                      mr: 1
                    }}
                  >
                    T
                  </Avatar>
                )}
                <Box>
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: message.sender === 'user' ? '#1a2a6c' : 'white',
                      color: message.sender === 'user' ? 'white' : 'black',
                      borderRadius: 2,
                      position: 'relative',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      '&::before': message.sender === 'user' ? {
                        content: '""',
                        position: 'absolute',
                        right: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderLeft: '8px solid #1a2a6c'
                      } : {
                        content: '""',
                        position: 'absolute',
                        left: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: '8px solid white'
                      }
                    }}
                  >
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mt: 1,
                        opacity: 0.7,
                        textAlign: message.sender === 'user' ? 'right' : 'left'
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </motion.div>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: '#fdbb2d',
                  width: 32,
                  height: 32,
                  mr: 1
                }}
              >
                T
              </Avatar>
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: 'white',
                  borderRadius: 2,
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid white'
                  }
                }}
              >
                <CircularProgress size={20} sx={{ color: '#1a2a6c' }} />
              </Paper>
            </Box>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ 
        p: 2, 
        bgcolor: 'white',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#f5f5f5',
                '&:hover': {
                  bgcolor: '#eeeeee'
                }
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            sx={{
              minWidth: 'auto',
              borderRadius: 2,
              bgcolor: '#1a2a6c',
              '&:hover': {
                bgcolor: '#0d1b4c',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s'
              }
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingChat; 