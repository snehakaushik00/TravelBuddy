const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const groq = new Groq();

app.use(cors());
app.use(express.json());

// --- Swagger Setup --- Start ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Booking Chat API',
      version: '1.0.0',
      description: 'API for the Travel Booking Chat Assistant using Groq',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- Swagger Setup --- End ---

// ✅ Root route for quick check
app.get('/', (req, res) => {
  res.send("✅ Welcome to the Travel Booking Chat API! Use POST /api/chat to talk to the assistant.");
});

// ✅ Chat route
/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a message to the chat assistant
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's message to the assistant.
 *                 example: "Book a flight to Paris"
 *               conversationHistory:
 *                 type: array
 *                 description: (Optional) The previous messages in the conversation.
 *                 items:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                       enum: [user, bot]
 *                     text:
 *                       type: string
 *                 example: [{sender: "user", text: "Hi"}, {sender: "bot", text: "Hello! How can I help?"}]
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Successful response from the assistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: The assistant's reply.
 *                 sender:
 *                   type: string
 *                   enum: [bot]
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Internal server error (e.g., Groq API issue).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: "I'm sorry, I encountered an error. Please try again."
 *                 sender:
 *                   type: string
 *                   enum: [bot]
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // Debug log
    console.log("📨 Incoming message:", message);
    console.log("📜 Conversation history:", conversationHistory);

    const messages = [
      {
        role: "system",
        content: "You are a helpful travel booking assistant. Your role is to help users book travel tickets and provide travel-related information. Be friendly, professional, and concise in your responses."
      },
      ...conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: "user",
        content: message
      }
    ];

    // with Groq SDK
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const reply = chatCompletion.choices[0].message.content;

    res.json({
      text: reply,
      sender: 'bot',
      timestamp: new Date()
    });

  } catch (error) {
    // Enhanced error logging
    console.error('❌ Groq API Error:', error.response?.data || error.message);

    res.status(500).json({
      text: "I'm sorry, I encountered an error. Please try again.",
      sender: 'bot',
      timestamp: new Date()
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});


