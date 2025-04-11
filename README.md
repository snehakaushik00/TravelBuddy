# Travel Booking Chat Application

A modern travel ticket booking system with a chat interface powered by Groq API.

## Features

- User authentication (sign-up and login)
- Attractive travel-themed home page
- AI-powered chat interface for booking tickets
- Modern and responsive UI

## Project Structure

- `travel-booking-chat/` - Frontend React application
- `travel-booking-chat-backend/` - Backend Express server 

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory
   ```
   cd travel-booking-chat-backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with your Groq API key
   ```
   GROQ_API_KEY=your_groq_api_key
   PORT=5000
   ```

4. Start the backend server
   - Using PowerShell script: 
     ```
     .\start.ps1
     ```
   - Or directly:
     ```
     npm start
     ```

### Frontend Setup

1. Open a new terminal window

2. Navigate to the frontend directory
   ```
   cd travel-booking-chat
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the frontend application
   - Using PowerShell script: 
     ```
     .\start.ps1
     ```
   - Or directly:
     ```
     npm start
     ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Usage

1. Sign up or log in on the authentication page
2. Explore the home page with travel inspirations
3. Click "Start Booking Now" to begin chatting with the AI assistant
4. Describe your travel plans and the assistant will help you book your tickets

## Security Note

- The `.env` file contains sensitive information and should not be committed to version control
- The application uses secure practices to handle authentication and API keys 