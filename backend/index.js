require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const app = express();
const PORT = process.env.SERVER_PORT || 6173; 

app.use(cors({
    origin: "http://localhost:5174/", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

app.get("/home", (req, res) => {
    res.status(200).json("Server is running");
});

app.post("/", async (req, res) => {
    try {
        const { text } = req.body;
        console.log('Received text:', text);

      
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(text);

        res.json({ success: true, generatedText: result.response.text() });
    } catch (error) {
        console.error('Error processing text:', error);
        res.status(500).json({ success: false, message: 'Error processing text.' });
    }
});

app.options("*", cors());

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
