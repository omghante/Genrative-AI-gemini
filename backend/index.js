require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = 7517;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS middleware to allow requests from all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with your frontend URL in production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// POST endpoint to handle incoming text and generate response
app.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    console.log('Received text:', text);
    
    // Example of using Google Generative AI to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(text);
    
    // Send generated text back to the frontend
    res.json({ success: true, generatedText: result.response.text() });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ success: false, message: 'Error processing text.' });
  }
});

// Run the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
