require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = 7517;


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


app.post('/', async (req, res) => {
  res.send("server is running");
  try {
    const { text } = req.body;
    console.log('Received text:', text);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(text);
    
    res.json({ success: true, generatedText: result.response.text() });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ success: false, message: 'Error processing text.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
